import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
  },
  auth: true,
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation !== 'create') return data

        const userCount = await req.payload.count({
          collection: 'users',
          req,
        })

        if (userCount.totalDocs === 0) {
          return {
            ...data,
            role: 'admin',
          }
        }

        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'scout',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Scout',
          value: 'scout',
        },
      ],
      required: true,
      saveToJWT: true,
    },
  ],
  timestamps: true,
}
