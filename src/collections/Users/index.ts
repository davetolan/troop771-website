import type { Access, CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

const canManageRoles = ({ req: { user } }: { req: { user: { role?: string } | null } }) =>
  user?.role === 'admin'

const canCreateUser: Access = async ({ req }) => {
  if (req.user?.role === 'admin') return true

  const userCount = await req.payload.count({
    collection: 'users',
    req,
  })

  return userCount.totalDocs === 0
}

const adminOrSelf: Access = ({ req, id }) => {
  if (!req.user) return false
  if (req.user.role === 'admin') return true

  return {
    id: {
      equals: id ?? req.user.id,
    },
  }
}

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: canCreateUser,
    delete: canManageRoles,
    read: adminOrSelf,
    update: adminOrSelf,
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
      access: {
        create: canManageRoles,
        update: canManageRoles,
      },
    },
  ],
  timestamps: true,
}
