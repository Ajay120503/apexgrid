// Local preview only. Serve static files with genuine 404s, not SPA fallbacks.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
const root = path.resolve('dist');
const portArg = process.argv.indexOf('--port');
const port = Number(portArg > -1 ? process.argv[portArg + 1] : process.env.PORT || 4173);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};
createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    let file = path.resolve(root, `.${pathname}`);
    if (!file.startsWith(`${root}${path.sep}`) && file !== root) {
      res.writeHead(403);
      return res.end('Forbidden');
    }
    let status = 200;
    try {
      if ((await stat(file)).isDirectory()) {
        if (!pathname.endsWith('/')) {
          res.writeHead(308, { Location: `${url.pathname}/${url.search}` });
          return res.end();
        }
        file = path.join(file, 'index.html');
      }
      await stat(file);
      if (pathname === '/404.html') status = 404;
    } catch {
      file = path.join(root, '404.html');
      status = 404;
    }
    const data = await readFile(file);
    const compress =
      /\bgzip\b/.test(req.headers['accept-encoding'] || '') &&
      /\.(html|js|css|svg|json|xml|txt)$/.test(file);
    const payload = compress ? gzipSync(data) : data;
    res.writeHead(status, {
      'Content-Type': types[path.extname(file)] || 'application/octet-stream',
      'Cache-Control': file.includes('/assets/')
        ? 'public, max-age=31536000, immutable'
        : 'no-cache',
      'X-Content-Type-Options': 'nosniff',
      Vary: 'Accept-Encoding',
      ...(compress ? { 'Content-Encoding': 'gzip' } : {}),
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    });
    res.end(req.method === 'HEAD' ? undefined : payload);
  } catch {
    res.writeHead(400);
    res.end('Bad request');
  }
}).listen(port, '0.0.0.0', () => console.log(`Static preview: http://localhost:${port}`));
