import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'apexgrid-dev-ssr',
      configureServer(server) {
        return () =>
          server.middlewares.use(async (req, res, next) => {
            if (!req.headers.accept?.includes('text/html')) return next();
            try {
              const { readFile } = await import('node:fs/promises');
              const requestUrl = req.originalUrl || req.url;
              const template = await server.transformIndexHtml(
                requestUrl,
                await readFile('index.html', 'utf8'),
              );
              const { renderPage } = await server.ssrLoadModule('/src/entry-server.jsx');
              const result = renderPage(new URL(requestUrl, 'http://localhost').pathname);
              res.statusCode = result.status;
              res.setHeader('Content-Type', 'text/html');
              res.end(
                template
                  .replace('<!--app-head-->', result.head)
                  .replace('<!--app-html-->', result.html)
                  .replace(
                    '<div id="root">',
                    `<div id="root" data-year="${result.year}" data-route="${result.path}">`,
                  ),
              );
            } catch (error) {
              server.ssrFixStacktrace(error);
              next(error);
            }
          });
      },
    },
  ],
  build: {
    target: ['chrome111', 'edge111', 'firefox128', 'safari16.4'],
    cssTarget: ['chrome111', 'safari16.4'],
    sourcemap: false,
  },
});
