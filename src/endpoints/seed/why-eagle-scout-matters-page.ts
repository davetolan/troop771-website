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

type WhyEagleScoutMattersPageArgs = {
  challengeImage: number | Media
  leadershipImage: number | Media
  serviceImage: number | Media
  trailImage: number | Media
}

const meetingLink = '/#join'

export const whyEagleScoutMattersPage = ({
  challengeImage,
  leadershipImage,
  serviceImage,
  trailImage,
}: WhyEagleScoutMattersPageArgs): RequiredDataFromCollectionSlug<'pages'> => ({
  slug: 'why-eagle-scout-matters',
  _status: 'published',
  title: 'Why Eagle Scout Matters',
  meta: {
    title: 'Why Eagle Scout Matters | Leadership, College, and Life Skills',
    description:
      'Learn how the Eagle Scout journey helps boys build leadership, confidence, service, responsibility, and skills that can benefit them in college, careers, and life.',
    image: challengeImage,
  },
  hero: {
    type: 'none',
  },
  layout: [
    {
      blockType: 'sectionIntro',
      blockName: 'hero-eagle-scout-journey',
      eyebrow: 'The Eagle Scout Journey',
      title: 'Why Eagle Scout Matters',
      description:
        'Eagle Scout is more than a badge. It represents years of leadership, service, perseverance, and personal growth — qualities that can benefit a young man in school, college, career, and life.',
      alignment: 'left',
      theme: 'stone',
      links: [
        {
          link: {
            type: 'custom',
            label: 'Visit a Meeting',
            url: meetingLink,
            appearance: 'default',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Contact Us',
            url: '/contact',
            appearance: 'outline',
          },
        },
      ],
    },
    {
      blockType: 'splitSection',
      blockName: 'parent-roi',
      eyebrow: 'Parent ROI',
      title: 'Scouting Is an Investment in the Man He Is Becoming',
      description:
        'The Eagle Scout journey takes time, but families often see growth that carries into school, relationships, and responsibility at home.',
      body: richText(
        paragraph(
          'Scouting builds confidence, responsibility, resilience, leadership, communication, service, self-reliance, and practical outdoor skills through real experiences, not just lectures.',
        ),
        paragraph(
          'If you are weighing whether Eagle Scout is worth it, the value is usually found in who a young man becomes along the way: steady under pressure, useful to others, and ready to lead when it matters.',
        ),
      ),
      media: leadershipImage,
      mediaPosition: 'right',
      theme: 'light',
    },
    {
      blockType: 'featureGrid',
      blockName: 'benefits-of-eagle-scout',
      eyebrow: 'Benefits of Eagle Scout',
      title: 'Long-Term Benefits That Matter Beyond Camping',
      description:
        'Parents often ask about the practical value of Scouting. These are some of the biggest long-term benefits of Eagle Scout and Scouts BSA leadership skills.',
      theme: 'dark',
      media: challengeImage,
      features: [
        {
          title: 'Leadership That Is Practiced, Not Just Talked About',
          description:
            'Scouts lead patrols, plan activities, teach younger Scouts, and take responsibility for real outcomes.',
        },
        {
          title: 'Service That Builds Character',
          description:
            'The Eagle journey includes meaningful service and teaches boys to look beyond themselves.',
        },
        {
          title: 'Confidence Through Challenge',
          description:
            'Camping, hiking, cooking, climbing, sailing, and other outdoor experiences help Scouts learn they can do hard things.',
        },
        {
          title: 'A Track Record of Commitment',
          description:
            'Earning Eagle Scout shows perseverance over time, not just short-term participation.',
        },
        {
          title: 'Skills That Carry Into Adulthood',
          description:
            'Scouts learn planning, communication, first aid, teamwork, problem solving, and personal responsibility.',
        },
        {
          title: 'A Meaningful College and Resume Signal',
          description:
            'Eagle Scout is widely recognized as evidence of leadership, service, and long-term commitment, without guaranteeing admissions or scholarships.',
        },
      ],
    },
    {
      blockType: 'splitSection',
      blockName: 'college-and-scholarships',
      eyebrow: 'College and Scholarships',
      title: 'Does Eagle Scout Help With College?',
      description:
        'Many parents ask whether Eagle Scout helps with college applications. It can be a meaningful advantage when presented honestly.',
      body: richText(
        paragraph(
          'Eagle Scout can strengthen a college application by showing leadership, service, initiative, and follow-through over multiple years.',
        ),
        paragraph(
          'It also gives students meaningful experiences to write about in essays and discuss in interviews, including project leadership, teamwork, and problem solving.',
        ),
        paragraph(
          'Some Eagle Scout scholarships exist through Scouting-related organizations and other groups, but requirements and availability vary.',
        ),
        paragraph(
          'Eagle Scout does not guarantee admission, scholarships, or specific outcomes — but it can help tell a strong story about a young man’s character and commitment.',
        ),
      ),
      media: serviceImage,
      mediaPosition: 'left',
      theme: 'stone',
    },
    {
      blockType: 'splitSection',
      blockName: 'middle-school-not-too-late',
      eyebrow: 'Joining Scouts in Middle School',
      title: 'Missed Cub Scouts? It Is Not Too Late.',
      description:
        'Many families assume that if their son missed Cub Scouts, he also missed his chance at Eagle Scout. That is not true.',
      body: richText(
        paragraph(
          'Middle school can be an excellent time to join. Boys are old enough to take on responsibility, build friendships, learn outdoor skills, and begin developing real leadership.',
        ),
        paragraph('No Cub Scout background is required.'),
        paragraph('New Scouts can learn the basics after joining.'),
        paragraph('Older Scouts and adult leaders help younger or newer Scouts get started.'),
        paragraph(
          'Middle school is a strong time to begin building confidence and independence.',
        ),
        paragraph('Come visit a troop meeting and see if Troop 771 is a good fit.'),
      ),
      media: trailImage,
      mediaPosition: 'right',
      theme: 'light',
      links: [
        {
          link: {
            type: 'custom',
            label: 'Visit a Meeting',
            url: meetingLink,
            appearance: 'default',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Contact Us',
            url: '/contact',
            appearance: 'outline',
          },
        },
      ],
    },
    {
      blockType: 'featureGrid',
      blockName: 'troop-771-proof',
      eyebrow: 'Troop 771 Argyle TX',
      title: 'A Troop With a Strong Eagle Tradition',
      description:
        'Troop 771 has a long history of helping Scouts grow into capable, confident young men. Since 2004, more than 50 Scouts from Troop 771 have earned the rank of Eagle Scout.',
      theme: 'light',
      media: leadershipImage,
      features: [
        {
          title: 'More Than 50 Eagle Scouts Since 2004',
          description:
            'Troop 771 has helped many Scouts complete the Eagle Scout journey through steady mentorship and real responsibility.',
        },
        {
          title: 'A Boy-Led Troop Culture',
          description:
            'Scouts plan and lead many of the troop’s activities while adults provide structure, coaching, and safety.',
        },
        {
          title: 'Leadership Through Real Responsibility',
          description:
            'Scouts mentor younger boys, lead service projects, coordinate outings, and develop follow-through over time.',
        },
        {
          title: 'Growth Beyond the Campsite',
          description:
            'The troop emphasizes high adventure, outdoor skills, leadership, and character development that carry into adult life.',
        },
      ],
    },
    {
      blockType: 'photoCardGrid',
      blockName: 'eagle-project-examples',
      eyebrow: 'Eagle Project Examples',
      title: 'Project Types That Build Leadership',
      description:
        'Eagle projects vary, but each one requires planning, communication, leadership, and follow-through from start to finish.',
      columns: 'four',
      backgroundMedia: serviceImage,
      cards: [
        {
          media: serviceImage,
          title: 'Community Improvement Projects',
          description:
            'Projects that improve shared spaces and require organizing volunteers, materials, and timelines.',
          enableLink: false,
        },
        {
          media: challengeImage,
          title: 'Church or Nonprofit Support Projects',
          description:
            'Projects built around real service needs where Scouts coordinate stakeholders and complete measurable work.',
          enableLink: false,
        },
        {
          media: trailImage,
          title: 'Park, Trail, or Outdoor Restoration',
          description:
            'Outdoor projects that require planning, safety awareness, teamwork, and execution in changing conditions.',
          enableLink: false,
        },
        {
          media: leadershipImage,
          title: 'School or Civic Service Projects',
          description:
            'Projects that improve school or civic environments while demonstrating initiative, communication, and accountability.',
          enableLink: false,
        },
      ],
    },
    {
      blockType: 'featureGrid',
      blockName: 'eagle-scout-faq',
      eyebrow: 'FAQ',
      title: 'Common Parent Questions About Eagle Scout',
      description:
        'Quick answers for families evaluating whether Eagle Scout is worth it and whether joining later still makes sense.',
      theme: 'light',
      media: challengeImage,
      features: [
        {
          title: 'Does my son have to start in Cub Scouts to become an Eagle Scout?',
          description:
            'No. Many boys join Scouts BSA without prior Cub Scout experience.',
        },
        {
          title: 'Is middle school too late to join?',
          description:
            'No. Middle school is often a great time to start because boys are ready for more independence, responsibility, and leadership.',
        },
        {
          title: 'Does Eagle Scout guarantee college admission?',
          description:
            'No. Eagle Scout does not guarantee admission, but it can strengthen a student’s story by showing leadership, service, and long-term commitment.',
        },
        {
          title: 'Are there scholarships for Eagle Scouts?',
          description:
            'Some scholarships are available through Scouting-related organizations and other groups, but availability and requirements vary.',
        },
        {
          title: 'What makes Troop 771 different?',
          description:
            'Troop 771 is boy-led and emphasizes high adventure, leadership, outdoor skills, service, and character development.',
        },
      ],
    },
    {
      blockType: 'cta',
      blockName: 'final-cta',
      richText: richText(
        heading('Help Him Build Skills That Last', 'h2'),
        paragraph(
          'Whether your son is already interested in Scouting or has never been part of a troop before, Troop 771 is a place where he can grow in confidence, leadership, service, and self-reliance.',
        ),
      ),
      links: [
        {
          link: {
            type: 'custom',
            label: 'Visit a Meeting',
            url: meetingLink,
            appearance: 'default',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Ask a Question',
            url: '/contact',
            appearance: 'outline',
          },
        },
      ],
    },
  ],
})
