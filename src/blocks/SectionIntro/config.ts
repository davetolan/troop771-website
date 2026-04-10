import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

export const SectionIntro: Block = {
  slug: 'sectionIntro',
  interfaceName: 'SectionIntroBlock',
  admin: {
    images: {
      thumbnail: '/block-section-intro.svg',
    },
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'alignment',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
      ],
    },
    {
      name: 'theme',
      type: 'select',
      defaultValue: 'light',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Stone', value: 'stone' },
        { label: 'Dark', value: 'dark' },
      ],
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 2,
      },
    }),
  ],
  labels: {
    plural: 'Section Intros',
    singular: 'Section Intro',
  },
}
