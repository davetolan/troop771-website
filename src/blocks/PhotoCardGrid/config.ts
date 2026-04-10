import type { Block } from 'payload'

import { link } from '@/fields/link'

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
      name: 'columns',
      type: 'select',
      defaultValue: 'three',
      options: [
        { label: 'Two', value: 'two' },
        { label: 'Three', value: 'three' },
        { label: 'Four', value: 'four' },
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
