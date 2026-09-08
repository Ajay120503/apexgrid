export function isEmail(value) {
  return (
    typeof value === 'string' &&
    value.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(value) &&
    !/[\r\n]/.test(value)
  );
}
export function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return (
      ['http:', 'https:'].includes(url.protocol) && !!url.hostname && !url.username && !url.password
    );
  } catch {
    return false;
  }
}
export function productionOrigin(value) {
  if (!isHttpUrl(value)) return null;
  const url = new URL(value);
  if (
    url.protocol !== 'https:' ||
    url.pathname !== '/' ||
    url.search ||
    url.hash ||
    url.port ||
    /(^|\.)(localhost|example\.(com|org|net)|test|invalid|local)$/.test(url.hostname) ||
    !url.hostname.includes('.') ||
    /^[\d.]+$/.test(url.hostname) ||
    url.hostname.includes(':')
  )
    return null;
  return url.origin;
}
export function contactConfigError(config) {
  if (config.contactMode === 'unconfigured') return null;
  if (config.contactMode === 'email')
    return isEmail(config.email) ? null : 'Email mode requires a verified email address.';
  if (config.contactMode === 'endpoint') {
    if (
      config.formProvider !== 'formspree' ||
      !/^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(config.formEndpoint || '')
    )
      return 'Endpoint mode requires a public Formspree form endpoint and its supported adapter.';
    return null;
  }
  return 'Unknown contact mode.';
}
