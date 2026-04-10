import type { RequiredDataFromCollectionSlug } from 'payload'

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

export const whyJoinPage: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'why-join',
  _status: 'published',
  title: 'Why Join Troop 771',
  meta: {
    title: 'Why Join Troop 771',
    description:
      'Learn what makes Troop 771 in Argyle, Texas a strong fit for families seeking leadership, outdoor experience, and practical growth.',
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
    ],
  },
  layout: [
    {
      blockType: 'content',
      columns: [
        {
          size: 'full',
          richText: richText(
            heading('What sets the troop apart', 'h2'),
            paragraph(
              'Families often look for more than a calendar of activities. They want a troop that develops leadership, builds confidence, and gives scouts meaningful opportunities to grow over time.',
            ),
          ),
        },
        {
          size: 'half',
          richText: richText(
            heading('True Boy-Led Leadership', 'h3'),
            paragraph(
              'Scouts plan, lead, and run meetings, campouts, and decisions with guidance that helps them grow into capable leaders.',
            ),
          ),
        },
        {
          size: 'half',
          richText: richText(
            heading('Consistent High Adventure', 'h3'),
            paragraph(
              'Major high-adventure trips every other year are paired with regular outdoor challenges that keep the program active and engaging.',
            ),
          ),
        },
        {
          size: 'half',
          richText: richText(
            heading('Broad Outdoor Experience', 'h3'),
            paragraph(
              'Scouts gain exposure to diverse activities including sailing, caving, climbing, hiking, fishing, and rafting.',
            ),
          ),
        },
        {
          size: 'half',
          richText: richText(
            heading('Practical Life Skills', 'h3'),
            paragraph(
              'The program emphasizes self-reliance, first aid, cooking, preparedness, and confidence in real situations.',
            ),
          ),
        },
        {
          size: 'full',
          richText: richText(
            heading('A proven growth environment', 'h3'),
            paragraph(
              'Over time, scouts build responsibility, resilience, and leadership through meaningful experiences, clear expectations, and a strong culture of teamwork and service.',
            ),
          ),
        },
      ],
    },
  ],
}
