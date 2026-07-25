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
    'For my Eagle Scout service project, I am creating an outdoor seating area at Liberty Christian School. The project will transform an unused grassy area near an existing tree into a shaded gathering space with a 24-foot mulch ring, landscape edging, benches, lighting, and other improvements.',
    'When complete, the space will benefit students, teachers, parents, staff, and school visitors by giving them a comfortable outdoor place to sit, gather, reflect, or wait during school activities.',
  ],
  heroImage: '/eagle/kason/project-proposed.webp',
  heroImageAlt:
    'Concept rendering of a shaded outdoor seating area with benches around a large tree.',
  beforeImage: '/eagle/kason/project-before-current.webp',
  beforeImageAlt: 'Current grassy project area near an existing tree at Liberty Christian School.',
  proposedImage: '/eagle/kason/project-proposed.webp',
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
    '24-foot-diameter landscaped mulch ring',
    'Durable outdoor benches',
    'Landscape edging blocks',
    'Outdoor LED lighting',
    'Ground preparation',
    'Mulch and landscaping',
    'Site cleanup',
    'Shaded seating and gathering space',
  ],
  impactStatement:
    'The finished area will provide Liberty Christian School with an attractive, shaded place where students, teachers, parents, and visitors can sit, gather, reflect, or wait during school activities. The project will also improve an underused area of the campus and create a lasting resource for the school community.',
  fundraising: {
    goal: 3500,
    raised: 0,
    lastUpdated: 'TBD',
    donationUrl: 'https://venmo.com/?txn=pay&recipients=Troop-771&note=Kason%27s%20Eagle%20Project',
    costs: [
      { item: 'Benches', displayValue: 'TBD' },
      { item: 'Landscape edging', displayValue: 'TBD' },
      { item: 'Mulch and soil preparation', displayValue: 'TBD' },
      { item: 'Lighting and electrical materials', displayValue: 'TBD' },
      { item: 'Hardware and construction supplies', displayValue: 'TBD' },
      { item: 'Contingency', displayValue: 'TBD' },
    ],
  },
  volunteer: {
    statusMessage:
      'Volunteer workday dates will be announced after project approval and scheduling are complete.',
    location: 'Liberty Christian School',
    signupUrl: '/contact',
    details: [
      'Workday date: TBD',
      'Start and end time: TBD',
      'Rain date: TBD',
      'Volunteers should bring work gloves and a refillable water bottle if available.',
      'Closed-toe shoes and weather-appropriate work clothes are recommended.',
      'Food and water details will be announced before the workday.',
    ],
  },
  updates: [
    {
      title: 'Project planning underway',
      description:
        'Kason is preparing the project plan, gathering cost information, and coordinating next steps.',
    },
    {
      title: 'Fundraising information coming soon',
      description:
        'Donation details will be shared after the fundraising process is finalized through troop-managed channels.',
    },
    {
      title: 'Volunteer workday date coming soon',
      description:
        'Workday dates will be announced after project approval and scheduling are complete.',
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
        'Any excess funds will be handled according to the approved project plan and troop guidance. Details will be shared once the fundraising process is finalized.',
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
