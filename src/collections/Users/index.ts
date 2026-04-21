import type { CollectionBeforeChangeHook, CollectionConfig, FieldAccess } from 'payload'

import { authenticated } from '../../access/authenticated'
import { getRequestUserRole } from '@/access/getRequestUserRole'

const canManageRoles: FieldAccess = async ({ req }) => {
  if (!req.user) {
    return false
  }

  const role = await getRequestUserRole(req)

  return role === 'admin'
}

const assignAdminRoleToFirstUser: CollectionBeforeChangeHook = async ({
  data,
  operation,
  req,
}) => {
  if (operation !== 'create') {
    return data
  }

  const existingUsers = await req.payload.find({
    collection: 'users',
    depth: 0,
    limit: 1,
    req,
  })

  if (existingUsers.totalDocs === 0) {
    return {
      ...data,
      role: 'admin',
    }
  }

  return data
}

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
    beforeChange: [assignAdminRoleToFirstUser],
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
