export type EagleProject = {
  slug: string
  scoutFirstName: string
  title: string
  subtitle: string
  beneficiary: string
  status: string
  summary: string[]
  heroImage: string
  heroImageAlt: string
  scoutImage?: string
  scoutImageAlt?: string
  beforeImage?: string
  beforeImageAlt?: string
  proposedImage?: string
  proposedImageAlt?: string
  socialImage: string
  qrCodeImage?: string
  gallery?: {
    src: string
    alt: string
    caption?: string
  }[]
  projectFeatures: string[]
  impactStatement: string
  fundraising: {
    goal: number
    raised: number
    lastUpdated?: string
    donationUrl?: string
    note?: string
    costs: {
      item: string
      estimatedCost?: number
      displayValue?: string
    }[]
  }
  volunteer: {
    statusMessage?: string
    date?: string
    startTime?: string
    endTime?: string
    location?: string
    rainDate?: string
    signupUrl?: string
    details?: string[]
  }
  updates: {
    date?: string
    title: string
    description: string
    image?: string
  }[]
  faqs: {
    question: string
    answer: string
  }[]
  contactUrl?: string
}

const kasonProject: EagleProject = {
  slug: 'kason',
  scoutFirstName: 'Kason',
  title: "Kason's Eagle Scout Service Project",
  subtitle: 'Creating a shaded outdoor gathering space for Liberty Christian School',
  beneficiary: 'Liberty Christian School',
  status: 'Planning and Fundraising',
  summary: [
    'My name is Kason Weisbeck. I am a Life Scout in Troop 771 and a freshman at Liberty Christian School. For my Eagle Scout service project, I will be creating a new outdoor space for Liberty Christian.',
    'I am installing a large tree and landscaping, including benches, that mirror the existing tree and landscaping at the front of the school. This project will replace a deteriorating wooden structure that is a potential safety hazard and is visually unappealing.',
    'The completed project will beautify the area and provide seating areas where students can socialize and wait for parents to pick them up.',
  ],
  heroImage: '/eagle/kason/proposed.jpeg',
  heroImageAlt:
    'Concept rendering of a shaded outdoor seating area with benches around a large tree.',
  scoutImage: '/eagle/kason/kason.jpeg',
  scoutImageAlt: 'Kason, the Life Scout leading this Eagle Scout service project.',
  beforeImage: '/eagle/kason/before.jpeg',
  beforeImageAlt: 'Current grassy project area near an existing tree at Liberty Christian School.',
  proposedImage: '/eagle/kason/proposed.jpeg',
  proposedImageAlt:
    'Proposed concept rendering showing benches, landscape edging, and mulch around a shade tree.',
  socialImage: '/eagle/kason/project-og.jpg',
  qrCodeImage: '/eagle/kason/qr-code.svg',
  gallery: [
    {
      src: '/eagle/kason/project-comparison.webp',
      alt: 'Before and proposed-after comparison for the outdoor seating project.',
      caption:
        'The proposed-after image is a concept rendering and is not to scale. The planned mulch ring will have a 24-foot diameter.',
    },
  ],
  projectFeatures: [
    'Large shade tree',
    'Durable outdoor benches',
    'Landscape edging blocks',
    'Electrical and irrigation work',
    'Ground preparation',
    'Mulch and landscaping',
    'Demo and site cleanup',
    'Shaded seating and gathering space',
  ],
  impactStatement:
    'The finished area will provide Liberty Christian School with an attractive, shaded place where students can socialize and wait for parents to pick them up. The project will also replace a deteriorating wooden structure with landscaping that matches the front of the school.',
  fundraising: {
    goal: 4000,
    raised: 0,
    lastUpdated: 'TBD',
    donationUrl: 'https://venmo.com/?txn=pay&recipients=Troop-771&note=Kason%27s%20Eagle%20Project',
    note:
      'The listed line items do not include every project cost. Any excess money raised will be given to Liberty Christian School.',
    costs: [
      { item: 'Benches', estimatedCost: 760 },
      { item: 'Edging', estimatedCost: 500 },
      { item: 'Electricity and irrigation', estimatedCost: 170 },
      { item: 'Mulch and soil', estimatedCost: 430 },
      { item: 'Tools and supplies', estimatedCost: 340 },
    ],
  },
  volunteer: {
    statusMessage:
      'Project work is planned in two phases: demo work in August and installation in November.',
    date: 'Demo: August 7, 2026; install: November 21 or 22, 2026',
    startTime: 'Demo: 8:00 AM',
    endTime: '12:00 PM',
    location: 'Liberty Christian School',
    signupUrl: '/contact',
    details: [
      'Demo: August 7, 2026 from 8:00 AM to 12:00 PM.',
      'Install: either November 21 or November 22, 2026.',
      'Install time and final schedule details will be announced closer to the workday.',
      'Volunteers should bring work gloves and a refillable water bottle if available.',
      'Closed-toe shoes and weather-appropriate work clothes are recommended.',
      'Food and water details will be announced before the workday.',
    ],
  },
  updates: [
    {
      title: 'Project workdays scheduled',
      description:
        'Demo is scheduled for August 7, 2026 from 8:00 AM to 12:00 PM. Installation is planned for either November 21 or November 22, 2026.',
    },
    {
      title: 'Fundraising goal updated',
      description:
        'The current fundraising goal is $4,000. Any excess money raised will be given to Liberty Christian School.',
    },
  ],
  faqs: [
    {
      question: 'Where will donations go?',
      answer:
        'Donations will support approved project materials and supplies such as benches, edging, mulch, lighting, hardware, and related construction needs.',
    },
    {
      question: 'Are donations tax-deductible?',
      answer:
        'Tax-deductible status has not been confirmed. Please do not assume donations are tax-deductible unless Troop 771 provides that confirmation through an official troop-managed channel.',
    },
    {
      question: 'Can a business donate materials?',
      answer:
        'Yes. Businesses may be able to help with approved materials, tools, or equipment. Please use the project contact link so the donation can be reviewed before anything is delivered or purchased.',
    },
    {
      question: 'Can younger Scouts volunteer?',
      answer:
        'Younger Scouts may be able to volunteer when the workday is scheduled, depending on the tasks, supervision, safety requirements, and final project plan.',
    },
    {
      question: 'What tools are needed?',
      answer:
        'The tool list is still being finalized. Any tool requests will be shared before the workday through troop-managed communication.',
    },
    {
      question: 'What happens if more money is raised than required?',
      answer:
        'Any excess money raised for the project will be given to Liberty Christian School.',
    },
    {
      question: 'Who should I contact with questions?',
      answer:
        'Use the troop-managed contact link on this page. Personal youth contact information is not published here.',
    },
    {
      question: 'When will the project be completed?',
      answer:
        'The completion date has not been set. Updates will be added after project approval, fundraising, and workday scheduling are complete.',
    },
  ],
  contactUrl: '/contact',
}

export const eagleProjects = [kasonProject] as const satisfies EagleProject[]

export const getAllEagleProjects = () => eagleProjects

export const getEagleProjectBySlug = (slug: string) =>
  eagleProjects.find((project) => project.slug === slug)
