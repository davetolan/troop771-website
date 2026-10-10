import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Event } from '../../../payload-types'

export const revalidateEvent: CollectionAfterChangeHook<Event> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  const isPublished = doc._status === 'published'
  const wasPublished = previousDoc?._status === 'published'

  if (!context.disableRevalidate && (isPublished || wasPublished) && (doc.showOnHomepage || previousDoc?.showOnHomepage)) {
    payload.logger.info('Revalidating homepage events')

    revalidatePath('/')
    revalidateTag('collection_events', 'max')
  }

  return doc
}

export const revalidateEventDelete: CollectionAfterDeleteHook<Event> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate && doc?.showOnHomepage) {
    revalidatePath('/')
    revalidateTag('collection_events', 'max')
  }

  return doc
}
