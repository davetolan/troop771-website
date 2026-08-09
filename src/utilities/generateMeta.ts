import type { Metadata } from 'next'

import type { Media, Page, Post, GearPage, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/high-adventure.JPG'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

type DocumentWithOptionalMeta = Partial<Page> | Partial<Post> | Partial<GearPage>

export const generateMeta = async (args: {
  doc: DocumentWithOptionalMeta | null
}): Promise<Metadata> => {
  const { doc } = args
  const meta =
    doc && 'meta' in doc
      ? (doc.meta as
          | {
              description?: string | null
              image?: Media | Config['db']['defaultIDType'] | null
              title?: string | null
            }
          | null
          | undefined)
      : undefined

  const ogImage = getImageURL(meta?.image)
  const baseTitle = meta?.title || doc?.title

  const title = baseTitle ? `Troop 771 - ${baseTitle}` : 'Troop 771'

  return {
    description: meta?.description,
    openGraph: mergeOpenGraph({
      description: meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
