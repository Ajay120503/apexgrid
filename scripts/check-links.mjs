import { readFile, stat, access } from 'node:fs/promises';
import path from 'node:path';
import { JSDOM } from 'jsdom';
import { routes } from '../src/lib/routes.js';
const root = path.resolve('dist');
const errors = [];
const external = new Set();
let checked = 0;
for (const route of routes) {
  const file = route.type === '404' ? 'dist/404.html' : path.join('dist', route.path, 'index.html');
  const dom = new JSDOM(await readFile(file, 'utf8'));
  for (const element of dom.window.document.querySelectorAll('[href],[src]')) {
    const raw = element.getAttribute('href') ?? element.getAttribute('src');
    if (!raw || raw === '#') {
      errors.push(`${route.path}: empty/dummy reference`);
      continue;
    }
    if (/^(https?:|mailto:|tel:)/.test(raw)) {
      external.add(raw);
      continue;
    }
    checked++;
    const url = new URL(raw, `https://local.invalid${route.path}`);
    let target = path.resolve(root, `.${decodeURIComponent(url.pathname)}`);
    if (!target.startsWith(root + path.sep) && target !== root) {
      errors.push(`Outside output: ${raw}`);
      continue;
    }
    try {
      if ((await stat(target)).isDirectory()) target = path.join(target, 'index.html');
      await access(target);
      if (url.hash) {
        const targetDom = new JSDOM(await readFile(target, 'utf8'));
        if (!targetDom.window.document.getElementById(decodeURIComponent(url.hash.slice(1))))
          errors.push(`${route.path}: missing anchor ${raw}`);
      }
    } catch {
      errors.push(`${route.path}: missing target ${raw}`);
    }
  }
}
console.log(`Checked ${checked} local references across ${routes.length} pages.`);
if (external.size)
  console.log(`External destinations not requested (unverified): ${[...external].join(', ')}`);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else console.log('All local links, assets and anchors resolve.');
