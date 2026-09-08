import { defineConfig } from '@playwright/test';
import base from './playwright.config.js';
export default defineConfig({
  ...base,
  reporter: [['list'], ['json', { outputFile: 'qa/firefox-results.json' }]],
  projects: [{ name: 'firefox', use: { browserName: 'firefox' } }],
});
