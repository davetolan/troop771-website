import type { ActivitiesLayoutBlock as ActivitiesLayoutBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { monthLabels, monthOrder } from '@/collections/Activities'
import { SectionHeading } from '@/components/homepage/SectionHeading'

type ActivityListItem = {
  id: number
  activity: string
  month: string
  monthNumber: number
  year: number
}

const getActivityDate = (year: number, month: keyof typeof monthLabels) =>
  new Date(Date.UTC(year, monthOrder[month] - 1, 1))

export const ActivitiesLayoutBlock = async (
  props: ActivitiesLayoutBlockProps & {
    id?: string
  },
) => {
  const { id, eyebrow, title, description, startDate, endDate, emptyMessage } = props

  const payload = await getPayload({ config: configPromise })
  const rangeStart = new Date(startDate)
  const rangeEnd = new Date(endDate)

  const { docs } = await payload.find({
    collection: 'activities',
    depth: 0,
    limit: 200,
    sort: 'year',
  })

  const activities = docs
    .filter((doc) => {
      const activityDate = getActivityDate(doc.year, doc.month)
      return activityDate >= rangeStart && activityDate <= rangeEnd
    })
    .sort((left, right) => {
      if (left.year !== right.year) {
        return left.year - right.year
      }

      return monthOrder[left.month] - monthOrder[right.month]
    })
    .map(
      (doc): ActivityListItem => ({
        id: doc.id,
        activity: doc.activity,
        month: monthLabels[doc.month],
        monthNumber: monthOrder[doc.month],
        year: doc.year,
      }),
    )

  const groupedActivities = activities.reduce<Map<number, ActivityListItem[]>>((groups, activity) => {
    const currentGroup = groups.get(activity.year) ?? []
    currentGroup.push(activity)
    groups.set(activity.year, currentGroup)
    return groups
  }, new Map())

  return (
    <section className="bg-[linear-gradient(to_bottom,rgba(250,250,249,1),rgba(245,245,244,1))] py-20 sm:py-24" id={id ? `block-${id}` : undefined}>
      <div className="container">
        <SectionHeading
          eyebrow={eyebrow || 'Activities'}
          title={title}
          description={description || undefined}
        />

        {activities.length > 0 ? (
          <div className="mt-12 space-y-10">
            {Array.from(groupedActivities.entries()).map(([year, yearActivities]) => (
              <section key={year}>
                <div className="flex items-center gap-4">
                  <h3 className="text-2xl font-semibold tracking-tight text-stone-950">{year}</h3>
                  <div className="h-px flex-1 bg-stone-300" />
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {yearActivities.map((activity) => (
                    <article
                      className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-[0_18px_40px_-38px_rgba(41,37,36,0.35)]"
                      key={activity.id}
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#4f5d3a]">
                        {activity.month}
                      </p>
                      <h4 className="mt-3 text-xl font-semibold tracking-tight text-stone-950">
                        {activity.activity}
                      </h4>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-[1.75rem] border border-stone-200 bg-white p-8 text-sm leading-7 text-stone-700 shadow-[0_18px_40px_-38px_rgba(41,37,36,0.35)]">
            {emptyMessage || 'No activities are scheduled in this date range yet.'}
          </div>
        )}
      </div>
    </section>
  )
}
