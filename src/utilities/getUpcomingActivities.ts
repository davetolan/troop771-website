import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

const monthLabels = {
  january: 'January',
  february: 'February',
  march: 'March',
  april: 'April',
  may: 'May',
  june: 'June',
  july: 'July',
  august: 'August',
  september: 'September',
  october: 'October',
  november: 'November',
  december: 'December',
} as const

const monthOrder = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
} as const

type UpcomingActivityItem = {
  activity: string
  month: string
  year: number
}

async function getUpcomingActivities() {
  const payload = await getPayload({ config: configPromise })
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1

  const { docs } = await payload.find({
    collection: 'activities',
    depth: 0,
    limit: 100,
    overrideAccess: false,
    sort: 'year',
    where: {
      active: {
        equals: true,
      },
    },
  })

  return docs
    .filter((doc) => {
      if (doc.year > currentYear) {
        return true
      }

      if (doc.year < currentYear) {
        return false
      }

      return monthOrder[doc.month] >= currentMonth
    })
    .slice()
    .sort((left, right) => {
      if (left.year !== right.year) {
        return left.year - right.year
      }

      return monthOrder[left.month] - monthOrder[right.month]
    })
    .map(
      (doc): UpcomingActivityItem => ({
        activity: doc.activity,
        month: monthLabels[doc.month],
        year: doc.year,
      }),
    )
}

export const getCachedUpcomingActivities = unstable_cache(getUpcomingActivities, ['activities'], {
  tags: ['collection_activities'],
})
