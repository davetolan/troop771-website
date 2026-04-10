import type { Block } from 'payload'

export const ActivitiesLayout: Block = {
  slug: 'activitiesLayout',
  interfaceName: 'ActivitiesLayoutBlock',
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
      name: 'startDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
        description: 'Inclusive start date for which planned activities should appear.',
      },
      required: true,
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
        description: 'Inclusive end date for which planned activities should appear.',
      },
      required: true,
    },
    {
      name: 'emptyMessage',
      type: 'text',
      defaultValue: 'No activities are scheduled in this date range yet.',
    },
  ],
  labels: {
    singular: 'Activities Layout',
    plural: 'Activities Layouts',
  },
}
