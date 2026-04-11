import type { RequiredDataFromCollectionSlug } from 'payload'

import type { Media } from '@/payload-types'

const textNode = (text: string) => ({
  detail: 0,
  format: 0,
  mode: 'normal' as const,
  style: '',
  text,
  type: 'text' as const,
  version: 1,
})

const paragraph = (text: string) => ({
  children: [textNode(text)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  textFormat: 0,
  type: 'paragraph' as const,
  version: 1,
})

const heading = (text: string, tag: 'h1' | 'h2' | 'h3') => ({
  children: [textNode(text)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  tag,
  type: 'heading' as const,
  version: 1,
})

const richText = (...children: Array<ReturnType<typeof paragraph> | ReturnType<typeof heading>>) => ({
  root: {
    children,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    type: 'root' as const,
    version: 1,
  },
})

type WhyJoinPageArgs = {
  featureImage: number | Media
  leadershipImage: number | Media
  serviceImage: number | Media
  hikingImage: number | Media
}

export const whyJoinPage = ({
  featureImage,
  hikingImage,
  leadershipImage,
  serviceImage,
}: WhyJoinPageArgs): RequiredDataFromCollectionSlug<'pages'> => ({
  slug: 'why-join',
  _status: 'published',
  title: 'Why Join Troop 771',
  meta: {
    title: 'Why Join Troop 771',
    description:
      'Learn how Troop 771 helps scouts grow through leadership, outdoor adventure, practical skills, service, and real responsibility.',
    image: featureImage,
  },
  hero: {
    type: 'lowImpact',
    richText: richText(
      heading('More Than Camping — A Program That Builds Leaders', 'h1'),
      paragraph(
        'Troop 771 helps boys grow into capable leaders through outdoor adventure, practical skill-building, service, and real responsibility. From campouts and first aid to high-adventure trips and youth leadership, scouts gain experiences that build confidence and character over time.',
      ),
    ),
    links: [
      {
        link: {
          type: 'custom',
          url: 'https://my.scouting.org/online-registration/ff7b3db4-1e7a-4889-8bed-c1d376fef3d5/applicant-type',
          label: 'Join the Troop',
          appearance: 'default',
          newTab: true,
        },
      },
      {
        link: {
          type: 'custom',
          url: '/contact',
          label: 'Contact Us',
          appearance: 'outline',
        },
      },
    ],
  },
  layout: [
    {
      blockType: 'sectionIntro',
      blockName: 'core-pillars-intro',
      eyebrow: 'Core Pillars',
      title: 'Why families choose a program that stretches scouts in the right ways',
      description:
        'Troop 771 is built around the kinds of experiences that help boys grow over time: challenge, responsibility, service, and practical readiness.',
      alignment: 'center',
      theme: 'stone',
    },
    {
      blockType: 'featureGrid',
      blockName: 'core-pillars',
      eyebrow: 'What Scouts Experience',
      title: 'Four pillars that shape the troop experience',
      description:
        'Each part of the program reinforces growth, confidence, and character rather than just filling a calendar.',
      theme: 'light',
      features: [
        {
          title: 'High Adventure',
          description:
            'Sailing, climbing, rafting, caving, and challenging outdoor experiences that build confidence and resilience.',
        },
        {
          title: 'Outdoor Skills',
          description:
            'Camping, cooking, navigation, first aid, and practical readiness for real-world situations.',
        },
        {
          title: 'Leadership Development',
          description:
            'A boy-led structure where scouts learn by planning, leading, and taking responsibility.',
        },
        {
          title: 'Service & Character',
          description:
            'Service opportunities and shared values that reinforce integrity, teamwork, and responsibility.',
        },
      ],
    },
    {
      blockType: 'featureGrid',
      blockName: 'what-makes-us-different',
      eyebrow: 'What Makes Troop 771 Different',
      title: 'A troop culture built for steady growth',
      description:
        'Parents are often looking for more than activity. They want a program where challenge, leadership, and maturity are developed on purpose.',
      theme: 'dark',
      features: [
        {
          title: 'True Boy-Led Leadership',
          description:
            'Scouts actively plan, lead, and run meetings, campouts, and decisions.',
        },
        {
          title: 'Consistent High Adventure',
          description:
            'Major high-adventure trips every other year, plus regular outdoor challenges.',
        },
        {
          title: 'Broad Outdoor Experience',
          description:
            'Exposure to activities like sailing, caving, climbing, hiking, and fishing.',
        },
        {
          title: 'Practical Life Skills',
          description:
            'Emphasis on self-reliance, first aid, cooking, preparedness, and responsibility.',
        },
        {
          title: 'Proven Growth Environment',
          description:
            'A clear path for building confidence, maturity, and leadership over time.',
        },
      ],
    },
    {
      blockType: 'splitSection',
      blockName: 'what-a-scout-gains',
      eyebrow: 'What A Scout Gains',
      title: 'The outcomes parents hope to see',
      description:
        'This is about more than keeping boys busy. The goal is to help them become more capable, responsible, and confident as they grow.',
      body: richText(
        paragraph(
          'Scouts gain confidence and independence by taking on real responsibility, solving problems, communicating with others, and learning how to operate well as part of a team.',
        ),
        paragraph(
          'Parents often see growth in leadership experience, problem-solving ability, teamwork, communication, preparedness, and resilience as boys stay engaged in the program.',
        ),
      ),
      media: leadershipImage,
      mediaPosition: 'right',
      theme: 'light',
    },
    {
      blockType: 'featureGrid',
      blockName: 'outcomes',
      eyebrow: 'Parent-Focused Benefits',
      title: 'What families want their sons to carry with them',
      description:
        'These are the kinds of strengths that extend beyond scouting and into school, friendships, work, and adult life.',
      theme: 'light',
      features: [
        {
          title: 'Confidence and independence',
          description:
            'Scouts learn to handle challenges, speak up, and take initiative with growing confidence.',
        },
        {
          title: 'Leadership experience',
          description:
            'Leadership becomes something they practice, not just hear about.',
        },
        {
          title: 'Problem-solving ability',
          description:
            'They learn to think clearly, adapt, and work through real situations outdoors and with others.',
        },
        {
          title: 'Teamwork and communication',
          description:
            'Scouts grow by listening, collaborating, and contributing as part of a group.',
        },
        {
          title: 'Preparedness and resilience',
          description:
            'They build habits of readiness, persistence, and responsibility that matter in everyday life.',
        },
      ],
    },
    {
      blockType: 'photoCardGrid',
      blockName: 'participation-rhythm',
      eyebrow: 'What Participation Looks Like',
      title: 'A steady rhythm of meetings, outings, and growth',
      description:
        'Participation stays active and purposeful without sharing private schedules or sensitive logistics on the public site.',
      columns: 'three',
      cards: [
        {
          media: leadershipImage,
          title: 'Weekly Meetings',
          description: 'Weekly meetings in the Argyle area.',
          enableLink: false,
        },
        {
          media: featureImage,
          title: 'Regular Campouts',
          description: 'Regular campouts throughout the year.',
          enableLink: false,
        },
        {
          media: hikingImage,
          title: 'Summer Camp',
          description: 'Summer camp participation as a core part of the program.',
          enableLink: false,
        },
        {
          media: featureImage,
          title: 'High Adventure',
          description: 'High-adventure trips every other year.',
          enableLink: false,
        },
        {
          media: serviceImage,
          title: 'Service and Leadership',
          description: 'Ongoing opportunities for service and leadership development.',
          enableLink: false,
        },
      ],
    },
    {
      blockType: 'splitSection',
      blockName: 'for-parents',
      eyebrow: 'For Parents',
      title: 'A structured, active program with room for scouts to lead',
      description:
        'Parents want to know that a troop is well-led, worthwhile, and safe. Troop 771 is designed to give boys real responsibility while maintaining adult leadership and oversight.',
      body: richText(
        paragraph(
          'Adults are present to provide structure, supervision, and support. At the same time, scouts are encouraged to plan, lead, and grow instead of relying on adults to do everything for them.',
        ),
        paragraph(
          'Parents can be involved and informed, while private logistics and member communication are handled outside the public website.',
        ),
      ),
      media: serviceImage,
      mediaPosition: 'left',
      theme: 'stone',
    },
    {
      blockType: 'cta',
      blockName: 'final-cta',
      richText: richText(
        heading('Ready to See if Troop 771 Is a Good Fit?', 'h2'),
        paragraph(
          'Visit, learn more, and see firsthand how Troop 771 helps scouts grow through leadership, adventure, and service.',
        ),
      ),
      links: [
        {
          link: {
            type: 'custom',
            url: 'https://my.scouting.org/online-registration/ff7b3db4-1e7a-4889-8bed-c1d376fef3d5/applicant-type',
            label: 'Join the Troop',
            appearance: 'default',
            newTab: true,
          },
        },
        {
          link: {
            type: 'custom',
            url: '/contact',
            label: 'Learn More / Contact Us',
            appearance: 'outline',
          },
        },
      ],
    },
  ],
})
