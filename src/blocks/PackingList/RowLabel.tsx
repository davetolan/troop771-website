'use client'
import { PackingListBlock } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

type Section = NonNullable<PackingListBlock['sections']>[number]
type Item = NonNullable<Section['items']>[number]

export const SectionRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<Section>()

  const label = data?.data?.title
    ? data.data.title
    : `Section ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}`

  return <div>{label}</div>
}

export const ItemRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<Item>()

  const label = data?.data?.item
    ? data.data.item
    : `Item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}`

  return <div>{label}</div>
}
