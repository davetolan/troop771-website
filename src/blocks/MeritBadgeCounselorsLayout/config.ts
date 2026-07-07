import type { Block } from 'payload'

export const MeritBadgeCounselorsLayout: Block = {
  slug: 'meritBadgeCounselorsLayout',
  interfaceName: 'MeritBadgeCounselorsLayoutBlock',
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
      name: 'showInactive',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Include inactive counselors in this list.',
      },
    },
    {
      name: 'emptyMessage',
      type: 'text',
      defaultValue: 'No merit badge counselors are listed yet.',
    },
  ],
  labels: {
    singular: 'Merit Badge Counselors Layout',
    plural: 'Merit Badge Counselors Layouts',
  },
}
