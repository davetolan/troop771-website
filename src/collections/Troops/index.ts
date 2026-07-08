import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { anyone } from '@/access/anyone'

export const Troops: CollectionConfig<'troops'> = {
  slug: 'troops',
  labels: {
    plural: 'Troops',
    singular: 'Troop',
  },
  access: {
    read: anyone,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  admin: {
    defaultColumns: ['name', 'updatedAt'],
    useAsTitle: 'name',
  },
  defaultSort: 'name',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
  ],
}
