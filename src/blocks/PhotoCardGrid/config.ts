import type { Block } from 'payload'

import { link } from '@/fields/link'

import { cardIconOptions } from '@/fields/scoutIcons'

export const PhotoCardGrid: Block = {
  slug: 'photoCardGrid',
  interfaceName: 'PhotoCardGridBlock',
  admin: {
    images: {
      thumbnail: '/block-photo-card-grid.svg',
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
      name: 'backgroundMedia',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: 'three',
      options: [
        { label: 'Two', value: 'two' },
        { label: 'Three', value: 'three' },
        { label: 'Four', value: 'four' },
      ],
      admin: {
        condition: (_data, siblingData) => siblingData?.layout !== 'carousel',
      },
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      admin: {
        description: 'Carousel shows cards in a horizontally scrollable row with arrow buttons.',
      },
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Carousel', value: 'carousel' },
      ],
    },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
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
          name: 'icon',
          type: 'select',
          defaultValue: 'none',
          admin: {
            description: 'Optional icon badge shown on the card.',
          },
          options: [...cardIconOptions],
        },
        {
          name: 'enableLink',
          type: 'checkbox',
        },
        link({
          appearances: false,
          overrides: {
            admin: {
              condition: (_data, siblingData) => Boolean(siblingData?.enableLink),
            },
          },
        }),
      ],
    },
  ],
  labels: {
    plural: 'Photo Card Grids',
    singular: 'Photo Card Grid',
  },
}
