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
      'Learn what makes Troop 771 in Argyle, Texas a strong fit for families seeking leadership, outdoor experience, and practical growth.',
    image: featureImage,
  },
  hero: {
    type: 'lowImpact',
    richText: richText(
      heading('Why Join Troop 771', 'h1'),
      paragraph(
        'Troop 771 helps scouts grow through real responsibility, outdoor challenge, and consistent leadership opportunities in a boy-led program.',
      ),
    ),
    links: [
      {
        link: {
          type: 'custom',
          url: '/',
          label: 'Back to Home',
          appearance: 'outline',
        },
      },
      {
        link: {
          type: 'custom',
          url: '#reasons',
          label: 'See the Reasons',
          appearance: 'default',
        },
      },
    ],
  },
  layout: [
    {
      blockType: 'sectionIntro',
      eyebrow: 'What Families Notice',
      title: 'A troop built around growth, challenge, and real responsibility',
      description:
        'The best troop experiences come from repeated opportunities to lead, serve, and take on meaningful outdoor challenge. Troop 771 is designed around that idea.',
      alignment: 'center',
      theme: 'stone',
      links: [
        {
          link: {
            type: 'custom',
            url: '/',
            label: 'Explore the Homepage',
            appearance: 'outline',
          },
        },
      ],
    },
    {
      blockType: 'splitSection',
      eyebrow: 'Boy-Led by Design',
      title: 'Leadership is practiced, not just talked about',
      description:
        'Scouts are expected to participate, plan, and lead. Adults provide support and safety, but the program is structured to help boys grow into capable leaders.',
      body: richText(
        paragraph(
          'That means scouts help shape meetings, campouts, and decisions instead of simply following a schedule made for them.',
        ),
        paragraph(
          'Over time, they gain confidence by handling real responsibility in an environment that values teamwork, preparation, and follow-through.',
        ),
      ),
      media: leadershipImage,
      mediaPosition: 'right',
      theme: 'light',
      links: [
        {
          link: {
            type: 'custom',
            url: '#reasons',
            label: 'See More Reasons',
            appearance: 'default',
          },
        },
      ],
    },
    {
      blockType: 'featureGrid',
      blockName: 'why-join-reasons',
      eyebrow: 'Why It Matters',
      title: 'Five reasons families choose Troop 771',
      description:
        'This block recreates the strongest part of the old homepage section, but now as a reusable Payload layout.',
      theme: 'dark',
      features: [
        {
          title: 'True Boy-Led Leadership',
          description:
            'Scouts plan, lead, and run meetings, campouts, and decisions with guidance that helps them grow into capable leaders.',
        },
        {
          title: 'Consistent High Adventure',
          description:
            'Major high-adventure trips every other year are paired with regular outdoor challenges that keep the program active and engaging.',
        },
        {
          title: 'Broad Outdoor Experience',
          description:
            'Scouts gain exposure to diverse activities including sailing, caving, climbing, hiking, fishing, and rafting.',
        },
        {
          title: 'Practical Life Skills',
          description:
            'The program emphasizes self-reliance, first aid, cooking, preparedness, and confidence in real situations.',
        },
        {
          title: 'A Proven Growth Environment',
          description:
            'Over time, scouts build responsibility, resilience, and leadership through meaningful experiences and clear expectations.',
        },
      ],
    },
    {
      blockType: 'splitSection',
      eyebrow: 'Adventure With Purpose',
      title: 'Outdoor challenge is a tool for growth',
      description:
        'Troop 771 uses the outdoors to build maturity, confidence, and practical readiness rather than treating activities as isolated events.',
      body: richText(
        paragraph(
          'Camping, hiking, climbing, rafting, and service projects all contribute to a program that helps scouts become more self-reliant.',
        ),
        paragraph(
          'The result is a troop experience that feels active and memorable while still reinforcing the values parents care about most.',
        ),
      ),
      media: featureImage,
      mediaPosition: 'left',
      theme: 'dark',
      links: [
        {
          link: {
            type: 'custom',
            url: '/#join',
            label: 'Ready to Visit?',
            appearance: 'default',
          },
        },
      ],
    },
    {
      blockType: 'photoCardGrid',
      eyebrow: 'Program Snapshot',
      title: 'Moments that reflect the troop experience',
      description:
        'This gallery-style block gives editors a polished way to combine photos, short descriptions, and optional links on other marketing pages too.',
      columns: 'three',
      cards: [
        {
          media: leadershipImage,
          title: 'Leadership in Action',
          description:
            'Scouts build confidence by leading, planning, and learning to carry real responsibility over time.',
          enableLink: false,
        },
        {
          media: hikingImage,
          title: 'Outdoor Readiness',
          description:
            'Hiking, navigation, camp skills, and preparedness help scouts become capable in real-world situations.',
          enableLink: false,
        },
        {
          media: serviceImage,
          title: 'Service and Character',
          description:
            'Service projects and shared values reinforce integrity, teamwork, and the habit of contributing to the community.',
          enableLink: false,
        },
      ],
    },
    {
      blockType: 'sectionIntro',
      eyebrow: 'Take the Next Step',
      title: 'Visit, ask questions, and see if Troop 771 is the right fit',
      description:
        'Families usually get the clearest picture by seeing the troop in person. If the program sounds like a good fit, the next step is simple.',
      alignment: 'center',
      theme: 'dark',
      links: [
        {
          link: {
            type: 'custom',
            url: '/#join',
            label: 'How to Join',
            appearance: 'default',
          },
        },
      ],
    },
  ],
})
