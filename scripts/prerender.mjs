import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { renderPage, routes, site } from '../.ssr/entry-server.js';
import { contactConfigError, productionOrigin } from '../src/lib/config.js';
const error = contactConfigError(site);
if (error) throw new Error(error);
if (site.productionUrl && !productionOrigin(site.productionUrl))
  throw new Error('productionUrl must be a real HTTPS origin.');
if (site.analyticsEnabled)
  throw new Error('Analytics is not implemented; leave analyticsEnabled false.');
const template = await readFile('dist/index.html', 'utf8');
for (const route of routes) {
  const result = renderPage(route.path);
  const html = template
    .replace('<!--app-head-->', result.head)
    .replace('<!--app-html-->', result.html)
    .replace(
      '<div id="root">',
      `<div id="root" data-year="${result.year}" data-route="${result.path}">`,
    );
  const file = route.type === '404' ? 'dist/404.html' : path.join('dist', route.path, 'index.html');
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);
}
const origin = productionOrigin(site.productionUrl);
if (origin) {
  await writeFile(
    'dist/sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes
      .filter((r) => r.type !== '404')
      .map((r) => `<url><loc>${origin}${r.path}</loc></url>`)
      .join('')}</urlset>`,
  );
}
await writeFile(
  'dist/robots.txt',
  origin && site.indexable
    ? `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n',
);
await writeFile(
  'dist/build-info.json',
  JSON.stringify(
    {
      year: new Date().getFullYear(),
      routes: routes.map((r) => r.path),
      indexable: !!origin && site.indexable,
    },
    null,
    2,
  ),
);
console.log(
  `Generated ${routes.length} static pages. ${origin && site.indexable ? 'Production indexing enabled.' : 'Preview: noindex; release validation required.'}`,
);
