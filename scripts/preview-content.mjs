// Generates a local QA artifact only. Never writes demo claims into public/ or dist/.
import { mkdir, writeFile } from 'node:fs/promises';
import { siteExamples as demo } from '../src/data/site.examples.js';
import { escapeHtml as escape } from '../src/lib/metadata.js';
const testimonials = demo.verifiedTestimonials
  .map(
    (item) =>
      `<article><p class="label">${escape(item.label)}</p><blockquote>“${escape(item.quote)}”</blockquote><strong>${escape(item.name)}</strong><p>${escape(item.role)} · ${escape(item.company)}</p></article>`,
  )
  .join('');
const cases = demo.verifiedCaseStudies
  .map(
    (item) =>
      `<article><p class="label">${escape(item.label)}</p><h3>${escape(item.title)}</h3><p>${escape(item.client)}</p><h4>Challenge</h4><p>${escape(item.challenge)}</p><h4>Proposed approach</h4><p>${escape(item.approach)}</p><h4>Sample deliverables</h4><ul>${item.deliverables.map((text) => `<li>${escape(text)}</li>`).join('')}</ul><h4>What would be measured</h4><p>${escape(item.measurementPlan)}</p><p class="label">No achieved results or client permission supplied.</p></article>`,
  )
  .join('');
const settings = ['location', 'bookingUrl', 'formProvider', 'formEndpoint', 'retentionInfo']
  .map((key) => `<dt>${escape(key)}</dt><dd>${escape(demo[key])}</dd>`)
  .join('');
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>ApexGrid · Demo content preview</title><style>body{margin:0;background:#fafaf9;color:#0d0d0d;font:16px/1.7 system-ui,sans-serif}main{max-width:1100px;margin:auto;padding:40px 24px}.banner{padding:16px 22px;background:#0d0d0d;color:white;border-radius:8px}.brand{font-size:32px;font-weight:800;letter-spacing:-1px}.brand span{color:#c4197a}h1{font-size:clamp(32px,5vw,56px);line-height:1.15;letter-spacing:-2px}h2{margin-top:50px;font-size:30px;letter-spacing:-1px}h3{font-size:24px;line-height:1.3}h4{margin-bottom:4px}p{color:#605d63}blockquote{margin:24px 0;font-size:20px;line-height:1.6}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}article{padding:28px;background:white;border:1px solid #d9d5d8;border-radius:12px}.label{color:#9a1361;font-size:13px;font-weight:700}dt{font-weight:700;margin-top:20px}dd{margin:5px 0 0;overflow-wrap:anywhere}code{font-size:14px}@media(max-width:680px){.grid{grid-template-columns:1fr}article{padding:22px}}</style></head><body><main><p class="brand">Apex<span>Grid</span></p><div class="banner">LOCAL TEST PREVIEW · Every testimonial and case study below is fictional. These examples are not published on your website.</div><h1>Example content,<br>ready for your real details.</h1><p>Edit <code>src/data/site.examples.js</code>, then run <code>npm run preview:content</code> again. There are no working booking or submission actions in this preview.</p><h2>Testimonials</h2><div class="grid">${testimonials}</div><h2>Case studies</h2><div class="grid">${cases}</div><h2>Configuration examples</h2><dl>${settings}</dl></main></body></html>`;
await mkdir('qa', { recursive: true });
await writeFile('qa/content-preview.html', html);
console.log('Local demo preview: qa/content-preview.html (not included in dist/)');
