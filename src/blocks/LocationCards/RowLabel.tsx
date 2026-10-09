'use client'
import { LocationCardsBlock } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const CardRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<LocationCardsBlock['cards']>[number]>()

  const label = data?.data?.name
    ? data.data.name
    : `Card ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}`

  return <div>{label}</div>
}
