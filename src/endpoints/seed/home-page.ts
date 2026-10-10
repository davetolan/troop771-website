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

const richText = (
  ...children: Array<ReturnType<typeof paragraph> | ReturnType<typeof heading>>
) => ({
  root: {
    children,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    type: 'root' as const,
    version: 1,
  },
})

export const registrationUrl =
  'https://my.scouting.org/online-registration/ff7b3db4-1e7a-4889-8bed-c1d376fef3d5/applicant-type'

type HomePageArgs = {
  heroBackgroundImage: Media
  heroCardTextureImage: Media
  hikingPanelImage: Media
  trailPanelImage: Media
  waterPanelImage: Media
  highAdventureImage: Media
  outdoorSkillsImage: Media
  leadershipImage: Media
  serviceImage: Media
  fishingImage: Media
  hikingActivityImage: Media
  climbingImage: Media
  raftingImage: Media
  cavingImage: Media
  canoeingImage: Media
  whyJoinPageId?: number
}

export const homePage = ({
  heroBackgroundImage,
  heroCardTextureImage,
  hikingPanelImage,
  trailPanelImage,
  waterPanelImage,
  highAdventureImage,
  outdoorSkillsImage,
  leadershipImage,
  serviceImage,
  fishingImage,
  hikingActivityImage,
  climbingImage,
  raftingImage,
  cavingImage,
  canoeingImage,
  whyJoinPageId,
}: HomePageArgs): RequiredDataFromCollectionSlug<'pages'> => ({
  slug: 'home',
  _status: 'published',
  title: 'Home',
  meta: {
    title: 'Troop 771 | Argyle, TX',
    description:
      'Scout Troop 771 in Argyle, Texas offers a boy-led program focused on high adventure, outdoor skills, leadership, and character development.',
    image: heroBackgroundImage,
  },
  hero: {
    type: 'home',
    media: heroBackgroundImage,
    secondaryMedia: heroCardTextureImage,
    richText: richText(
      heading('Adventure, Leadership, and Skills for Life.', 'h1'),
      paragraph(
        'Our boy-led troop emphasizes high adventure, hands-on learning, and real leadership experience. Scouts develop confidence, self-reliance, and practical outdoor skills through activities like camping, climbing, sailing, and more.',
      ),
    ),
    links: [
      {
        link: {
          type: 'custom',
          url: registrationUrl,
          label: 'Join the Troop',
          appearance: 'default',
          newTab: true,
        },
      },
      whyJoinPageId
        ? {
            link: {
              type: 'reference',
              reference: {
                relationTo: 'pages',
                value: whyJoinPageId,
              },
              label: 'Learn More',
              appearance: 'outline',
            },
          }
        : {
            link: {
              type: 'custom',
              url: '/why-join',
              label: 'Learn More',
              appearance: 'outline',
            },
          },
    ],
    highlights: [
      { icon: 'compass', label: 'Boy-led program' },
      { icon: 'mountain', label: 'High adventure focus' },
      { icon: 'tentTree', label: 'Outdoor skills for life' },
    ],
    photoPanel: {
      kicker: 'Life in the troop',
      tagline: 'Boy-led. Active. Prepared.',
      items: [
        {
          image: hikingPanelImage,
          caption: 'Troop in action',
          description:
            'Real outdoor experience is a visible part of the program, from climbing and campouts to water-based adventure.',
        },
        {
          image: trailPanelImage,
          caption: 'Trail tested',
          description: 'Scouts learn to navigate challenge, weather, and teamwork with purpose.',
        },
        {
          image: waterPanelImage,
          caption: 'Water confident',
          description: 'Adventures like sailing and rafting expand comfort zones in the right way.',
        },
      ],
      note:
        'High-adventure experiences are paired with practical preparation, leadership responsibility, and a strong culture of teamwork.',
    },
  },
  layout: [
    {
      blockType: 'photoCardGrid',
      blockName: 'What Scouts Experience',
      eyebrow: 'What Scouts Experience',
      title: 'A program built for adventure, growth, and practical confidence',
      description: 'See what makes Troop 771 active, purposeful, and worth joining.',
      columns: 'four',
      layout: 'grid',
      cards: [
        {
          media: highAdventureImage,
          title: 'High Adventure',
          description:
            'Sailing, climbing, rafting, and expeditions that challenge scouts and help them grow in confidence.',
          icon: 'mountain',
        },
        {
          media: outdoorSkillsImage,
          title: 'Outdoor Skills',
          description:
            'Camping, cooking, navigation, and first aid that build real-world readiness and self-reliance.',
          icon: 'tentTree',
        },
        {
          media: leadershipImage,
          title: 'Leadership Development',
          description:
            'A boy-led structure with meaningful responsibility, hands-on leadership roles, and room to grow.',
          icon: 'compass',
        },
        {
          media: serviceImage,
          title: 'Service & Character',
          description:
            'Community service and shared values that reinforce integrity, teamwork, and steady character.',
          icon: 'heartHandshake',
        },
      ],
    },
    {
      blockType: 'photoCardGrid',
      blockName: 'Featured Activities',
      eyebrow: 'Featured Activities',
      title: 'A troop experience that stays active and varied',
      description:
        'Scouts do more than sit through meetings. They learn by doing, outdoors and together.',
      layout: 'carousel',
      cards: [
        {
          media: fishingImage,
          title: 'Fishing',
          description: 'Patience, planning, and time outdoors on the water.',
          icon: 'fish',
        },
        {
          media: hikingActivityImage,
          title: 'Hiking',
          description: 'Trail miles that build endurance, teamwork, and confidence.',
          icon: 'trees',
        },
        {
          media: climbingImage,
          title: 'Climbing',
          description: 'Challenge, focus, and courage in a controlled environment.',
          icon: 'mountain',
        },
        {
          media: raftingImage,
          title: 'Rafting',
          description:
            'Fast-moving water, teamwork, and challenge that build confidence and resilience.',
          icon: 'waves',
        },
        {
          media: cavingImage,
          title: 'Caving',
          description: 'Underground exploration that rewards preparation, awareness, and teamwork.',
          icon: 'wavesLadder',
        },
        {
          media: canoeingImage,
          title: 'Canoeing',
          description: 'Paddling skills, coordination, and steady teamwork on the water.',
          icon: 'shipWheel',
        },
      ],
    },
    {
      blockType: 'upcomingEvents',
      blockName: 'Upcoming Events',
      heading: 'Upcoming',
      count: 4,
      onlyHomepageEvents: true,
      emptyMessage: 'Upcoming events will appear here as they are added in Payload.',
      enableLink: false,
    },
    {
      blockType: 'cta',
      blockName: 'Meeting Area',
      richText: richText(
        heading('Meeting area', 'h3'),
        paragraph(
          'We meet on most Tuesday nights during the school year in the Dunham Road area near the Cross Timbers Trailhead.',
        ),
        paragraph(
          'Contact us before your visit so we can confirm that we are meeting that week and share the latest date, time, and location details.',
        ),
      ),
      links: [
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
  ],
})
