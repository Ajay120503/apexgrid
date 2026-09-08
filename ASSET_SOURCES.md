# Asset sources and licenses

- `apexgrid.jpeg`: supplied by the user and preserved unchanged in the root. It provides the ink/magenta wordmark and copper brand-mark reference. It is not cropped, hotlinked or shipped as a large page image. Owner confirmation of public brand use remains a launch requirement.
- Text wordmark: rendered in the site font with Apex in ink and Grid in magenta. No claim of registered trademark status.
- `public/favicon.svg`, `favicon.png`, `apple-touch-icon.png`: original provisional geometric A mark. This is a small-icon fallback, not a recreation of the official copper logo. Replace with approved brand assets when supplied in production-ready form.
- `public/social-preview.png`: original 1200×630 graphic generated locally by `scripts/assets.mjs` with Sharp from vector primitives and text; no external image service. Regenerate with `npm run assets` after editing.
- `src/components/Graphics.jsx`: original SVG/CSS growth diagram and abstract concept compositions. The diagram describes a process; it contains no live metrics or achieved results.
- `public/manrope-latin.woff2`: Manrope variable Latin font from `@fontsource-variable/manrope` 5.3.0, SIL Open Font License 1.1. License in `src/assets/FONT-LICENSE.txt`. One self-hosted file; other scripts use system fallbacks. No font CDN requests.
- Lucide icons: selective imports from `lucide-react` 1.43.0, ISC license. Dependency license retained by npm; the public notice is `public/THIRD_PARTY_NOTICES.txt`.
- React and React DOM: MIT licensed; bundled license notices retained in distribution and public notices.

Copper tokens are reserved for official logo decoration and are not used for ordinary website elements. No stock photography, client logos, campaign screenshots, or third-party embeds are used.
