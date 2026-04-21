import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { getRequestUserRole } from '@/access/getRequestUserRole'

const canAccessScoutChangeReportsAdmin: CollectionConfig['access']['admin'] = async ({ req }) => {
  if (!req.user) {
    return false
  }

  const role = await getRequestUserRole(req)

  return role === 'admin'
}

export const ScoutChangeReports: CollectionConfig = {
  slug: 'scout-change-reports',
  labels: {
    plural: 'Scout Change Reports',
    singular: 'Scout Change Report',
  },
  access: {
    admin: canAccessScoutChangeReportsAdmin,
    create: adminOnly,
    delete: adminOnly,
    read: adminOnly,
    update: adminOnly,
  },
  admin: {
    defaultColumns: [
      'reviewStatus',
      'occurredAt',
      'actorName',
      'action',
      'targetType',
      'targetSlug',
      'targetLabel',
      'targetID',
    ],
    useAsTitle: 'targetSlug',
  },
  fields: [
    {
      name: 'reviewStatus',
      type: 'select',
      options: [
        {
          label: 'Pending review',
          value: 'pending',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
      defaultValue: 'pending',
      required: true,
    },
    {
      name: 'occurredAt',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'actor',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'actorName',
      type: 'text',
    },
    {
      name: 'actorEmail',
      type: 'email',
      required: true,
    },
    {
      name: 'actorRole',
      type: 'select',
      options: [
        {
          label: 'Scout',
          value: 'scout',
        },
      ],
      required: true,
    },
    {
      name: 'action',
      type: 'select',
      options: [
        {
          label: 'Create',
          value: 'create',
        },
        {
          label: 'Update',
          value: 'update',
        },
        {
          label: 'Delete',
          value: 'delete',
        },
      ],
      required: true,
    },
    {
      name: 'targetType',
      type: 'select',
      options: [
        {
          label: 'Collection',
          value: 'collection',
        },
        {
          label: 'Global',
          value: 'global',
        },
      ],
      required: true,
    },
    {
      name: 'targetSlug',
      type: 'text',
      required: true,
    },
    {
      name: 'targetID',
      type: 'text',
    },
    {
      name: 'targetLabel',
      type: 'text',
    },
    {
      name: 'changedFields',
      type: 'array',
      fields: [
        {
          name: 'field',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'reviewedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'reviewedBy',
      type: 'relationship',
      relationTo: 'users',
    },
  ],
}
