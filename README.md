# ApexGrid

A complete static digital-marketing website built from `ApexGrid.md`. The brief and supplied `apexgrid.jpeg` are preserved. The source includes a homepage, six service pages, approach/concept examples, contact, privacy, terms, and a useful 404: 12 generated HTML outputs.

**Local implementation is complete and verified. Public launch is blocked by missing business configuration and owner review.** No website was published and no live enquiry was sent.

## Run locally

Use Node 22.12 or newer (verified with Node 22.14.0) and npm (verified with npm 11.4.2). Use the committed npm lockfile; do not mix package managers.

```sh
npm ci
npm run dev
```

Open the local Vite URL, normally `http://localhost:5173`. Development serves React-rendered HTML through a local Vite middleware and hydrates it for interaction.

To review the actual static output:

```sh
npm run build
npm run preview
```

Open `http://localhost:4173`. Preview is a local utility, not a production hosting server. It serves route directories, redirects missing trailing slashes, and returns actual 404 status for unknown paths. The deployed app needs only `dist/`, with no runtime Node server.

## Architecture and versions

Exact direct versions are in `package.json`, with complete resolved dependencies in `package-lock.json`: React/React DOM 19.2.8, Vite 6.4.3, React Vite plugin 4.7.0, Tailwind CSS/Vite plugin 4.3.3, Lucide React 1.43.0, Vitest 3.2.7 and Playwright 1.63.0. These are compatible pinned releases; updates should be intentional and followed by checks. ESLint 9 is pinned to match the React lint plugin peer range.

The Vite client build creates hashed assets. A separate build of `src/entry-server.jsx` provides React server rendering to `scripts/prerender.mjs`. That script replaces the HTML/head slots for every route. The build-year and route are embedded as data attributes so hydration uses exactly the server-rendered values. No client router is necessary; ordinary links preserve static behavior.

`src/lib/routes.js` drives route generation and metadata, and shares service data with navigation and sitemap generation. `dist/404.html` is always noindex. Missing production configuration yields no production canonical or sitemap and adds preview noindex/robots restrictions. A configured domain creates absolute social URLs and a sitemap; indexing still requires `indexable: true`.

Tailwind v4 uses its official Vite plugin and CSS `@import`/`@theme` setup. Most art direction lives in readable component classes and shared tokens. Browser build targets are Chrome/Edge 111+, Firefox 128+, Safari 16.4+; these align with the modern CSS baseline and are not a claim that every historical release has been tested. Exact browser evidence is in `QA_REPORT.md`.

Native details/summary powers FAQs and mobile navigation. The mobile menu is an in-flow disclosure, not a modal: no overlay, focus trap or scroll lock is needed. Escape dismisses it and restores focus after hydration. Essential copy and navigation remain available without scripts. Motion is restricted to short hover transitions and optional smooth anchor movement; reduced-motion preference disables these. No reveal effect hides page content.

## Edit content and configuration

| Location | Purpose |
| --- | --- |
| `src/data/site.js` | Public business facts, enquiry mode, indexing and owner confirmations |
| `src/data/services.js` | Six service scopes, deliverables, inputs, FAQs and CTA labels |
| `src/data/content.js` | Main copy, principles, process, concept examples, engagements, FAQs and form messages |
| `src/data/legal.js` | Editable privacy/terms drafts reflecting the selected contact mode |
| `src/lib/routes.js` | Public paths, titles/descriptions and primary navigation |
| `src/styles/global.css` | Brand tokens, font, responsive layouts and focus/motion rules |
| `src/components/Graphics.jsx` | Original concept graphics and the connected-marketing diagram |
| `scripts/assets.mjs` | Provisional PNG icons and 1200×630 social image generation |

Do not add secrets to source, `.env` client variables or `dist/`. There is no secret-bearing integration. `.env.example` intentionally documents that configuration lives in the public data file. Optional social/phone/booking links appear only when configured. Numeric pricing, testimonials, verified clients and certifications are absent. The three examples are clearly labeled concepts.

## Contact modes

The default is `contactMode: 'unconfigured'`: a visible availability notice replaces the form; no enquiry data is collected or discarded.

For email mode, set a verified `email` and `contactMode: 'email'`. The form validates the required name, email and message, and optional fields. “Open email draft” creates an encoded mailto URI. Visitors must send it in their mail application. Messages too long for a reliable URI are shown as selectable copy text instead. Email mode never reports submission success.

