export const site = {
  brandName: 'ApexGrid',
  legalName: 'ApexGrid',
  productionUrl: 'https://apexgrid.com',
  email: 'apexgrid31@gmail.com',
  phoneDisplay: '+91 96572 64056',
  phoneE164: '+919657264056',
  whatsappNumber: '919657264056',
  location: 'Kothrud, Pune, Maharashtra',
  bookingUrl: null, // Add your real booking-page URL; sample in site.examples.js.
  socialLinks: [{ label: 'Instagram', url: 'https://www.instagram.com/_apexgrid_/' }],
  contactMode: 'email', // Opens an email draft; use 'endpoint' for direct form submission.
  formEndpoint: null, // Add your assigned Formspree endpoint for direct submissions.
  formProvider: 'formspree', // Supported endpoint adapter: 'formspree'
  retentionInfo: null, // Required: describe how long you actually keep enquiry emails.
  analyticsEnabled: false, // No analytics integration is implemented yet.
  verifiedTestimonials: [], // Fictional test fixtures are isolated in site.examples.js.
  verifiedCaseStudies: [], // Keep real, permission-approved evidence here only.
  indexable: true,
  confirmations: { copy: true, brand: true, legal: true, contactTested: true },
};
