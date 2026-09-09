// DEMO FIXTURES ONLY. Not imported by the live site.
// These examples describe data shapes; they are not verified customers or business policies.
export const siteExamples = {
  location: 'Kothrud, Pune',
  bookingUrl: 'https://example.invalid/book/apexgrid', // Non-working example; replace with your real booking URL.
  contactMode: 'endpoint',
  formProvider: 'formspree',
  formEndpoint: 'https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID', // Template only; cannot pass configuration validation.
  retentionInfo:
    'Sample policy — not adopted: We retain project enquiry emails for up to 12 months after our last conversation, then delete them unless they relate to an ongoing client relationship or records we must retain.',
  verifiedTestimonials: [
    {
      id: 'demo-testimonial-1',
      verified: false,
      label: 'Demo testimonial — fictional, not a customer endorsement',
      name: 'Demo founder',
      role: 'Founder',
      company: 'Example home-services business',
      quote:
        'The project gave us a clearer way to explain our services. We especially appreciated having the website, messaging, and next steps organised around the same goal.',
      permissionToPublish: false,
    },
    {
      id: 'demo-testimonial-2',
      verified: false,
      label: 'Demo testimonial — fictional, not a customer endorsement',
      name: 'Demo marketing lead',
      role: 'Marketing lead',
      company: 'Example product brand',
      quote:
        'Having a shared content plan made reviews easier. Each piece had a purpose, and we could see how the launch messages fitted together across our channels.',
      permissionToPublish: false,
    },
  ],
  verifiedCaseStudies: [
    {
      id: 'demo-local-services',
      verified: false,
      label: 'Concept case study — fictional, not completed client work',
      title: 'A clearer path from local search to enquiry',
      client: 'Example home-services business',
      services: ['seo', 'web-design'],
      challenge:
        'Service information is spread across several pages, making it difficult for visitors to understand coverage and choose the right next step.',
      approach:
        'Organise the service pages around customer questions, clarify the offer, and simplify the route to an enquiry.',
      deliverables: [
        'Service-page structure',
        'Search-intent map',
        'Responsive page concept',
        'Enquiry journey review',
      ],
      measurementPlan:
        'Observe relevant search visits, service-to-contact journeys, and enquiry quality after an agreed baseline is established.',
      results: null, // Only add real results when supported by evidence and a timeframe.
      timeframe: null,
      evidenceUrl: null,
      permissionToPublish: false,
    },
    {
      id: 'demo-product-launch',
      verified: false,
      label: 'Concept case study — fictional, not completed client work',
      title: 'One product message across the launch journey',
      client: 'Example product brand',
      services: ['content-branding', 'paid-media', 'social-media'],
      challenge:
        'A new product needs a consistent introduction across its landing page, social content, and advertising creative.',
      approach:
        'Develop a message framework, plan the launch content sequence, and define creative tests before committing to a wider campaign.',
      deliverables: [
        'Message framework',
        'Creative concepts',
        'Launch content calendar',
        'Campaign test plan',
      ],
      measurementPlan:
        'Compare creative engagement and qualified landing-page visits. Review customer actions without treating engagement alone as sales evidence.',
      results: null,
      timeframe: null,
      evidenceUrl: null,
      permissionToPublish: false,
    },
  ],
};
