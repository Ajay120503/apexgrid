import lighthouse from 'lighthouse';
import { chromium } from '@playwright/test';
import { writeFile, readdir, readFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
const browser = await chromium.launch({ args: ['--remote-debugging-port=9222'] });
try {
  const result = await lighthouse('http://127.0.0.1:4173/', {
    port: 9222,
    output: ['html', 'json'],
    logLevel: 'error',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  });
  await writeFile('qa/lighthouse.html', result.report[0]);
  await writeFile('qa/lighthouse.json', result.report[1]);
  const lhr = result.lhr;
  const summary = {
    date: new Date().toISOString(),
    lighthouseVersion: lhr.lighthouseVersion,
    userAgent: lhr.userAgent,
    environment: lhr.environment,
    settings: lhr.configSettings,
    scores: Object.fromEntries(
      Object.entries(lhr.categories).map(([key, category]) => [key, category.score * 100]),
    ),
    metrics: Object.fromEntries(
      [
        'first-contentful-paint',
        'largest-contentful-paint',
        'cumulative-layout-shift',
        'total-blocking-time',
        'speed-index',
        'total-byte-weight',
      ].map((key) => [
        key,
        { value: lhr.audits[key].numericValue, display: lhr.audits[key].displayValue },
      ]),
    ),
    notPassing: Object.entries(lhr.audits)
      .filter(([, a]) => a.score !== null && a.score < 1)
      .map(([key, a]) => ({ id: key, title: a.title, score: a.score, display: a.displayValue })),
  };
  const sizes = [];
  for (const name of await readdir('dist/assets')) {
    const data = await readFile(`dist/assets/${name}`);
    sizes.push({ name, bytes: data.length, gzip: gzipSync(data).length });
  }
  summary.assets = sizes;
  await writeFile('qa/audit-summary.json', JSON.stringify(summary, null, 2));
  console.log(
    JSON.stringify({ scores: summary.scores, metrics: summary.metrics, assets: sizes }, null, 2),
  );
} finally {
  await browser.close();
}
