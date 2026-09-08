import { readFile, access } from 'node:fs/promises';
import { site } from '../src/data/site.js';
import { routes } from '../src/lib/routes.js';
import { contactConfigError, isEmail, productionOrigin } from '../src/lib/config.js';
const failures = [];
const origin = productionOrigin(site.productionUrl);
if (!origin) failures.push('Configure a verified, real HTTPS production origin.');
if (!site.indexable) failures.push('Enable indexability deliberately after owner review.');
if (!site.legalName) failures.push('Confirm the legal operator name.');
if (!isEmail(site.email)) failures.push('Provide a verified enquiry/privacy email address.');
if (site.contactMode === 'unconfigured' || contactConfigError(site))
  failures.push('Configure a functioning email or supported endpoint enquiry mode.');
if (!site.retentionInfo) failures.push('Confirm enquiry retention practices.');
for (const [key, value] of Object.entries(site.confirmations))
  if (!value) failures.push(`Owner confirmation required: ${key}.`);
if (site.analyticsEnabled)
  failures.push('Analytics implementation requires a separate reviewed change.');
try {
  for (const route of routes.filter((r) => r.type !== '404')) {
    const html = await readFile(`dist${route.path}index.html`, 'utf8');
    if (/name="robots" content="[^"]*noindex/.test(html))
      failures.push(`Preview noindex remains: ${route.path}`);
    if (origin && !html.includes(`rel="canonical" href="${origin}${route.path}"`))
      failures.push(`Canonical mismatch: ${route.path}`);
    if (/lorem ipsum|TODO|href="#"|placeholder phone/i.test(html))
      failures.push(`Placeholder content: ${route.path}`);
  }
  const robots = await readFile('dist/robots.txt', 'utf8');
  if (robots.includes('Disallow: /')) failures.push('robots.txt still blocks crawlers.');
  await access('dist/sitemap.xml');
} catch (error) {
  failures.push(`Required production output missing: ${error.path || error.message}`);
}
if (failures.length) {
  console.error('NOT READY FOR PUBLIC LAUNCH\n' + failures.map((x) => `- ${x}`).join('\n'));
  process.exitCode = 1;
} else
  console.log(
    'Local release validation passed. Verify real delivery, host headers/HTTPS/404, commercial hosting terms, and deployment authorization before publication.',
  );
