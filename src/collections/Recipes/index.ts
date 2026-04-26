import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { adminOnly } from '@/access/adminOnly'
import { canSaveDraft } from '@/access/canSaveDraft'
import { Banner } from '@/blocks/Banner/config'
import { Code } from '@/blocks/Code/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { slugField } from 'payload'

export const Recipes: CollectionConfig<'recipes'> = {
  slug: 'recipes',
  labels: {
    singular: 'Recipe',
    plural: 'Recipes',
  },
  access: {
    read: authenticatedOrPublished,
    create: canSaveDraft,
    update: canSaveDraft,
    delete: adminOnly,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    summary: true,
    featuredImage: true,
    categories: true,
    mealType: true,
    cookMethod: true,
    difficulty: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'mealType', 'cookMethod', 'difficulty', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      maxLength: 280,
      admin: {
        description: 'Short description shown in recipe cards and previews.',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'mealType',
          type: 'select',
          required: true,
          defaultValue: 'dinner',
          options: [
            { label: 'Breakfast', value: 'breakfast' },
            { label: 'Lunch', value: 'lunch' },
            { label: 'Dinner', value: 'dinner' },
            { label: 'Snack', value: 'snack' },
            { label: 'Dessert', value: 'dessert' },
          ],
        },
        {
          name: 'cookMethod',
          type: 'select',
          required: true,
          defaultValue: 'camp-stove',
          options: [
            { label: 'No Cook', value: 'no-cook' },
            { label: 'Dutch Oven', value: 'dutch-oven' },
            { label: 'Griddle', value: 'griddle' },
            { label: 'Camp Stove', value: 'camp-stove' },
            { label: 'Backpacking Stove', value: 'backpacking-stove' },
            { label: 'Campfire', value: 'campfire' },
          ],
        },
        {
          name: 'difficulty',
          type: 'select',
          required: true,
          defaultValue: 'easy',
          options: [
            { label: 'Easy', value: 'easy' },
            { label: 'Moderate', value: 'moderate' },
            { label: 'Advanced', value: 'advanced' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'prepMinutes',
          type: 'number',
          min: 0,
          defaultValue: 10,
          required: true,
          admin: {
            width: '33%',
          },
        },
        {
          name: 'cookMinutes',
          type: 'number',
          min: 0,
          defaultValue: 20,
          required: true,
          admin: {
            width: '33%',
          },
        },
        {
          name: 'servings',
          type: 'number',
          min: 1,
          defaultValue: 4,
          required: true,
          admin: {
            width: '33%',
          },
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'recipe-categories',
      hasMany: true,
      required: true,
      admin: {
        description:
          'Tag recipes with categories like No Cook Breakfast, Dutch Oven, Griddle, Backpacking.',
      },
    },
    {
      name: 'ingredients',
      type: 'array',
      minRows: 1,
      required: true,
      labels: {
        singular: 'Ingredient',
        plural: 'Ingredients',
      },
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
        {
          name: 'amount',
          type: 'text',
        },
        {
          name: 'optional',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'instructions',
      type: 'array',
      minRows: 1,
      required: true,
      labels: {
        singular: 'Step',
        plural: 'Steps',
      },
      fields: [
        {
          name: 'step',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'notes',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
          ]
        },
      }),
    },
    slugField(),
  ],
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
