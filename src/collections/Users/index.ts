import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

const canManageRoles = ({ req: { user } }: { req: { user: { role?: string } | null } }) =>
  user?.role === 'admin'

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
