import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { GearPage } from '@/payload-types'

export const revalidateGearPage: CollectionAfterChangeHook<GearPage> = ({
  doc,
  previousDoc,
  req: { context, payload },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/gear/${doc.slug}`

      payload.logger.info(`Revalidating gear page at path: ${path}`)

      revalidatePath(path)
      revalidatePath('/gear')
      revalidateTag('gear-pages-sitemap', 'max')
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/gear/${previousDoc.slug}`

      payload.logger.info(`Revalidating old gear page at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidatePath('/gear')
      revalidateTag('gear-pages-sitemap', 'max')
    }
  }

  return doc
}

export const revalidateGearPageDelete: CollectionAfterDeleteHook<GearPage> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidatePath(`/gear/${doc?.slug}`)
    revalidatePath('/gear')
    revalidateTag('gear-pages-sitemap', 'max')
  }

  return doc
}
