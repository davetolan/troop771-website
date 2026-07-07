import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { MeritBadgeCounselor } from '../../../payload-types'

const revalidateCounselorPages = () => {
  revalidatePath('/', 'layout')
  revalidateTag('collection_merit_badge_counselors', 'max')
}

export const revalidateMeritBadgeCounselors: CollectionAfterChangeHook<MeritBadgeCounselor> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  const isPublished = doc._status === 'published'
  const wasPublished = previousDoc?._status === 'published'

  if (!context.disableRevalidate && (isPublished || wasPublished)) {
    payload.logger.info('Revalidating merit badge counselors')
    revalidateCounselorPages()
  }

  return doc
}

export const revalidateMeritBadgeCounselorDelete: CollectionAfterDeleteHook<
  MeritBadgeCounselor
> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidateCounselorPages()
  }

  return doc
}
