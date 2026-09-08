import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import { findRoute, routes } from './lib/routes.js';
import { metadata } from './lib/metadata.js';
import { site } from './data/site.js';
export { routes, site };
export function renderPage(path, year = new Date().getFullYear()) {
  const route = findRoute(path);
  return {
    html: renderToString(<App route={route} year={year} />),
    head: metadata(route, site),
    year,
    path: route.path,
    status: route.type === '404' ? 404 : 200,
  };
}
