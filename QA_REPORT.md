# QA report

Verified locally on 8 September 2026. The source implementation is complete. Public release is intentionally blocked until the business information and owner confirmations are supplied.

## Environment

Ubuntu 24.04.4 LTS, Node 22.14.0, npm 11.4.2. Production directory served by `scripts/serve.mjs` on localhost:4173 with gzip, revalidation for HTML and immutable hashed-asset caching. Chromium 153.0.8010.12 and Firefox 155.0 via Playwright 1.63.0. Lighthouse 12.6.1, mobile simulated throttling and emulated mobile device; complete settings, environment and timing in `qa/lighthouse.json` and `qa/audit-summary.json`.

## Executed checks

| Check | Actual result |
| --- | --- |
| `npm ci` | Passed from the lockfile; installation log in `qa/install.log` |
| `npm run format:check` | Passed |
| `npm run lint` | Passed with no reported lint errors or warnings |
| `npm run build` | Passed; 12 real static HTML outputs, hashed JS/CSS, metadata and preview robots |
| `npm test` | Passed: 33 unit/static tests and 23 Chromium browser tests |
| `npm run test:firefox` | Passed: all 23 browser tests in Firefox |
| `npm run check:links` | Passed: 459 local references across 12 pages, including anchors and assets |
| Development SSR smoke | Homepage, SEO service and contact returned correct HTML/title with HTTP 200; unknown route returned 404; no page errors |
| `npm run check:release` | Expected failure: missing domain/operator/contact/retention/confirmations; preview noindex and absent production sitemap. Exact output in `qa/release-check.txt` |
| `npm audit --omit=dev` | Zero reported production dependency vulnerabilities; `qa/production-dependency-audit.json` |
| `npm audit` | Four high-severity development-tool dependency findings; see limitations below and `qa/dependency-audit.json` |

The original brief and brand JPEG were preserved. There was no Git repository to compare or commit; no branch, remote, DNS, account or deployment was changed.

## Content, route and interaction evidence

Every generated route has meaningful HTML, exactly one H1, a unique title, a matching description, social metadata, a local social asset and Organization structured data containing known facts only. Preview builds have no production canonicals or sitemap. Separate metadata tests check the configured-production branch, escaped values and 404 noindex. Browser direct navigation and reload cover all 12 routes. Unknown routes return HTTP 404 and useful recovery links.

All six service pages have distinct audiences, deliverables, inputs and FAQs. Concepts remain explicitly labeled; no client metrics, reviews, prices or certifications were fabricated. The current contact page has no editable form or submit action because no genuine recipient was supplied.

Mock tests cover trimmed international names, required lengths, invalid/unsafe optional URLs, invalid options, known and unknown service query values, field-error associations and first-invalid focus. The endpoint tests cover positive acceptance, malformed/rejected responses, provider validation errors, rate limits, offline/network errors, timeout, duplicate prevention, value retention, explicit retry, successful reset and honeypot filtering. Email mode tests verify honest draft copy, encoding, retained inputs and long-message selectable text. No live external POST was sent.

## Accessibility and visual review

- Chromium and Firefox automated axe checks found zero WCAG-tagged violations on homepage, SEO service, contact, approach, privacy and terms.
- Keyboard-driven checks passed for the skip link, main focus, native FAQ toggles, mobile navigation, Escape dismissal and restored focus. Focus indicators are visible and measured semantic palette pairs meet their tested 4.5:1 text or 3:1 UI thresholds.
- All routes remain readable with JavaScript disabled. Native mobile disclosure navigation and FAQs operate without JavaScript. No content depends on reveal animations.
- Responsive document-overflow checks passed at 320, 375, 390, 768, 1024, 1440, 1920 and 3840 CSS pixels for homepage, service, contact and approach in both tested browsers.
- 200% zoom was emulated using doubled device scale with effective 640 and 320 CSS-pixel viewports; these reflow checks passed. This is not a claim of manually operating a desktop browser's actual zoom UI.
- Reduced-motion checks verify immediate visible content and disabled smooth scrolling.
- Full-page visual evidence for homepage, SEO template and contact at 390, 768 and 1440 px is stored as `qa/{home,service,contact}-{width}.png`; Firefox captures carry `-firefox`. Desktop/mobile hero captures are also included. Images were reviewed for visual hierarchy, copy flow, page rhythm and component placement. Enlarged reading copy and replaced hydration-dependent mobile navigation during repair.
- Final console checks found no hydration warnings or page errors. Expected unknown-page HTTP 404 reporting was excluded from runtime-error assertions.

These checks support accessibility practices, not an accessibility certification or exhaustive assistive-technology evaluation.

## Final mobile Lighthouse result

| Metric | Measured result |
| --- | --- |
| Performance | 100 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 63 — preview is intentionally blocked from indexing |
| First contentful paint | 1.4 s |
| Largest contentful paint | 1.5 s |
| Cumulative layout shift | 0 |
| Total blocking time | 0 ms |
| Speed index | 1.4 s |
| Homepage network transfer | 119,971 bytes (117 KiB) |
| Initial JavaScript | 255,157 bytes raw; 79,344 bytes gzip |
| Initial CSS | 35,518 bytes raw; 8,371 bytes gzip |

Reports: `qa/lighthouse.html`, `qa/lighthouse.json`, `qa/audit-summary.json`. Local gzip was enabled to resemble a correctly configured static host. The initial audit identified mobile-navigation layout shift; the native disclosure removed that initialization shift in the final lab run. No field LCP/CLS/INP data exists before deployment. Total blocking time is a lab responsiveness proxy, not measured field INP. Lab results vary by machine, load and network, and these scores do not guarantee production results.

## Exact limitations and remaining checks

1. No verified production origin, operator, enquiry/privacy email, retention policy or owner confirmations were supplied. Actual provider account setup and delivery are unverified. Release validation correctly fails. No public deployment was requested or performed.
2. WebKit 26.6 downloaded, but host dependency validation reported missing `libevent-2.1-7t64` and `libavif16`. WebKit/Safari execution is unverified. On a suitably provisioned machine, install Playwright dependencies and add/run a WebKit project. No system package installation was needed to finish the Chromium/Firefox implementation.
3. Actual desktop browser zoom UI, real mobile hardware, screen-reader combinations, historical minimum browser releases, production HTTPS/headers/CSP/caching/DNS, and host-specific 404 behavior remain unverified. Reflow was checked using CSS viewport and device-scale emulation.
4. The four high npm findings are in Lighthouse's development dependency chain: `extract-zip` and its dependents `@puppeteer/browsers`, `puppeteer-core`, and `lighthouse`. The advisory is GHSA-jmr9-qjv8-65gv. No affected tool code is shipped in `dist/`; runtime dependency audit is clean. The audit uses the already-installed Playwright browser, not the affected browser download/extraction path. Do not treat this as an all-dependencies-clean result. Review a compatible tool upgrade with a newer Node toolchain; the inspected current Lighthouse 13.4.1 requires Node >=22.19, beyond this environment's 22.14.0. ESLint 9 is also intentionally retained for React plugin compatibility and reports an upstream deprecation notice during installation.
5. Production SEO must be audited after configuring the real origin and deliberately enabling indexing. Do not remove preview protections merely to improve this local score. Legal and privacy drafts require review against actual launch practices.
