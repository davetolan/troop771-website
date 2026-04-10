import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'
import {
  revalidateUpcomingActivities,
  revalidateUpcomingActivityDelete,
} from './hooks/revalidateUpcomingActivities'

export const monthOptions = [
  { label: 'January', value: 'january' },
  { label: 'February', value: 'february' },
  { label: 'March', value: 'march' },
  { label: 'April', value: 'april' },
  { label: 'May', value: 'may' },
  { label: 'June', value: 'june' },
  { label: 'July', value: 'july' },
  { label: 'August', value: 'august' },
  { label: 'September', value: 'september' },
  { label: 'October', value: 'october' },
  { label: 'November', value: 'november' },
  { label: 'December', value: 'december' },
] as const

export const monthLabels = Object.fromEntries(
  monthOptions.map(({ label, value }) => [value, label]),
) as Record<(typeof monthOptions)[number]['value'], string>

export const monthOrder = Object.fromEntries(
  monthOptions.map(({ value }, index) => [value, index + 1]),
) as Record<(typeof monthOptions)[number]['value'], number>

export const Activities: CollectionConfig<'activities'> = {
  slug: 'activities',
  labels: {
    plural: 'Activities',
    singular: 'Activity',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    defaultColumns: ['month', 'year', 'activity', 'active', 'updatedAt'],
    useAsTitle: 'activity',
  },
  defaultSort: 'year',
  fields: [
    {
      name: 'month',
      type: 'select',
      options: [...monthOptions],
      required: true,
    },
    {
      name: 'year',
      type: 'number',
      min: 2025,
      max: 2100,
      required: true,
    },
    {
      name: 'activity',
      type: 'text',
      required: true,
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
  hooks: {
    afterChange: [revalidateUpcomingActivities],
    afterDelete: [revalidateUpcomingActivityDelete],
  },
}
