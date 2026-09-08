import { contactConfigError, isEmail } from '../lib/config.js';
export function legalContent(type, site) {
  const available = !contactConfigError(site) && site.contactMode !== 'unconfigured';
  if (type === 'privacy')
    return [
      [
        'About this information',
        `This is an editable privacy draft for the ApexGrid website. ${site.legalName ? `The website operator is ${site.legalName}.` : 'Operator details and final data-handling arrangements have not yet been confirmed for public launch.'}`,
      ],
      [
        'Enquiry information',
        available
          ? 'The enquiry form asks for your name, email address, project description, and optionally your company, website, service interest, and budget preference. These details are used to respond to your request and discuss the work you are considering. Do not include passwords or sensitive account information.'
          : 'Online enquiries are not currently available, and this site does not currently collect project messages through a contact form.',
      ],
      [
        'How a message is handled',
        available && site.contactMode === 'endpoint'
          ? `Enquiries are sent over HTTPS to Formspree for processing and routing to the recipient configured by the website operator.${isEmail(site.email) ? ` The published contact address is ${site.email}.` : ' A public recipient contact address has not yet been confirmed.'} Provider acceptance does not guarantee inbox delivery. Formspree has its own privacy practices.`
          : available && site.contactMode === 'email'
            ? `The form prepares an email draft addressed to ${site.email}. You choose whether to send it using your email application. Your email provider then handles the message under its own terms. This website cannot detect delivery.`
            : 'No form provider receives an enquiry from this unconfigured website. When a contact channel is introduced, this information must be updated to reflect the actual recipient and provider.',
      ],
      [
        'Storage and retention',
        `The website does not save enquiry text in browser storage, analytics events, or website URLs. ${site.retentionInfo || 'Retention periods for future enquiries have not yet been supplied and must be confirmed before that channel is launched.'} A hosting provider may maintain technical request logs under its own practices; the final hosting arrangements require review.`,
      ],
      [
        'Analytics and cookies',
        'This implementation does not load analytics, advertising trackers, or third-party embeds, and it does not set application cookies. Fonts and visual assets are served locally. Any future analytics or tracking change requires a fresh review of this information and applicable consent requirements.',
      ],
      [
        'External links',
        'If you follow an external link, including an email, social, or booking link where available, the destination service handles your interaction under its own privacy practices.',
      ],
      [
        'Questions and requests',
        isEmail(site.email)
          ? `For questions about enquiry information, contact ${site.email} using the email link on the contact page.`
          : 'A verified privacy contact is not yet available. The contact page shows current enquiry availability. Operator and privacy contact details must be completed before public launch.',
      ],
    ];
  return [
    [
      'About these draft terms',
      `These editable website-use terms describe the ApexGrid website. ${site.legalName ? `The website operator is ${site.legalName}.` : 'The legal operator has not yet been confirmed for public launch.'} Final terms require owner review against actual business arrangements.`,
    ],
    [
      'Website information and services',
      'Service descriptions explain proposed areas of support. They are general information, not a binding proposal, offer, or guarantee of a particular result. Deliverables, fees, responsibilities, third-party charges, and schedules are agreed separately in a written proposal or contract.',
    ],
    [
      'Concept examples',
      'Examples labeled “Concept example — not client work” illustrate a possible approach. They are not completed client projects and do not represent achieved performance or customer endorsements.',
    ],
    [
      'Using this website',
      'Use the website lawfully. Do not attempt to disrupt it, interfere with its forms, or misuse any contact channel. Do not send credentials or sensitive account data through an enquiry.',
    ],
    [
      'Content and ownership',
      'The website includes ApexGrid brand materials, original compositions, and separately licensed fonts and icons. Rights in those materials remain with their respective owners. Viewing this website does not grant rights to reuse branding or other protected content. Ownership and licensing of commissioned work are addressed in the relevant contract.',
    ],
    [
      'Links and availability',
      'External services have their own terms. Website content and contact availability may change. Information should be confirmed in a project conversation before you rely on it for a business decision.',
    ],
    [
      'Questions',
      isEmail(site.email)
        ? `Questions about this website may be sent to ${site.email} using the contact page.`
        : 'The contact page shows current enquiry availability. Verified operator and contact details must be provided before public launch.',
    ],
  ];
}
