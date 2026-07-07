import type { MeritBadgeCounselorsLayoutBlock as MeritBadgeCounselorsLayoutBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { SectionHeading } from '@/components/homepage/SectionHeading'

type CounselorListItem = {
  id: number
  name: string
  meritBadges: string[]
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
      depth: 0,
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

        {counselors.length > 0 ? (
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {counselors.map((counselor) => (
              <article
                className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-[0_18px_40px_-38px_rgba(41,37,36,0.35)]"
                key={counselor.id}
              >
                <h3 className="text-xl font-semibold tracking-tight text-stone-950">
                  {counselor.name}
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {counselor.meritBadges.map((badge) => (
                    <li
                      className="rounded-full border border-[#4f5d3a]/20 bg-[#4f5d3a]/10 px-3 py-1 text-sm font-medium text-[#344024]"
                      key={badge}
                    >
                      {badge}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-[1.75rem] border border-stone-200 bg-white p-8 text-sm leading-7 text-stone-700 shadow-[0_18px_40px_-38px_rgba(41,37,36,0.35)]">
            {emptyMessage || 'No merit badge counselors are listed yet.'}
          </div>
        )}
      </div>
    </section>
  )
}
