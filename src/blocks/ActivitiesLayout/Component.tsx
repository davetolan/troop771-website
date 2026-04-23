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

const getYearMonthIndex = (year: number, month: number) => year * 12 + (month - 1)

const getYearMonthFromDateString = (value: string) => {
  const [yearPart, monthPart] = value.split('T')[0]?.split('-') ?? []
  const year = Number(yearPart)
  const month = Number(monthPart)

  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
    return null
  }

  return { year, month }
}

export const ActivitiesLayoutBlock = async (
  props: ActivitiesLayoutBlockProps & {
    id?: string
  },
) => {
  const { id, eyebrow, title, description, startDate, endDate, emptyMessage } = props
  const resolvedTitle = title || 'Activities'
  const hasDateRange = Boolean(startDate && endDate)

  if (!hasDateRange) {
    return (
      <section
        className="bg-[linear-gradient(to_bottom,rgba(250,250,249,1),rgba(245,245,244,1))] py-20 sm:py-24"
        id={id ? `block-${id}` : undefined}
      >
        <div className="container">
          <SectionHeading
            eyebrow={eyebrow || 'Activities'}
            title={resolvedTitle}
            description={description || undefined}
          />

          <div className="mt-12 rounded-[1.75rem] border border-dashed border-stone-300 bg-white p-8 text-sm leading-7 text-stone-600 shadow-[0_18px_40px_-38px_rgba(41,37,36,0.35)]">
            Add a start date and end date to preview activities in this layout.
          </div>
        </div>
      </section>
    )
  }

  const payload = await getPayload({ config: configPromise })
  const parsedStart = getYearMonthFromDateString(startDate)
  const parsedEnd = getYearMonthFromDateString(endDate)
  const fallbackStartDate = new Date(startDate)
  const fallbackEndDate = new Date(endDate)

  const startMonthIndex = parsedStart
    ? getYearMonthIndex(parsedStart.year, parsedStart.month)
    : getYearMonthIndex(fallbackStartDate.getUTCFullYear(), fallbackStartDate.getUTCMonth() + 1)
  const endMonthIndex = parsedEnd
    ? getYearMonthIndex(parsedEnd.year, parsedEnd.month)
    : getYearMonthIndex(fallbackEndDate.getUTCFullYear(), fallbackEndDate.getUTCMonth() + 1)

  let activities: ActivityListItem[] = []

  try {
    const { docs } = await payload.find({
      collection: 'activities',
      depth: 0,
      limit: 200,
      overrideAccess: false,
      sort: 'year',
    })

    activities = docs
      .filter((doc) => {
        const activityMonthIndex = getYearMonthIndex(doc.year, monthOrder[doc.month])
        return activityMonthIndex >= startMonthIndex && activityMonthIndex <= endMonthIndex
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
  } catch (error) {
    payload.logger.error({
      err: error,
      msg: 'Failed to load activities for ActivitiesLayoutBlock',
      startDate,
      endDate,
    })
  }

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
          title={resolvedTitle}
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
