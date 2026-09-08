import { hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import { findRoute } from './lib/routes.js';
import './styles/global.css';
const root = document.getElementById('root');
hydrateRoot(
  root,
  <App
    route={findRoute(root.dataset.route || window.location.pathname)}
    year={Number(root.dataset.year)}
  />,
);
