import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactForm } from '../src/components/ContactForm.jsx';
import {
  emailDraft,
  initialValues,
  knownService,
  submitEnquiry,
  validateForm,
} from '../src/lib/form.js';
import { contactConfigError, productionOrigin } from '../src/lib/config.js';
import { formCopy } from '../src/data/content.js';
const config = {
  contactMode: 'endpoint',
  formProvider: 'formspree',
  formEndpoint: 'https://formspree.io/f/mocktest',
  email: 'owner@business.test',
};
const good = {
  ...initialValues(),
  name: ' 李 明 ',
  email: 'person@business.test',
  message: 'We would like a clearer website and search strategy.',
};
const response = (status, data) => ({
  status,
  ok: status >= 200 && status < 300,
  json: async () => data,
});
const fill = () => {
  fireEvent.change(screen.getByLabelText('Your name *'), { target: { value: good.name } });
  fireEvent.change(screen.getByLabelText('Email address *'), { target: { value: good.email } });
  fireEvent.change(screen.getByLabelText('Tell us about your project *'), {
    target: { value: good.message },
  });
};
describe('validation and configuration', () => {
  it('trims values and accepts international names and punctuation', () => {
    expect(validateForm(good).errors).toEqual({});
    expect(validateForm(good).values.name).toBe('李 明');
    expect(validateForm({ ...good, name: 'Jean-Luc O’Neill' }).errors).toEqual({});
  });
  it('rejects required values, unsafe URLs, unknown options and overlong fields', () => {
    expect(Object.keys(validateForm(initialValues()).errors)).toEqual(['name', 'email', 'message']);
    for (const website of [
      'javascript:alert(1)',
      'ftp://site.test',
      'not a URL',
      'https://user:password@site.test',
    ])
      expect(validateForm({ ...good, website }).errors.website).toBeTruthy();
    expect(validateForm({ ...good, website: 'https://site.test/a' }).errors).toEqual({});
    for (const [key, value] of Object.entries({
      name: 'n'.repeat(101),
      email: 'a'.repeat(250) + '@b.com',
      company: 'c'.repeat(151),
      message: 'x'.repeat(3001),
      service: '<script>',
      budget: 'unknown',
    }))
      expect(validateForm({ ...good, [key]: value }).errors[key]).toBeTruthy();
  });
  it('allows only known service query values', () => {
    expect(knownService('seo')).toBe('seo');
    expect(knownService('<img onerror=alert(1)>')).toBe('');
  });
  it('rejects inconsistent modes and unsafe production origins', () => {
    expect(contactConfigError(config)).toBeNull();
    expect(contactConfigError({ ...config, formEndpoint: 'http://bad.test' })).toBeTruthy();
    expect(contactConfigError({ contactMode: 'email', email: null })).toBeTruthy();
    for (const origin of [
      'http://company.com',
      'https://localhost',
      'https://example.com',
      'https://company.com/path',
      'https://127.0.0.1',
      'https://company.com?x=1',
    ])
      expect(productionOrigin(origin)).toBeNull();
    expect(productionOrigin('https://apexgrid.agency')).toBe('https://apexgrid.agency');
  });
});
describe('mocked endpoint delivery', () => {
  it('uses documented JSON POST and requires positive provider acceptance', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(response(200, { ok: true }));
    await expect(submitEnquiry(good, config, { fetchImpl })).resolves.toBe(true);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(fetchImpl.mock.calls[0][1]).toMatchObject({
      method: 'POST',
      credentials: 'omit',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    });
  });
  it.each([
    [400, { errors: [{ message: 'Invalid' }] }],
    [500, {}],
    [200, { ok: false }],
    [200, { ok: true, errors: [{ message: 'Invalid' }] }],
  ])('rejects provider response %s %j', async (status, data) => {
    await expect(
      submitEnquiry(good, config, { fetchImpl: vi.fn().mockResolvedValue(response(status, data)) }),
    ).rejects.toThrow(formCopy.rejected);
  });
  it('handles rate limits, malformed JSON, network errors and timeout without retries', async () => {
    await expect(
      submitEnquiry(good, config, { fetchImpl: vi.fn().mockResolvedValue(response(429, {})) }),
    ).rejects.toThrow(formCopy.rateLimit);
    await expect(
      submitEnquiry(good, config, {
        fetchImpl: vi.fn().mockRejectedValue(new TypeError('offline')),
      }),
    ).rejects.toThrow(formCopy.failure);
    await expect(
      submitEnquiry(good, config, {
        fetchImpl: vi.fn().mockResolvedValue({
          ok: true,
          json: async () => {
            throw new Error('bad json');
          },
        }),
      }),
    ).rejects.toThrow(formCopy.failure);
    const fetchImpl = vi.fn(() => new Promise(() => {}));
    await expect(submitEnquiry(good, config, { fetchImpl, timeoutMs: 10 })).rejects.toThrow(
      formCopy.timeout,
    );
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(fetchImpl.mock.calls[0][1].signal.aborted).toBe(true);
  });
});
describe('contact interaction', () => {
  it('shows no editable form or fake submit when unavailable or misconfigured', () => {
    const { rerender } = render(<ContactForm config={{ contactMode: 'unconfigured' }} />);
    expect(screen.getByText(formCopy.unavailable)).toBeVisible();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    rerender(<ContactForm config={{ contactMode: 'email' }} />);
    expect(screen.getByText(formCopy.unavailable)).toBeVisible();
  });
  it('focuses the first invalid field and associates errors', () => {
    render(<ContactForm config={config} />);
    fireEvent.click(screen.getByRole('button', { name: 'Submit enquiry' }));
    expect(screen.getByLabelText('Your name *')).toHaveFocus();
    expect(screen.getByLabelText('Your name *')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('status')).toHaveTextContent('Please review');
  });
  it('preselects known query values and ignores unknown text', async () => {
    window.history.replaceState({}, '', '/contact/?service=seo');
    const { unmount } = render(<ContactForm config={config} />);
    expect(screen.getByLabelText('Service interest (optional)')).toHaveValue('seo');
    unmount();
    window.history.replaceState({}, '', '/contact/?service=unknown');
    render(<ContactForm config={config} />);
    expect(screen.getByLabelText('Service interest (optional)')).toHaveValue('');
  });
  it('prevents duplicate POST, announces pending, and clears only after success', async () => {
    let finish;
    const deliver = vi.fn(
      () =>
        new Promise((resolve) => {
          finish = resolve;
        }),
    );
    render(<ContactForm config={config} deliver={deliver} />);
    fill();
    fireEvent.submit(screen.getByRole('form'));
    fireEvent.submit(screen.getByRole('form'));
    expect(deliver).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByLabelText('Tell us about your project *')).toHaveValue(good.message);
    finish(true);
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(formCopy.success));
    expect(screen.getByLabelText('Tell us about your project *')).toHaveValue('');
  });
  it.each([formCopy.failure, formCopy.rejected, formCopy.rateLimit, formCopy.timeout])(
    'preserves values on failure and permits explicit retry: %s',
    async (message) => {
      const deliver = vi.fn().mockRejectedValueOnce(new Error(message)).mockResolvedValueOnce(true);
      render(<ContactForm config={config} deliver={deliver} />);
      fill();
      fireEvent.submit(screen.getByRole('form'));
      await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(message));
      expect(screen.getByLabelText('Tell us about your project *')).toHaveValue(good.message);
      expect(screen.getByRole('link', { name: /Contact by email instead/ })).toHaveAttribute(
        'href',
        `mailto:${config.email}`,
      );
      fireEvent.submit(screen.getByRole('form'));
      await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(formCopy.success));
      expect(deliver).toHaveBeenCalledTimes(2);
    },
  );
  it('email mode opens an encoded draft and never reports submission', () => {
    const openDraft = vi.fn();
    render(<ContactForm config={{ ...config, contactMode: 'email' }} openDraft={openDraft} />);
    fill();
    fireEvent.click(screen.getByRole('button', { name: 'Open email draft' }));
    expect(openDraft).toHaveBeenCalledTimes(1);
    expect(openDraft.mock.calls[0][0]).toMatch(/^mailto:owner@business.test\?subject=/);
    expect(screen.getByRole('status')).toHaveTextContent(formCopy.emailNotice);
    expect(screen.getByLabelText('Your name *')).not.toHaveValue('');
  });
  it('offers selectable text for an overlong mailto draft', () => {
    expect(emailDraft({ ...good, message: '文'.repeat(2000) }, config.email).uri).toBeNull();
    const openDraft = vi.fn();
    render(<ContactForm config={{ ...config, contactMode: 'email' }} openDraft={openDraft} />);
    fill();
    fireEvent.change(screen.getByLabelText('Tell us about your project *'), {
      target: { value: '文'.repeat(2000) },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Open email draft' }));
    expect(openDraft).not.toHaveBeenCalled();
    expect(screen.getByLabelText('Copy your enquiry text').value).toContain('文');
    expect(screen.getByRole('status')).toHaveTextContent(formCopy.longEmail);
  });
  it('excludes the honeypot from navigation and rejects populated honeypots honestly', async () => {
    const deliver = vi.fn();
    render(<ContactForm config={config} deliver={deliver} />);
    fill();
    const honey = document.getElementById('_gotcha');
    expect(honey).toHaveAttribute('tabindex', '-1');
    expect(honey.closest('[hidden]')).toBeTruthy();
    fireEvent.change(honey, { target: { value: 'spam' } });
    fireEvent.submit(screen.getByRole('form'));
    expect(deliver).not.toHaveBeenCalled();
    expect(screen.getByRole('status')).toHaveTextContent(formCopy.rejected);
  });
});
