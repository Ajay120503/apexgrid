import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { routes } from '../src/lib/routes.js';
import { metadata } from '../src/lib/metadata.js';
import { site } from '../src/data/site.js';
import { productionOrigin } from '../src/lib/config.js';
const luminance = (hex) => {
  const rgb = hex
    .replace('#', '')
    .match(/../g)
    .map((x) => parseInt(x, 16) / 255)
    .map((x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
};
const ratio = (a, b) => {
  const x = luminance(a),
    y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};
describe('static output and metadata', () => {
  it('contains meaningful unique page content without hydration, correct previews and actual assets', () => {
    const titles = new Set();
    for (const route of routes) {
      const file = route.type === '404' ? 'dist/404.html' : `dist${route.path}index.html`;
      const doc = new JSDOM(readFileSync(file, 'utf8')).window.document;
      expect(doc.querySelectorAll('h1')).toHaveLength(1);
      expect(doc.querySelector('main').textContent.length).toBeGreaterThan(100);
      expect(doc.title).toBe(route.title);
      titles.add(doc.title);
      const origin = productionOrigin(site.productionUrl);
      expect(doc.querySelector('meta[name="robots"]').content).toBe(
        origin && site.indexable && route.type !== '404' ? 'index, follow' : 'noindex, nofollow',
      );
      const canonical = doc.querySelector('link[rel="canonical"]');
      if (origin && route.type !== '404') expect(canonical.href).toBe(`${origin}${route.path}`);
      else expect(canonical).toBeNull();
      expect(doc.querySelector('meta[property="og:image:width"]').content).toBe('1200');
      expect(doc.querySelector('meta[property="og:image:height"]').content).toBe('630');
      const schema = JSON.parse(
        doc.querySelector('script[type="application/ld+json"]').textContent,
      );
      expect(schema['@type']).toBe('Organization');
      expect(schema.address).toBeUndefined();
    }
    expect(titles.size).toBe(routes.length);
  });
  it('generates real production metadata only for a valid configured origin', () => {
    const config = { ...site, productionUrl: 'https://apexgrid.agency', indexable: true };
    const doc = new JSDOM(metadata(routes[1], config)).window.document;
    expect(doc.querySelector('meta[name="robots"]').content).toBe('index, follow');
    expect(doc.querySelector('link[rel="canonical"]').href).toBe(
      'https://apexgrid.agency/services/seo/',
    );
    expect(doc.querySelector('meta[property="og:image"]').content).toBe(
      'https://apexgrid.agency/social-preview.png',
    );
    expect(
      new JSDOM(metadata(routes.at(-1), config)).window.document.querySelector(
        'meta[name="robots"]',
      ).content,
    ).toBe('noindex, nofollow');
  });
  it('escapes unsafe metadata values and embedded structured data', () => {
    const doc = new JSDOM(
      metadata(
        { ...routes[0], title: '<script>bad</script>' },
        { ...site, brandName: '</script><script>bad</script>' },
      ),
    ).window.document;
    expect(doc.querySelectorAll('script')).toHaveLength(1);
    expect(doc.title).toBe('<script>bad</script>');
  });
});
describe('semantic palette contrast', () => {
  it.each([
    ['#0d0d0d', '#fafaf9', 4.5],
    ['#6b6b6e', '#fafaf9', 4.5],
    ['#6b6b6e', '#eeedeb', 4.5],
    ['#c4197a', '#ffffff', 4.5],
    ['#c4197a', '#fafaf9', 4.5],
    ['#f18abe', '#0d0d0d', 4.5],
    ['#a61b32', '#ffffff', 4.5],
    ['#828086', '#ffffff', 3],
    ['#c4197a', '#eeedeb', 3],
  ])('%s on %s meets %s:1', (foreground, background, minimum) => {
    expect(ratio(foreground, background)).toBeGreaterThanOrEqual(minimum);
  });
});
