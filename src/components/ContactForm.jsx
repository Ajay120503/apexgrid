import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, CircleCheck, MessageSquare } from 'lucide-react';
import { site } from '../data/site.js';
import { services } from '../data/services.js';
import { budgetOptions, formCopy } from '../data/content.js';
import { contactConfigError, isEmail } from '../lib/config.js';
import {
  emailDraft,
  initialValues,
  knownService,
  submitEnquiry,
  validateForm,
} from '../lib/form.js';
export function ContactForm({
  config = site,
  deliver = submitEnquiry,
  openDraft = (uri) => {
    window.location.href = uri;
  },
}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [draft, setDraft] = useState(null);
  const [ready, setReady] = useState(false);
  const form = useRef(null);
  const pending = useRef(false);
  useEffect(() => {
    setReady(true);
    const service = knownService(new URLSearchParams(window.location.search).get('service'));
    setValues((previous) => ({ ...previous, service }));
  }, []);
  if (config.contactMode === 'unconfigured' || contactConfigError(config))
    return (
      <div className="availability-panel">
        <span className="availability-icon">
          <MessageSquare size={30} aria-hidden="true" />
        </span>
        <p className="eyebrow">ENQUIRY AVAILABILITY</p>
        <h2>{formCopy.unavailableTitle}</h2>
        <p>{formCopy.unavailable}</p>
        <a className="text-link" href="/approach/">
          Explore how we work <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
    );
  const update = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    setDraft(null);
    if (status !== 'submitting') {
      setStatus('idle');
      setMessage('');
    }
  };
  const submit = async (event) => {
    event.preventDefault();
    if (pending.current) return;
    const result = validateForm(values);
    setErrors(result.errors);
    setDraft(null);
    if (Object.keys(result.errors).length) {
      setStatus('invalid');
      setMessage('Please review the highlighted fields.');
      form.current.elements.namedItem(Object.keys(result.errors)[0])?.focus();
      return;
    }
    if (result.values._gotcha) {
      setStatus('failure');
      setMessage(formCopy.rejected);
      return;
    }
    if (config.contactMode === 'email') {
      const nextDraft = emailDraft(result.values, config.email);
      setDraft(nextDraft);
      setStatus('draft');
      setMessage(nextDraft.uri ? formCopy.emailNotice : formCopy.longEmail);
      if (nextDraft.uri) openDraft(nextDraft.uri);
      return;
    }
    pending.current = true;
    setStatus('submitting');
    setMessage(formCopy.pending);
    try {
      await deliver(result.values, config);
      setStatus('success');
      setMessage(formCopy.success);
      setValues(initialValues());
    } catch (error) {
      setStatus('failure');
      setMessage(
        Object.values(formCopy).includes(error.message) ? error.message : formCopy.failure,
      );
    } finally {
      pending.current = false;
    }
  };
  const field = (
    name,
    label,
    { type = 'text', required = false, maxLength, autoComplete } = {},
  ) => (
    <div className="field">
      <label htmlFor={name}>
        {label}
        {required ? ' *' : ' (optional)'}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        autoComplete={autoComplete}
        value={values[name]}
        onChange={update}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      />
      {errors[name] && (
        <p className="field-error" id={`${name}-error`}>
          {errors[name]}
        </p>
      )}
    </div>
  );
  return (
    <form
      ref={form}
      onSubmit={submit}
      noValidate
      className="contact-form"
      aria-label="Project enquiry"
    >
      <noscript>
        <p className="notice">
          JavaScript is required for this form. Use a direct contact link if available.
        </p>
      </noscript>
      <p className="form-required">* Required fields</p>
      <fieldset disabled={!ready || status === 'submitting'}>
        <legend className="sr-only">Project details</legend>
        <div className="form-grid">
          {field('name', 'Your name', {
            required: true,
            maxLength: 100,
            autoComplete: 'name',
          })}
          {field('email', 'Email address', {
            required: true,
            type: 'email',
            maxLength: 254,
            autoComplete: 'email',
          })}
          {field('company', 'Company', {
            maxLength: 150,
            autoComplete: 'organization',
          })}
          {field('website', 'Website', {
            type: 'url',
            maxLength: 2048,
            autoComplete: 'url',
          })}
          <div className="field">
            <label htmlFor="service">Service interest (optional)</label>
            <select
              id="service"
              name="service"
              value={values.service}
              onChange={update}
              aria-invalid={!!errors.service}
              aria-describedby={errors.service ? 'service-error' : undefined}
            >
              <option value="">Not sure yet</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
            {errors.service && (
              <p id="service-error" className="field-error">
                {errors.service}
              </p>
            )}
          </div>
          <div className="field">
            <label htmlFor="budget">Budget preference (optional)</label>
            <select
              id="budget"
              name="budget"
              value={values.budget}
              onChange={update}
              aria-invalid={!!errors.budget}
              aria-describedby={errors.budget ? 'budget-error' : undefined}
            >
              {budgetOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            {errors.budget && (
              <p id="budget-error" className="field-error">
                {errors.budget}
              </p>
            )}
          </div>
          <div className="field full-width">
            <label htmlFor="message">Tell us about your project *</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              maxLength={3000}
              value={values.message}
              onChange={update}
              aria-invalid={!!errors.message}
              aria-describedby={`message-hint${errors.message ? ' message-error' : ''}`}
            />
            <p className="field-hint" id="message-hint">
              20–3000 characters. Share your goals, not passwords or sensitive account details.
            </p>
            {errors.message && (
              <p className="field-error" id="message-error">
                {errors.message}
              </p>
            )}
          </div>
        </div>
        <div hidden aria-hidden="true">
          <label htmlFor="_gotcha">Leave this field empty</label>
          <input
            id="_gotcha"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            value={values._gotcha}
            onChange={update}
          />
        </div>
        <p className="form-privacy">
          {formCopy.privacy} Read our <a href="/privacy/">privacy information</a>.
        </p>
        {config.contactMode === 'email' && <p className="field-hint">{formCopy.emailNotice}</p>}
        <button
          type="submit"
          className="button button-primary"
          disabled={!ready || status === 'submitting'}
        >
          {status === 'submitting'
            ? formCopy.pending
            : config.contactMode === 'email'
              ? formCopy.email
              : formCopy.submit}
          <ArrowUpRight size={18} aria-hidden="true" />
        </button>
      </fieldset>
      <div
        role="status"
        aria-live="polite"
        className={`form-status ${status}`}
        data-testid="form-status"
      >
        {status === 'success' && <CircleCheck aria-hidden="true" />}
        {message}
      </div>
      {draft && !draft.uri && (
        <div className="copy-draft">
          <p>
            Email to <a href={`mailto:${config.email}`}>{config.email}</a>
          </p>
          <label htmlFor="email-draft">Copy your enquiry text</label>
          <textarea
            id="email-draft"
            readOnly
            rows={10}
            value={draft.body}
            onFocus={(event) => event.target.select()}
          />
        </div>
      )}
      {status === 'failure' && isEmail(config.email) && (
        <a className="text-link" href={`mailto:${config.email}`}>
          Contact by email instead <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      )}
    </form>
  );
}
