import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

import { monthLabels, monthOrder } from '@/collections/Activities'

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
