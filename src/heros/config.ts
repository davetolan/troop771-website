import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'
import { cardIconOptions } from '@/fields/scoutIcons'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'Home (two-column with highlights)',
          value: 'home',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'home', 'mediumImpact'].includes(type),
        description: 'Full-bleed background image.',
      },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'secondaryMedia',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => type === 'home',
        description: 'Optional. A faint texture image shown behind the headline card.',
      },
      relationTo: 'media',
    },
    {
      name: 'highlights',
      type: 'array',
      label: 'Highlight bullets',
      maxRows: 4,
      admin: {
        condition: (_, { type } = {}) => type === 'home',
        description: 'Short highlight pills shown under the intro text, e.g. "Boy-led program."',
        initCollapsed: true,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'icon',
              type: 'select',
              defaultValue: 'none',
              options: [...cardIconOptions],
              admin: {
                width: '50%',
              },
            },
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: {
                width: '50%',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'photoPanel',
      type: 'group',
      label: 'Photo panel',
      admin: {
        condition: (_, { type } = {}) => type === 'home',
        description: 'The "Life in the troop" photo panel shown beside the headline.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'kicker',
              type: 'text',
              defaultValue: 'Life in the troop',
              admin: {
                width: '50%',
              },
            },
            {
              name: 'tagline',
              type: 'text',
              defaultValue: 'Boy-led. Active. Prepared.',
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'items',
          type: 'array',
          maxRows: 3,
          admin: {
            description:
              'Up to 3 photos. The first is shown large across the top; the next two sit side by side below it.',
            initCollapsed: true,
          },
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'caption',
              type: 'text',
              required: true,
              admin: {
                description: 'Short bold caption, e.g. "Trail tested."',
              },
            },
            {
              name: 'description',
              type: 'textarea',
            },
          ],
        },
        {
          name: 'note',
          type: 'textarea',
          admin: {
            description: 'Optional highlighted note shown below the photos.',
          },
        },
      ],
    },
  ],
  label: false,
}
