# Public launch checklist

Local implementation and public launch are separate milestones. The current build is intentionally a noindex preview with enquiries unavailable. `npm run check:release` must fail until the required facts are provided.

## Owner and business review

- [ ] Confirm the proposed positioning, all six services, process, engagement scope, and copy.
- [ ] Confirm the text wordmark, supplied brand reference, original concept illustrations and provisional favicon.
- [ ] Configure the verified HTTPS production origin and actual legal operator.
- [ ] Configure a verified public email for enquiries and privacy questions.
- [ ] Choose `email` or `endpoint` mode and complete its configuration.
- [ ] Supply the enquiry retention information and review the final hosting/provider data practices.
- [ ] Review privacy and terms drafts against actual arrangements. These are not legal certifications.
- [ ] Record the corresponding owner confirmations in `src/data/site.js`.

## Contact acceptance

- [ ] Email mode: verify the recipient; test draft creation in relevant email clients, including the long-message copy fallback. Sending remains the visitor's action.
- [ ] Endpoint mode: use the supported public Formspree `/f/ID` endpoint, confirm its recipient and provider-side spam/domain controls. No private API keys belong in source.
- [ ] Endpoint mode: separately authorize one real test enquiry and confirm its processing and receipt. Automated tests use mocks only.
- [ ] Review provider retention, rate limits, charges and spam controls. The client honeypot is not a security boundary.

## Build and host

- [ ] Run `npm ci`, `npm run lint`, `npm run build`, `npm test`, and `npm run check:links`.
- [ ] Set `indexable: true` deliberately for production and rebuild.
- [ ] Run `npm run check:release`; verify canonicals, sitemap, social image URLs and robots in `dist/`.
- [ ] Verify host-level headers do not preserve preview noindex directives. Never use robots as access control.
- [ ] Choose hosting whose current terms allow a company website. No hosting plan has been purchased or promised to be permanently free.
- [ ] Configure HTTPS and the chosen domain only after authorization.
- [ ] Serve generated route directories, canonical trailing slashes, and `404.html` with actual HTTP 404 for unknown paths. Do not add a wildcard SPA-to-home rewrite.
- [ ] Cache hashed assets immutably; revalidate HTML. Apply suitable security headers and test a CSP in report-only mode before enforcement, including JSON-LD and the chosen contact connection.
- [ ] Recheck accessibility, keyboard behavior, native browser zoom, mobile devices, Safari/WebKit and Firefox on the actual host.
- [ ] Resolve or accept documented tooling audit limitations as part of maintenance; no affected development tooling is deployed in `dist/`.
- [ ] Repeat Lighthouse against the approved production output. Preview SEO is intentionally reduced by noindex and robots restrictions.
- [ ] Obtain deployment authorization, preserve the previous version, and verify homepage, interior direct loads, contact and 404 after publication.

## Rollback

Keep each approved `dist/` artifact with its matching source and lockfile. If a release fails, restore the previous complete artifact or the host's previous deployment. Do not combine old HTML with new hashed assets. Recheck contact configuration and indexing rules after rollback.
