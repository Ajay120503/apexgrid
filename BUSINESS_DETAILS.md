# Business details to complete

The local site is implemented with honest preview defaults. Edit `src/data/site.js`; rebuild after every configuration change. Everything in this file is public. The supplied `apexgrid.jpeg` is preserved as a brand reference.

| Field or confirmation | Current state | Used in | Launch importance |
| --- | --- | --- | --- |
| `productionUrl` | null | Canonicals, social URLs, sitemap, structured data | Required: verified HTTPS origin, with no path/query/port |
| `legalName` | null | Privacy, terms, Organization schema | Required: actual operator |
| `email` | null | Enquiry/privacy channel, direct links, email drafts | Required: verified public contact |
| `contactMode` | unconfigured | Contact page | Required: choose email or endpoint after configuration |
| `formEndpoint`, `formProvider` | null | Optional Formspree adapter | Required only for endpoint mode; a public form ID, never a private API key |
| Provider recipient | Unknown | Formspree account; privacy statement | Confirm recipient, account controls, processing practices and authorized delivery test for endpoint mode |
| `retentionInfo` | null | Privacy draft | Required: actual enquiry retention policy |
| `confirmations.copy` | false | Release gate | Confirm positioning, six offered services, process, engagement copy, scope and commercial statements |
| `confirmations.brand` | false | Release gate | Confirm text wordmark, palette, provided reference rights, provisional favicon and social image |
| `confirmations.legal` | false | Release gate | Review actual operator, hosting logs, retention, provider and legal drafts |
| `confirmations.contactTested` | false | Release gate | Verify email address; for endpoint mode authorize and check one real enquiry |
| `indexable` | false | Robots and per-page metadata | Enable deliberately for an approved production build |
| `phoneDisplay`, `phoneE164` | null | Direct contact links | Optional; both required to show a telephone link |
| `whatsappNumber` | null | Direct links | Optional, digits only with country code |
| `bookingUrl` | null | Direct links | Optional, verified HTTP/HTTPS URL |
| `socialLinks` | empty | Direct links | Optional objects `{ label, url }`; no platform-homepage stand-ins |
| `location` | null | Reserved business fact | Optional; currently not rendered, and no LocalBusiness claim is made |
| `analyticsEnabled` | false | Build/release safeguard | Optional; enabling requires a separately implemented privacy-reviewed integration |
| Testimonials/case studies | Empty | Reserved verified content fields | Optional. Current examples are concepts; adding real evidence requires explicit content integration and client permission |
| Currency and pricing | Unknown | Budget options and proposals | Numeric ranges intentionally omitted; edit `budgetOptions` in `src/data/content.js` only when confirmed |

No phone, social profile, street address, client, achieved result, certification, price or legal jurisdiction has been invented. Absence of optional channels or testimonials does not fail release validation. Publication and live enquiry submission are not authorized by the local build request.
