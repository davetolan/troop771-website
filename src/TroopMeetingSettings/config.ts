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
  ],
  hooks: {
    afterChange: [
      createScoutGlobalAfterChangeHook('troop-meeting-settings'),
      revalidateNextTroopMeetingGlobal,
    ],
  },
}
