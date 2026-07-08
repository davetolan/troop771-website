import type { MeritBadgeCounselorsLayoutBlock as MeritBadgeCounselorsLayoutBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { SectionHeading } from '@/components/homepage/SectionHeading'
import { MeritBadgeCounselorsList } from './Component.client'

type CounselorListItem = {
  id: number
  name: string
  troop: string
  meritBadges: string[]
}

const getTroopName = (troop: number | { name?: string | null } | null | undefined) => {
  if (troop && typeof troop === 'object' && troop.name) {
    return troop.name
  }

  return null
}

export const MeritBadgeCounselorsLayoutBlock = async (
  props: MeritBadgeCounselorsLayoutBlockProps & {
    id?: string
  },
) => {
  const { id, eyebrow, title, description, showInactive, emptyMessage } = props
  const resolvedTitle = title || 'Merit Badge Counselors'
  const payload = await getPayload({ config: configPromise })

  let counselors: CounselorListItem[] = []

  try {
    const { docs } = await payload.find({
      collection: 'merit-badge-counselors',
      depth: 1,
      limit: 300,
      overrideAccess: false,
      sort: 'name',
      where: showInactive
        ? undefined
        : {
            active: {
              equals: true,
            },
          },
    })

    counselors = docs.map((doc) => ({
      id: doc.id,
      name: doc.name,
      troop: getTroopName(doc.troop) || 'Both',
      meritBadges: doc.meritBadges.map(({ badge }) => badge),
    }))
  } catch (error) {
    payload.logger.error({
      err: error,
      msg: 'Failed to load counselors for MeritBadgeCounselorsLayoutBlock',
    })
  }

  return (
    <section
      className="bg-[linear-gradient(to_bottom,rgba(250,250,249,1),rgba(245,245,244,1))] py-20 sm:py-24"
      id={id ? `block-${id}` : undefined}
    >
      <div className="container">
        <SectionHeading
          eyebrow={eyebrow || 'Merit Badges'}
          title={resolvedTitle}
          description={description || undefined}
        />

        <MeritBadgeCounselorsList
          counselors={counselors}
          emptyMessage={emptyMessage || 'No merit badge counselors are listed yet.'}
        />
      </div>
    </section>
  )
}
