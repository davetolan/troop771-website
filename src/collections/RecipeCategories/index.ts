import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { slugField } from 'payload'

export const RecipeCategories: CollectionConfig<'recipe-categories'> = {
  slug: 'recipe-categories',
  labels: {
    singular: 'Recipe Category',
    plural: 'Recipe Categories',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Optional context for where this category is useful (e.g. campout style or gear).',
      },
    },
    slugField(),
  ],
}
