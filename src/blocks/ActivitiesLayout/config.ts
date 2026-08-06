import type { Block } from 'payload'

export const ActivitiesLayout: Block = {
  slug: 'activitiesLayout',
  interfaceName: 'ActivitiesLayoutBlock',
  admin: {
    images: {
      thumbnail: '/block-activities-layout.svg',
    },
  },
  fields: [
    {
      name: 'showInactive',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Include activities marked inactive in the public list.',
      },
    },
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
      name: 'emptyMessage',
      type: 'text',
      defaultValue: 'No activities are scheduled yet.',
    },
  ],
  labels: {
    singular: 'Activities Layout',
    plural: 'Activities Layouts',
  },
}
