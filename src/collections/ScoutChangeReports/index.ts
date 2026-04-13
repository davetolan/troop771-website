import type { CollectionConfig } from 'payload'

const isAdmin = ({ req: { user } }: { req: { user: { role?: string } | null } }) =>
  user?.role === 'admin'

export const ScoutChangeReports: CollectionConfig = {
  slug: 'scout-change-reports',
  labels: {
    plural: 'Scout Change Reports',
    singular: 'Scout Change Report',
  },
  access: {
    admin: isAdmin,
    create: isAdmin,
    delete: isAdmin,
    read: isAdmin,
    update: isAdmin,
  },
  admin: {
    defaultColumns: ['occurredAt', 'actorName', 'action', 'targetType', 'targetSlug', 'targetID'],
    useAsTitle: 'targetSlug',
  },
  fields: [
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
  ],
}
