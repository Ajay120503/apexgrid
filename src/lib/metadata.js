import { productionOrigin, isEmail } from './config.js';
export const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character],
  );
export function metadata(route, site) {
  const origin = productionOrigin(site.productionUrl);
  const indexable = !!origin && site.indexable && route.type !== '404';
  const url = origin ? `${origin}${route.path}` : null;
  const image = origin ? `${origin}/social-preview.png` : '/social-preview.png';
  const meta = (name, content, property = false) =>
    `<meta ${property ? 'property' : 'name'}="${name}" content="${escapeHtml(content)}"/>`;
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.brandName,
    ...(origin ? { url: origin } : {}),
    ...(site.legalName ? { legalName: site.legalName } : {}),
    ...(isEmail(site.email) ? { email: site.email } : {}),
  };
  return `<title>${escapeHtml(route.title)}</title>${meta('description', route.description)}${meta('robots', indexable ? 'index, follow' : 'noindex, nofollow')}${url && route.type !== '404' ? `<link rel="canonical" href="${escapeHtml(url)}"/>` : ''}${meta('og:type', 'website', true)}${meta('og:site_name', site.brandName, true)}${meta('og:title', route.title, true)}${meta('og:description', route.description, true)}${url ? meta('og:url', url, true) : ''}${meta('og:image', image, true)}${meta('og:image:width', '1200', true)}${meta('og:image:height', '630', true)}${meta('og:image:alt', 'ApexGrid — connected thinking for your next stage of growth.', true)}${meta('twitter:card', 'summary_large_image')}${meta('twitter:title', route.title)}${meta('twitter:description', route.description)}${meta('twitter:image', image)}<script type="application/ld+json">${JSON.stringify(organization).replace(/</g, '\\u003c')}</script>`;
}
