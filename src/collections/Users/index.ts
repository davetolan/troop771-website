import type { Access, CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

const isAdminUser = async (req: Parameters<Access>[0]['req']): Promise<boolean> => {
  if (!req.user) return false
  if (req.user.role === 'admin') return true

  const currentUser = await req.payload.findByID({
    collection: 'users',
    id: req.user.id,
    depth: 0,
    overrideAccess: true,
    req,
  })

  return (currentUser as { role?: string } | null)?.role === 'admin'
}

const canManageRoles = async ({
  req,
}: {
  req: Parameters<Access>[0]['req']
}) => {
  return isAdminUser(req)
}

const canAccessRoleField = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

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
      access: {
        create: canAccessRoleField,
        update: canManageRoles,
      },
    },
  ],
  timestamps: true,
}
