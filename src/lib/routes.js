import { services } from '../data/services.js';
export const routes = [
  {
    path: '/',
    type: 'home',
    title: 'ApexGrid | Digital Marketing, SEO & Web Design',
    description:
      "Explore ApexGrid's SEO, paid media, social content, web design, and analytics services. Discuss a focused digital marketing plan for your business.",
  },
  ...services.map((service) => ({
    path: `/services/${service.id}/`,
    type: 'service',
    service,
    title: `${service.name} | ApexGrid`,
    description: service.intro,
  })),
  {
    path: '/approach/',
    type: 'approach',
    title: 'Our Approach & Selected Work | ApexGrid',
    description:
      'Explore our four-step marketing process and selected brand posters, product creatives, and packaging artwork.',
  },
  {
    path: '/contact/',
    type: 'contact',
    title: 'Start a Project Conversation | ApexGrid',
    description:
      'Explore the next step for your business. Find enquiry availability and what to include when discussing your marketing goals with ApexGrid.',
  },
  {
    path: '/privacy/',
    type: 'privacy',
    title: 'Privacy Information | ApexGrid',
    description:
      'Read how this ApexGrid website handles enquiry information, analytics, external links, and contact availability.',
  },
  {
    path: '/terms/',
    type: 'terms',
    title: 'Website Terms | ApexGrid',
    description:
      'Read the draft terms for using the ApexGrid website, including service information, proposals, content, and external links.',
  },
  {
    path: '/404.html',
    type: '404',
    title: 'Page Not Found | ApexGrid',
    description:
      'This page could not be found. Return to ApexGrid or explore our digital marketing services.',
  },
];
export const navigation = [
  { label: 'Services', href: '/#services' },
  { label: 'Approach', href: '/approach/' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/contact/' },
];
export const findRoute = (path) =>
  routes.find(
    (route) =>
      route.path ===
      (path === '/' || path.endsWith('/') || path.endsWith('.html') ? path : `${path}/`),
  ) || routes.at(-1);
