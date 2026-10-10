import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

export const Promo: Block = {
  slug: 'promo',
  interfaceName: 'PromoBlock',
  admin: {
    images: {
      thumbnail: '/block-promo.svg',
    },
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      admin: {
        description:
          'Optional small label above the heading, e.g. "November Campout." Use show-from / show-until below to have this promo appear and disappear automatically.',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'text',
      type: 'textarea',
      admin: {
        description: 'A sentence or two describing the promotion.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'imageRight',
      label: 'Layout',
      options: [
        { label: 'Image left', value: 'imageLeft' },
        { label: 'Image right', value: 'imageRight' },
        { label: 'Full-width banner', value: 'fullWidthBanner' },
      ],
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 2,
        admin: {
          description: 'Up to 2 buttons, e.g. a primary "Sign Up" and secondary "Learn More."',
        },
      },
    }),
    {
      type: 'row',
      fields: [
        {
          name: 'showFrom',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
            },
            description: 'Optional. Hide this promo before this date.',
            width: '50%',
          },
        },
        {
          name: 'showUntil',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
            },
            description: 'Optional. Hide this promo after this date.',
            width: '50%',
          },
        },
      ],
    },
  ],
  labels: {
    plural: 'Promos',
    singular: 'Promo',
  },
}
