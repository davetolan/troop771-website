import type { CollectionConfig } from 'payload'

import { slugField } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { canSaveDraft } from '@/access/canSaveDraft'
import {
  createScoutCollectionAfterChangeHook,
  createScoutCollectionBeforeDeleteHook,
} from '@/hooks/logScoutChanges'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { revalidateGearPage, revalidateGearPageDelete } from './hooks/revalidateGearPage'

export const GearPages: CollectionConfig<'gear-pages'> = {
  slug: 'gear-pages',
  labels: {
    singular: 'Gear Page',
    plural: 'Gear Pages',
  },
  access: {
    create: canSaveDraft,
    delete: adminOnly,
    read: authenticatedOrPublished,
    update: canSaveDraft,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    useAsTitle: 'title',
  },
  defaultPopulate: {
    title: true,
    slug: true,
    intro: true,
    heroImage: true,
    disclosure: {
      showDisclosure: true,
      disclosureText: true,
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'intro',
              type: 'textarea',
              maxLength: 420,
              admin: {
                description: 'Short introduction shown at the top of the gear page and on index cards.',
              },
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'sections',
              type: 'array',
              labels: {
                singular: 'Section',
                plural: 'Sections',
              },
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  maxLength: 260,
                },
                {
                  name: 'items',
                  type: 'array',
                  labels: {
                    singular: 'Gear Item',
                    plural: 'Gear Items',
                  },
                  admin: {
                    initCollapsed: true,
                  },
                  fields: [
                    {
                      name: 'item',
                      type: 'relationship',
                      relationTo: 'gear-items',
                      required: true,
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'quantity',
                          type: 'text',
                          admin: {
                            width: '33%',
                          },
                        },
                        {
                          name: 'status',
                          type: 'select',
                          defaultValue: 'required',
                          options: [
                            { label: 'Required', value: 'required' },
                            { label: 'Recommended', value: 'recommended' },
                            { label: 'Optional', value: 'optional' },
                          ],
                          required: true,
                          admin: {
                            width: '33%',
                          },
                        },
                        {
                          name: 'hideVendorLinks',
                          type: 'checkbox',
                          defaultValue: false,
                          admin: {
                            description: 'Hide purchase buttons for this item on this page.',
                            width: '33%',
                          },
                        },
                      ],
                    },
                    {
                      name: 'note',
                      type: 'textarea',
                      maxLength: 320,
                      admin: {
                        description: 'Page-specific note shown before the reusable item summary.',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'disclosure',
          label: 'Disclosure',
          fields: [
            {
              name: 'showDisclosure',
              type: 'checkbox',
              defaultValue: false,
              label: 'Show disclosure',
            },
            {
              name: 'disclosureText',
              type: 'textarea',
              defaultValue:
                'Some links may help support Troop 771 at no additional cost to you. Choose the option that works best for your Scout.',
              admin: {
                condition: (_, siblingData) => siblingData?.showDisclosure,
              },
              label: 'Disclosure text',
              maxLength: 260,
            },
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [createScoutCollectionAfterChangeHook('gear-pages'), revalidateGearPage],
    beforeChange: [populatePublishedAt],
    beforeDelete: [createScoutCollectionBeforeDeleteHook('gear-pages')],
    afterDelete: [revalidateGearPageDelete],
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
