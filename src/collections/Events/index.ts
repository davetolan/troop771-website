import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { canSaveDraft } from '@/access/canSaveDraft'
import { link } from '@/fields/link'
import {
  createScoutCollectionAfterChangeHook,
  createScoutCollectionBeforeDeleteHook,
} from '@/hooks/logScoutChanges'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'

import { revalidateEvent, revalidateEventDelete } from './hooks/revalidateEvents'

export const eventTypeOptions = [
  { label: 'Meeting', value: 'meeting' },
  { label: 'Campout', value: 'campout' },
  { label: 'Activity', value: 'activity' },
  { label: 'Service', value: 'service' },
  { label: 'Other', value: 'other' },
] as const

export const Events: CollectionConfig<'events'> = {
  slug: 'events',
  labels: {
    singular: 'Event',
    plural: 'Events',
  },
  access: {
    create: canSaveDraft,
    delete: adminOnly,
    read: authenticatedOrPublished,
    update: canSaveDraft,
  },
  admin: {
    defaultColumns: ['title', 'start', 'type', 'location', 'showOnHomepage', 'updatedAt'],
    description:
      'Troop events shown in the "Upcoming Events" block. Check "Show on homepage" to feature an event on the home page.',
    useAsTitle: 'title',
  },
  defaultSort: 'start',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. "October Hiking Trip" or "Troop Meeting"',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'start',
          type: 'date',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
            description: 'When the event starts.',
            width: '50%',
          },
        },
        {
          name: 'end',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
            description: 'Optional. When the event ends.',
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'location',
      type: 'text',
      admin: {
        description: 'e.g. "Scout Barn" or "Camp Constantin"',
      },
    },
    {
      name: 'type',
      type: 'select',
      defaultValue: 'activity',
      options: [...eventTypeOptions],
      required: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      maxLength: 240,
      admin: {
        description: 'A short sentence or two describing the event.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional. Shown on event cards when provided.',
      },
    },
    {
      name: 'enableLink',
      type: 'checkbox',
      defaultValue: false,
      label: 'Add a link',
      admin: {
        description: 'Link to an internal page or an external URL, e.g. a sign-up form.',
      },
    },
    link({
      appearances: false,
      overrides: {
        admin: {
          condition: (_data, siblingData) => Boolean(siblingData?.enableLink),
          hideGutter: true,
        },
      },
    }),
    {
      name: 'showOnHomepage',
      type: 'checkbox',
      defaultValue: false,
      label: 'Show on homepage',
      admin: {
        description: 'Feature this event in the homepage "Upcoming Events" section.',
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [createScoutCollectionAfterChangeHook('events'), revalidateEvent],
    beforeChange: [populatePublishedAt],
    beforeDelete: [createScoutCollectionBeforeDeleteHook('events')],
    afterDelete: [revalidateEventDelete],
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