For endpoint mode, set `contactMode: 'endpoint'`, `formProvider: 'formspree'`, and the actual public HTTPS endpoint in `formEndpoint` (`https://formspree.io/f/` followed by your assigned form ID). Confirm the receiving mailbox in the provider account and publish the verified email/privacy contact. This adapter submits JSON with `Accept: application/json`, uses Formspree's `_gotcha` honeypot, and requires an HTTP success plus JSON `ok: true` without errors. It does not support arbitrary providers without a new documented adapter.

Submission requires JavaScript; a no-script notice and configured direct links remain. Fields are disabled until hydration so an unenhanced form cannot accidentally serialize private text into a URL. The handler blocks duplicate submissions, times out after 12 seconds, never retries automatically, and retains values on failure. A timeout means acceptance could not be confirmed. Success means provider acceptance, not inbox delivery. No form content enters localStorage, logs or analytics. Provider-side controls and a separately authorized real delivery check remain launch tasks.

References for the adapter: [Formspree JavaScript submissions](https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax/) and [honeypot filtering](https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering/). Account plan limits and provider requirements should be verified when configured.

## Checks

Install browser binaries once when running browser tests on a fresh machine:

```sh
npx playwright install chromium
npm run lint
npm run build
npm test
npm run check:links
npm run check:release
```

`npm test` includes validation/delivery/component and generated-HTML tests, then production browser checks. Build first because static tests inspect `dist/`. Browser tests automatically start the local preview if it is not already running. All form POST tests are mocked and send no real messages. Screenshots and reports are saved in `qa/`.

Firefox checks: install with `npx playwright install firefox`, then run `npm run test:firefox`.

Additional commands: `npm run test:unit`, `npm run test:browser`, `npm run assets`, `npm run format`, and `npm run format:check`. With the preview running, `npm run audit` writes a mobile Lighthouse report using the Playwright Chromium binary.

`check:links` inspects all generated links, image/script/font references and anchor IDs. External destinations are explicitly reported as unverified instead of silently assumed reachable. `check:release` deliberately fails for missing production facts, unavailable contact, owner confirmations and preview indexing. A failed release check does not mean the local site is incomplete.

See `QA_REPORT.md` for measured results and actual limitations, including audit-tool dependencies. No field Core Web Vitals or accessibility certification is claimed.

## Static deployment preparation

Build command: `npm ci && npm run build`. Output directory: `dist`. Upload only this directory after separate deployment authorization. There is no CMS, backend, database, login, runtime server function or account setup.

Configure the host to serve `/<route>/index.html`, redirect slashless directory URLs to their trailing-slash equivalents, and use `/404.html` for unknown requests with status 404. Never apply a wildcard rewrite to `index.html` with HTTP 200. Enable gzip or Brotli, use immutable caching for `/assets/*`, and revalidate HTML, robots and sitemap. Security headers must match actual assets and contact connections; test CSP in report-only mode before enforcement. JSON-LD is an inline script block and must be accounted for if the chosen host enforces script hashes.

No hosting provider was selected. Verify current commercial-use terms and limits before choosing one; the brief explicitly excludes presenting Vercel Hobby as a company-hosting option. No always-free hosting claim is made. Production HTTPS, DNS, host headers, real 404s, and contact delivery remain host checks, not local claims.

Technical setup follows the [Tailwind Vite installation](https://tailwindcss.com/docs/installation/using-vite), [Vite build documentation](https://vite.dev/guide/build), and [static deployment guidance](https://vite.dev/guide/static-deploy).

## Maintenance and rollback

Review business facts and copy whenever scope changes. Keep the owner confirmations honest. Rebuild after content/configuration edits, run the affected tests and link check, and repeat the full release gate before publication. Review npm advisories regularly; update tooling in a separate change and regenerate the lockfile with npm. Never use forced dependency upgrades without testing.

Keep the source, lockfile and each approved `dist/` artifact together. Restore the previous complete artifact if a release fails; do not mix HTML and hashed asset versions. `BUSINESS_DETAILS.md`, `LAUNCH_CHECKLIST.md`, `QA_REPORT.md`, and `IMPLEMENTATION_STATUS.md` record the handoff and remaining actions.
# apexgrid

## Local example content

`npm run preview:content` generates `qa/content-preview.html`. Open it locally to review realistic but explicitly fictional testimonials and concept case studies alongside configuration examples. Edit `src/data/site.examples.js` to change these fixtures. This file is not imported into the live app. The mock booking URL is non-working and the Formspree endpoint contains a replacement marker. The 12-month retention wording is a sample, not an adopted policy. Use only real, permission-approved customer evidence in live configuration.
