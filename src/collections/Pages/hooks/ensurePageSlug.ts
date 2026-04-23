import type { CollectionBeforeValidateHook } from 'payload'

type PageData = {
  title?: string | null
  slug?: string | null
}

const slugify = (value: string): string => {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
}

export const ensurePageSlug: CollectionBeforeValidateHook = ({ data, originalDoc, req }) => {
  const input = (data ?? {}) as PageData
  const hasIncomingSlug = typeof input.slug === 'string' && input.slug.trim().length > 0

  if (hasIncomingSlug) {
    return data
  }

  if (typeof originalDoc?.slug === 'string' && originalDoc.slug.trim().length > 0) {
    return {
      ...data,
      slug: originalDoc.slug,
    }
  }

  const nextSlug = typeof input.title === 'string' ? slugify(input.title) : ''

  if (!nextSlug) {
    req.payload.logger.warn({
      event: 'pages.slug.missing',
      message: 'Could not derive slug from title during beforeValidate.',
      title: input.title ?? null,
      userID: req.user?.id,
      url: (req as { url?: string }).url ?? null,
    })

    return data
  }

  return {
    ...data,
    slug: nextSlug,
  }
}
