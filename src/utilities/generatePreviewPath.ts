import { PayloadRequest, CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '/posts',
  pages: '',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string | null | undefined
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug }: Props) => {
  const normalizedSlug = (slug ?? '').trim()

  const params = new URLSearchParams({
    slug: normalizedSlug,
    collection,
    path: `${collectionPrefixMap[collection]}/${normalizedSlug}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  return `/next/preview?${params.toString()}`
}
