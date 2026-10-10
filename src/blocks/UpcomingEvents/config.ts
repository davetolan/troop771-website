import type { Block } from 'payload'

import { link } from '@/fields/link'

export const UpcomingEvents: Block = {
  slug: 'upcomingEvents',
  interfaceName: 'UpcomingEventsBlock',
  admin: {
    images: {
      thumbnail: '/block-upcoming-events.svg',
    },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Upcoming',
      admin: {
        description:
          'Optional heading above the list. Pulls from the Events collection — the list always stays current, past events drop off automatically.',
      },
    },
    {
      name: 'intro',
      type: 'textarea',
      admin: {
        description: 'Optional. One short sentence under the heading.',
      },
    },
    {
      name: 'count',
      type: 'number',
      defaultValue: 4,
      min: 1,
      max: 12,
      admin: {
        description: 'How many upcoming events to show.',
      },
    },
    {
      name: 'onlyHomepageEvents',
      type: 'checkbox',
      defaultValue: true,
      label: 'Only show events marked "Show on homepage"',
      admin: {
        description:
          'When checked, only events with "Show on homepage" checked in the Events collection appear here.',
      },
    },
    {
      name: 'emptyMessage',
      type: 'text',
      defaultValue: 'Upcoming events will appear here as they are added in Payload.',
    },
    {
      name: 'enableLink',
      type: 'checkbox',
      defaultValue: false,
      label: 'Add a "See full calendar" link',
    },
    link({
      appearances: false,
      overrides: {
        admin: {
          condition: (_data, siblingData) => Boolean(siblingData?.enableLink),
          description: 'e.g. label "See full calendar" linking to your calendar page.',
          hideGutter: true,
        },
      },
    }),
  ],
  labels: {
    singular: 'Upcoming Events',
    plural: 'Upcoming Events',
  },
}
