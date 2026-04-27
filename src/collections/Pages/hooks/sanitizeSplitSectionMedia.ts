import type { CollectionBeforeChangeHook } from 'payload'

type BlockWithMedia = {
  blockType?: string
  media?: number | string | { id?: number | string | null } | null
}

const getMediaID = (media: BlockWithMedia['media']): string | null => {
  if (typeof media === 'number' || typeof media === 'string') {
    return String(media)
  }

  if (media && typeof media === 'object' && media.id != null) {
    return String(media.id)
  }

  return null
}

export const sanitizeSplitSectionMedia: CollectionBeforeChangeHook = async ({ data, req }) => {
  const draft = (data ?? {}) as {
    layout?: BlockWithMedia[]
  }

  if (!Array.isArray(draft.layout) || draft.layout.length === 0) {
    return data
  }

  const splitSectionMediaIDs = draft.layout
    .filter((block) => block?.blockType === 'splitSection')
    .map((block) => getMediaID(block?.media))
    .filter((id): id is string => Boolean(id))

  if (splitSectionMediaIDs.length === 0) {
    return data
  }

  const { docs } = await req.payload.find({
    collection: 'media',
    depth: 0,
    limit: splitSectionMediaIDs.length,
    overrideAccess: false,
    pagination: false,
    req,
    where: {
      id: {
        in: splitSectionMediaIDs,
      },
    },
  })

  const existingIDs = new Set(docs.map((doc) => String(doc.id)))
  const removedIDs = new Set<string>()
  let changed = false

  const nextLayout = draft.layout.map((block) => {
    if (block?.blockType !== 'splitSection') {
      return block
    }

    const mediaID = getMediaID(block.media)

    if (!mediaID || existingIDs.has(mediaID)) {
      return block
    }

    changed = true
    removedIDs.add(mediaID)

    return {
      ...block,
      media: null,
    }
  })

  if (!changed) {
    return data
  }

  req.payload.logger.warn({
    event: 'pages.split-section.media.sanitized',
    removedMediaIDs: [...removedIDs],
    userID: req.user?.id ?? null,
    url: (req as { url?: string }).url ?? null,
  })

  return {
    ...draft,
    layout: nextLayout,
  }
}
