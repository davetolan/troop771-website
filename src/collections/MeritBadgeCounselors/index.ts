import type { CollectionConfig } from 'payload'

import { adminOnly } from '../../access/adminOnly'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { canSaveDraft } from '../../access/canSaveDraft'
import {
  createScoutCollectionAfterChangeHook,
  createScoutCollectionBeforeDeleteHook,
} from '@/hooks/logScoutChanges'
import {
  revalidateMeritBadgeCounselorDelete,
  revalidateMeritBadgeCounselors,
} from './hooks/revalidateMeritBadgeCounselors'

export const MeritBadgeCounselors: CollectionConfig<'merit-badge-counselors'> = {
  slug: 'merit-badge-counselors',
  labels: {
    plural: 'Merit Badge Counselors',
    singular: 'Merit Badge Counselor',
  },
  access: {
    read: authenticatedOrPublished,
    create: canSaveDraft,
    update: canSaveDraft,
    delete: adminOnly,
  },
  admin: {
    defaultColumns: ['name', 'troop', 'active', 'updatedAt'],
    useAsTitle: 'name',
  },
  defaultSort: 'name',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'troop',
      type: 'relationship',
      relationTo: 'troops',
      required: true,
      admin: {
        description: 'Choose 771B, 771G, or Both.',
      },
    },
    {
      name: 'meritBadges',
      type: 'array',
      minRows: 1,
      required: true,
      labels: {
        singular: 'Merit Badge',
        plural: 'Merit Badges',
      },
      fields: [
        {
          name: 'badge',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Inactive counselors remain in Payload but are hidden from public lists.',
      },
    },
  ],
  hooks: {
    afterChange: [
      createScoutCollectionAfterChangeHook('merit-badge-counselors'),
      revalidateMeritBadgeCounselors,
    ],
    beforeDelete: [createScoutCollectionBeforeDeleteHook('merit-badge-counselors')],
    afterDelete: [revalidateMeritBadgeCounselorDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
