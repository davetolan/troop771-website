import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { canSaveDraft } from '@/access/canSaveDraft'
import {
  createScoutCollectionAfterChangeHook,
  createScoutCollectionBeforeDeleteHook,
} from '@/hooks/logScoutChanges'

const urlValidation = (value: unknown) => {
  if (!value || typeof value !== 'string') return true

  try {
    const url = new URL(value)
    return ['http:', 'https:'].includes(url.protocol) || 'Enter a valid http or https URL.'
  } catch {
    return 'Enter a valid URL.'
  }
}

export const GearItems: CollectionConfig<'gear-items'> = {
  slug: 'gear-items',
  labels: {
    singular: 'Gear Item',
    plural: 'Gear Items',
  },
  access: {
    create: canSaveDraft,
    delete: adminOnly,
    read: authenticatedOrPublished,
    update: canSaveDraft,
  },
  admin: {
    defaultColumns: ['title', 'category', 'updatedAt'],
    useAsTitle: 'title',
  },
  defaultPopulate: {
    title: true,
    category: true,
    summary: true,
    image: true,
    amazonUrl: true,
    reiUrl: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'general',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Clothing', value: 'clothing' },
        { label: 'Footwear', value: 'footwear' },
        { label: 'Sleeping Gear', value: 'sleeping-gear' },
        { label: 'Packs & Bags', value: 'packs-bags' },
        { label: 'Cooking & Food', value: 'cooking-food' },
        { label: 'Water', value: 'water' },
        { label: 'Health & First Aid', value: 'health-first-aid' },
        { label: 'Navigation & Safety', value: 'navigation-safety' },
        { label: 'Optional', value: 'optional' },
      ],
      required: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      maxLength: 320,
      admin: {
        description: 'Short item guidance shown on gear pages.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'amazonUrl',
          type: 'text',
          label: 'Amazon URL',
          validate: urlValidation,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'reiUrl',
          type: 'text',
          label: 'REI URL',
          validate: urlValidation,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'guidance',
      type: 'richText',
      admin: {
        description: 'Optional detailed guidance for this item.',
      },
    },
  ],
  hooks: {
    afterChange: [createScoutCollectionAfterChangeHook('gear-items')],
    beforeDelete: [createScoutCollectionBeforeDeleteHook('gear-items')],
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
