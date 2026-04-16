import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Activity } from '../../../payload-types'

export const revalidateUpcomingActivities: CollectionAfterChangeHook<Activity> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  const isPublished = doc._status === 'published'
  const wasPublished = previousDoc?._status === 'published'

  if (!context.disableRevalidate && (isPublished || wasPublished)) {
    payload.logger.info('Revalidating homepage activities')

    revalidatePath('/')
    revalidateTag('collection_activities', 'max')
  }

  return doc
}

export const revalidateUpcomingActivityDelete: CollectionAfterDeleteHook<Activity> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidatePath('/')
    revalidateTag('collection_activities', 'max')
  }

  return doc
}
