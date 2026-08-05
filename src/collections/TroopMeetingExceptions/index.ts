import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'
import {
  revalidateNextTroopMeeting,
  revalidateNextTroopMeetingDelete,
} from '@/hooks/revalidateNextTroopMeeting'

export const TroopMeetingExceptions: CollectionConfig = {
  slug: 'troop-meeting-exceptions',
  labels: {
    plural: 'Troop Meeting Exceptions',
    singular: 'Troop Meeting Exception',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: adminOnly,
  },
  admin: {
    defaultColumns: ['date', 'reason', 'updatedAt'],
    description:
      'Add a date here when the troop should not show a regular Tuesday meeting announcement.',
    useAsTitle: 'date',
  },
  defaultSort: 'date',
  fields: [
    {
      name: 'date',
      type: 'date',
      admin: {
        date: {
          displayFormat: 'EEEE, MMMM d, yyyy',
          pickerAppearance: 'dayOnly',
        },
      },
      index: true,
      required: true,
    },
    {
      name: 'reason',
      type: 'text',
      admin: {
        description: 'Optional internal note, for example "Spring break" or "Court of Honor".',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateNextTroopMeeting],
    afterDelete: [revalidateNextTroopMeetingDelete],
  },
}
