import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Activity } from '../../../payload-types'

export const revalidateUpcomingActivities: CollectionAfterChangeHook<Activity> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
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
