import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { createScoutGlobalAfterChangeHook } from '@/hooks/logScoutChanges'
import { revalidateEagleProjectFundraising } from '@/hooks/revalidateEagleProjectFundraising'

export const EagleProjectFundraising: GlobalConfig = {
  slug: 'eagle-project-fundraising',
  label: 'Eagle Project Fundraising',
  access: {
    read: () => true,
    update: authenticated,
  },
  admin: {
    group: 'Eagle Projects',
  },
  fields: [
    {
      type: 'group',
      name: 'kason',
      label: "Kason's Eagle Project",
      fields: [
        {
          name: 'raised',
          type: 'number',
          admin: {
            description: 'Dollar amount shown as raised on the public Eagle project page.',
          },
          defaultValue: 356,
          label: 'Amount raised',
          min: 0,
          required: true,
        },
        {
          name: 'lastUpdated',
          type: 'text',
          admin: {
            description: 'Optional public update text, for example "August 6, 2026".',
          },
          defaultValue: 'TBD',
          label: 'Last updated',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      createScoutGlobalAfterChangeHook('eagle-project-fundraising'),
      revalidateEagleProjectFundraising,
    ],
  },
}
