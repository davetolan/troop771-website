import type { GlobalConfig } from 'payload'

import { createScoutGlobalAfterChangeHook } from '@/hooks/logScoutChanges'
import { revalidateNextTroopMeetingGlobal } from '@/hooks/revalidateNextTroopMeeting'

export const TroopMeetingSettings: GlobalConfig = {
  slug: 'troop-meeting-settings',
  label: 'Troop Meeting Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'summerBreakActive',
      type: 'checkbox',
      admin: {
        description:
          'When checked, the public next meeting banner shows the summer break message instead of a meeting date.',
      },
      defaultValue: false,
      label: 'Done for the summer',
    },
    {
      name: 'summerBreakMessage',
      type: 'textarea',
      admin: {
        condition: (_data, siblingData) => Boolean(siblingData.summerBreakActive),
        description: 'Shown in the banner while "Done for the summer" is checked.',
      },
      defaultValue: 'Troop meetings are paused for the summer. Check back soon.',
      label: 'Summer break message',
    },
    {
      name: 'defaultLocation',
      type: 'text',
      admin: {
        description: 'Shown in the banner for regular Tuesday meetings.',
      },
      defaultValue: 'Scout Barn',
      label: 'Default meeting location',
    },
    {
      name: 'alternateLocationActive',
      type: 'checkbox',
      admin: {
        description:
          'When checked, the banner tells families to check Slack instead of publishing an alternate location.',
      },
      defaultValue: false,
      label: 'Meeting is at an alternate location',
    },
    {
      name: 'calendarUrl',
      type: 'text',
      admin: {
        description: 'Optional link shown as "View Calendar" in the banner.',
      },
      label: 'Public calendar URL',
    },
    {
      name: 'promo',
      type: 'group',
      admin: {
        description:
          'Optional announcement shown in its own strip above the next meeting banner (for example, a recruiting event).',
      },
      label: 'Promo announcement',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
          label: 'Show promo announcement',
        },
        {
          name: 'message',
          type: 'text',
          admin: {
            condition: (_data, siblingData) => Boolean(siblingData.enabled),
            description: 'Example: "Arrow of Light families: camp with us on November 7"',
          },
          label: 'Message',
        },
        {
          name: 'linkLabel',
          type: 'text',
          admin: {
            condition: (_data, siblingData) => Boolean(siblingData.enabled),
          },
          defaultValue: 'Sign up',
          label: 'Link label',
        },
        {
          name: 'linkUrl',
          type: 'text',
          admin: {
            condition: (_data, siblingData) => Boolean(siblingData.enabled),
            description: 'A page on this site (for example "/join") or a full https:// URL.',
          },
          label: 'Link URL',
        },
        {
          name: 'expiresAt',
          type: 'date',
          admin: {
            condition: (_data, siblingData) => Boolean(siblingData.enabled),
            date: {
              pickerAppearance: 'dayAndTime',
            },
            description: 'Optional. The promo hides automatically after this date and time.',
          },
          label: 'Hide after',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      createScoutGlobalAfterChangeHook('troop-meeting-settings'),
      revalidateNextTroopMeetingGlobal,
    ],
  },
}
