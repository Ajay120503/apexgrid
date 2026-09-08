import { services } from '../data/services.js';
import { budgetOptions, formCopy } from '../data/content.js';
import { contactConfigError, isEmail, isHttpUrl } from './config.js';
export const knownService = (value) =>
  services.some((service) => service.id === value) ? value : '';
export const initialValues = () => ({
  name: '',
  email: '',
  company: '',
  website: '',
  service: '',
  message: '',
  budget: budgetOptions[0],
  _gotcha: '',
});
export function validateForm(raw) {
  const values = Object.fromEntries(
    Object.keys(initialValues()).map((key) => [key, String(raw[key] ?? '').trim()]),
  );
  const errors = {};
  if (values.name.length < 2 || values.name.length > 100)
    errors.name = 'Enter a name between 2 and 100 characters.';
  if (!isEmail(values.email)) errors.email = 'Enter a valid email address, up to 254 characters.';
  if (values.company.length > 150)
    errors.company = 'Keep the company name to 150 characters or fewer.';
  if (values.website && (!isHttpUrl(values.website) || values.website.length > 2048))
    errors.website = 'Enter a full HTTP or HTTPS website URL, up to 2048 characters.';
  if (values.service && !knownService(values.service))
    errors.service = 'Choose a service from the list.';
  if (values.message.length < 20 || values.message.length > 3000)
    errors.message = 'Tell us about your project in 20–3000 characters.';
  if (!budgetOptions.includes(values.budget))
    errors.budget = 'Choose a budget preference from the list.';
  return { values, errors };
}
export function emailDraft(values, email) {
  const body = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Company: ${values.company || 'Not provided'}`,
    `Website: ${values.website || 'Not provided'}`,
    `Service: ${services.find((s) => s.id === values.service)?.name || 'Not sure yet'}`,
    `Budget: ${values.budget}`,
    '',
    values.message,
  ].join('\n');
  const uri = `mailto:${email}?subject=${encodeURIComponent('ApexGrid project enquiry')}&body=${encodeURIComponent(body)}`;
  return { body, uri: uri.length <= 1800 ? uri : null };
}
export async function submitEnquiry(values, config, { fetchImpl = fetch, timeoutMs = 12000 } = {}) {
  if (contactConfigError(config) || config.contactMode !== 'endpoint')
    throw new Error(formCopy.failure);
  const controller = new AbortController();
  let timer;
  try {
    const timedOut = new Promise((_, reject) => {
      timer = setTimeout(() => {
        controller.abort();
        reject(new Error(formCopy.timeout));
      }, timeoutMs);
    });
    const send = async () => {
      const response = await fetchImpl(config.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
        signal: controller.signal,
        credentials: 'omit',
        redirect: 'error',
      });
      if (response.status === 429) throw new Error(formCopy.rateLimit);
      if (!response.ok) throw new Error(formCopy.rejected);
      const data = await response.json();
      if (data.ok !== true || data.errors?.length) throw new Error(formCopy.rejected);
      return true;
    };
    return await Promise.race([send(), timedOut]);
  } catch (error) {
    if (Object.values(formCopy).includes(error.message)) throw error;
    throw new Error(error.name === 'AbortError' ? formCopy.timeout : formCopy.failure);
  } finally {
    clearTimeout(timer);
  }
}
