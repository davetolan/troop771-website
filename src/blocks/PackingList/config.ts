import type { Block } from 'payload'

export const PackingList: Block = {
  slug: 'packingList',
  interfaceName: 'PackingListBlock',
  admin: {
    images: {
      thumbnail: '/block-packing-list.svg',
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
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'sections',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Section',
        plural: 'Sections',
      },
      admin: {
        description: 'Each section is one table, e.g. "Clothing" or "Sleeping Gear".',
        initCollapsed: true,
        components: {
          RowLabel: '@/blocks/PackingList/RowLabel#SectionRowLabel',
        },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'items',
          type: 'array',
          labels: {
            singular: 'Item',
            plural: 'Items',
          },
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '@/blocks/PackingList/RowLabel#ItemRowLabel',
            },
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'item',
                  type: 'text',
                  required: true,
                  admin: {
                    width: '75%',
                  },
                },
                {
                  name: 'qty',
                  type: 'text',
                  label: 'Qty',
                  admin: {
                    description: 'e.g. "1" or "3-6"',
                    width: '25%',
                  },
                },
              ],
            },
            {
              name: 'notes',
              type: 'textarea',
            },
          ],
        },
      ],
    },
  ],
  labels: {
    plural: 'Packing Lists',
    singular: 'Packing List',
  },
}
