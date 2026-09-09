import manifest from './work-assets.json';
export const work = [
  {
    id: 'apexgrid-heritage',
    title: 'ApexGrid — Heritage collage',
    category: 'Brand communication',
    description:
      'An ApexGrid brand poster bringing together Indian decorative motifs, vintage stamp details, and the agency’s digital marketing message.',
    detail:
      'A layered composition of illustrated stamps, florals, and familiar cultural details surrounds the ApexGrid identity. The artwork connects the headline “Traditional Values for a Digital Tomorrow” with the agency’s services.',
    alt: 'ApexGrid poster with vintage Indian stamps, an illustrated elephant, auto-rickshaw, lotus flowers and the headline Traditional Values for a Digital Tomorrow.',
    width: 1024,
    height: 1536,
  },
  {
    id: 'apexgrid-traditional-values',
    title: 'ApexGrid — Traditional values',
    category: 'Brand creative',
    description:
      'A brand poster pairing traditional architecture and warm visual details with a contemporary digital-work setting.',
    detail:
      'The ApexGrid wordmark and copper emblem lead a composition featuring architectural arches, brass lamps, and a person working at a laptop. A clear service list complements the central brand message.',
    alt: 'ApexGrid poster with a woman using a laptop, traditional architecture, brass lamps, and a list of digital marketing services.',
    width: 1024,
    height: 1536,
  },
  {
    id: 'tiago-social-creative',
    title: 'Tiago — Automotive social creative',
    category: 'Social media design',
    description:
      'An automotive promotional layout using contrasting red panels, product photography, and prominent model typography.',
    detail:
      'Two views of the Tata Tiago anchor a diagonal red-and-charcoal composition. The design brings the model name and promotional message into a single social-media artwork.',
    note: 'Portfolio artwork. Any price displayed belongs to the supplied design and is not a current offer from ApexGrid.',
    alt: 'Automotive social-media design showing two views of a red Tata Tiago against a diagonal red and charcoal background.',
    width: 2160,
    height: 2700,
  },
  {
    id: 'green-bean-coffee',
    title: 'Green Bean — Coffee product creative',
    category: 'Product advertising',
    description:
      'A coffee product composition with a teal backdrop, floating leaf details, and the packaging as the central focus.',
    detail:
      'The design places the Green Bean coffee pouch at the centre of a fresh, botanical composition. Large product typography and a restrained colour palette support the packaging presentation.',
    alt: 'Green Bean coffee pouch on a teal background surrounded by green leaves, with a coffee headline above it.',
    width: 1620,
    height: 2025,
  },
  {
    id: 'sprite-refreshment',
    title: 'Sprite — Refreshment creative',
    category: 'Beverage advertising',
    description:
      'A beverage artwork combining citrus, mint, and water-splash details around a chilled Sprite can.',
    detail:
      'A tilted product image sits against oversized green typography. Citrus slices, mint leaves, and splash effects create a layered composition around the can.',
    alt: 'Sprite can surrounded by lime, lemon, mint leaves, and splashing water on a bright green design board.',
    width: 1427,
    height: 1671,
  },
  {
    id: 'krisp-packaging',
    title: 'Krisp — Beverage packaging range',
    category: 'Packaging design',
    description:
      'A coordinated label range using fruit imagery and distinct colour blocks for five beverage flavours.',
    detail:
      'Watermelon, orange, kiwi, blueberry, and jamun variants share a consistent label structure. Typography, fruit photography, and individual colour palettes connect the range while distinguishing each flavour.',
    alt: 'Krisp beverage label designs for watermelon, orange, kiwi, blueberry, and jamun, arranged horizontally in pink, yellow, green, blue, and purple.',
    width: 4995,
    height: 1258,
    wide: true,
    fullWidth: 2400,
  },
];
export const workImage = (item, width = 1200) => `/work/${item.id}-${width}.webp`;

export const workAsset = (item, version = 'refined') => manifest[item.id][version];
export const isRefined = (item) => manifest[item.id].refined;
export const workGroup = (item) =>
  item.wide ? 'Packaging' : item.id.startsWith('apexgrid') ? 'Brand' : 'Product';
