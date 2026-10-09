import type { Block } from 'payload'

export const LocationCards: Block = {
  slug: 'locationCards',
  interfaceName: 'LocationCardsBlock',
  admin: {
    images: {
      thumbnail: '/block-location-cards.svg',
    },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      admin: {
        description: 'Optional heading above the grid, e.g. "Regular Weekend (1.5 to 3 hours)".',
      },
    },
    {
      name: 'intro',
      type: 'textarea',
      admin: {
        description: 'Optional. Keep it to one short sentence under the heading.',
      },
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: 'three',
      options: [
        { label: '2', value: 'two' },
        { label: '3', value: 'three' },
      ],
      admin: {
        description: 'Number of columns on desktop. Always 1 on mobile and 2 on tablet.',
      },
    },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      admin: {
        description: 'Each card is one camping location.',
        components: {
          RowLabel: '@/blocks/LocationCards/RowLabel#CardRowLabel',
        },
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g. "Camp Constantin"',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Optional. 16:10 works best. Falls back to a type icon if left blank.',
          },
        },
        {
          name: 'location',
          type: 'text',
          admin: {
            description: 'e.g. "Possum Kingdom Lake" or "Oklahoma City, OK"',
          },
        },
        {
          name: 'driveTime',
          type: 'text',
          admin: {
            description: 'e.g. "~1 hr 45 min"',
          },
        },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Troop property', value: 'troopProperty' },
            { label: 'Scout camp', value: 'scoutCamp' },
            { label: 'State park', value: 'statePark' },
            { label: 'City park', value: 'cityPark' },
            { label: 'Historic site', value: 'historicSite' },
            { label: 'Wildlife refuge', value: 'wildlifeRefuge' },
            { label: 'Whitewater park', value: 'whitewaterPark' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'bestFor',
          type: 'array',
          admin: {
            description: 'Short tags like "canoeing", "sailing", "kayaking".',
          },
          fields: [
            {
              name: 'tag',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'description',
          type: 'textarea',
          maxLength: 220,
          admin: {
            description: 'Keep it to 1-2 sentences.',
          },
        },
        {
          name: 'tip',
          type: 'text',
          admin: {
            description: 'Optional. A short practical tip for this spot.',
          },
        },
        {
          name: 'nearby',
          type: 'text',
          admin: {
            description: 'Optional. A nearby attraction, e.g. "Fossil Rim Wildlife Center"',
          },
        },
        {
          name: 'links',
          type: 'array',
          maxRows: 2,
          admin: {
            description: 'Up to 2 links, e.g. "Visit website". Opens in a new tab.',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'open',
          options: [
            { label: 'Open', value: 'open' },
            { label: 'Closed', value: 'closed' },
          ],
        },
        {
          name: 'statusNote',
          type: 'text',
          admin: {
            description: 'Shown when status is Closed, e.g. "Closed after the August Ross Fire"',
            condition: (_data, siblingData) => siblingData?.status === 'closed',
          },
        },
      ],
    },
  ],
  labels: {
    plural: 'Location Cards',
    singular: 'Location Cards',
  },
}
