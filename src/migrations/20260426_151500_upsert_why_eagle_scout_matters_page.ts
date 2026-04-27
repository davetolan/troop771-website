import { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import fs from 'fs/promises'
import path from 'path'

import { whyEagleScoutMattersPage } from '../endpoints/seed/why-eagle-scout-matters-page'

const PAGE_SLUG = 'why-eagle-scout-matters'
const PAGE_TITLE = 'Why Eagle Scout Matters'
const PAGE_URL = '/why-eagle-scout-matters'

const fileToMimeType = (fileName: string): string => {
  const ext = path.extname(fileName).toLowerCase()
  if (ext === '.png') return 'image/png'
  if (ext === '.webp') return 'image/webp'
  return 'image/jpeg'
}

const buildUniqueFilename = (fileName: string): string => {
  const ext = path.extname(fileName)
  const base = path.basename(fileName, ext)
  return `${base}-${Date.now()}${ext}`
}

const getFirstMedia = async ({ payload, req }: { payload: MigrateUpArgs['payload']; req: MigrateUpArgs['req'] }) => {
  const existingMedia = await payload.find({
    collection: 'media',
    req,
    depth: 0,
    limit: 1,
    pagination: false,
  })

  return existingMedia.docs[0] || null
}

const getOrCreateMediaByFilename = async (args: {
  alt: string
  fileName: string
  payload: MigrateUpArgs['payload']
  req: MigrateUpArgs['req']
}) => {
  const { alt, fileName, payload, req } = args

  const existing = await payload.find({
    collection: 'media',
    req,
    depth: 0,
    limit: 1,
    pagination: false,
    where: {
      filename: {
        equals: fileName,
      },
    },
  })

  if (existing.docs[0]) {
    return existing.docs[0]
  }

  const filePath = path.join(process.cwd(), 'public', fileName)
  let data: Buffer

  try {
    data = await fs.readFile(filePath)
  } catch {
    // If local files are not available in the deploy environment, reuse any existing media.
    const fallbackMedia = await getFirstMedia({ payload, req })
    if (fallbackMedia) {
      return fallbackMedia
    }

    // If we had neither local file nor existing media, keep current behavior.
    throw new Error(
      `Unable to create or find media "${fileName}". Add this file to /public or seed at least one media document before running migrations.`,
    )
  }

  try {
    return await payload.create({
      collection: 'media',
      req,
      depth: 0,
      context: {
        disableRevalidate: true,
      },
      data: {
        alt,
      },
      file: {
        data,
        mimetype: fileToMimeType(fileName),
        name: fileName,
        size: data.byteLength,
      },
    })
  } catch {
    // Blob storage may already contain this key from a previous upload. Retry with a unique name.
    const uniqueName = buildUniqueFilename(fileName)

    return await payload.create({
      collection: 'media',
      req,
      depth: 0,
      context: {
        disableRevalidate: true,
      },
      data: {
        alt,
      },
      file: {
        data,
        mimetype: fileToMimeType(fileName),
        name: uniqueName,
        size: data.byteLength,
      },
    })
  }
}

const ensureHeaderLink = async ({
  payload,
  req,
}: {
  payload: MigrateUpArgs['payload']
  req: MigrateUpArgs['req']
}) => {
  const header = await payload.findGlobal({
    slug: 'header',
    req,
    depth: 0,
  })

  const navItems = Array.isArray(header.navItems) ? header.navItems : []
  const hasLink = navItems.some((item) => item?.link?.type === 'custom' && item?.link?.url === PAGE_URL)

  if (hasLink) {
    return
  }

  await payload.updateGlobal({
    slug: 'header',
    req,
    context: {
      disableRevalidate: true,
    },
    data: {
      navItems: [
        ...navItems,
        {
          link: {
            type: 'custom',
            label: PAGE_TITLE,
            url: PAGE_URL,
          },
        },
      ],
    },
  })
}

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const [challengeImage, leadershipImage, serviceImage, trailImage] = await Promise.all([
    getOrCreateMediaByFilename({
      fileName: 'high-adventure.JPG',
      alt: 'Scouts on a high-adventure outing',
      payload,
      req,
    }),
    getOrCreateMediaByFilename({
      fileName: 'leadership.JPG',
      alt: 'Scouts practicing leadership and teamwork',
      payload,
      req,
    }),
    getOrCreateMediaByFilename({
      fileName: 'service.JPG',
      alt: 'Scouts completing a service project',
      payload,
      req,
    }),
    getOrCreateMediaByFilename({
      fileName: 'hiking.JPG',
      alt: 'Scouts hiking together on a trail',
      payload,
      req,
    }),
  ])

  const pageData = whyEagleScoutMattersPage({
    challengeImage,
    leadershipImage,
    serviceImage,
    trailImage,
  })

  const existingPage = await payload.find({
    collection: 'pages',
    req,
    depth: 0,
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: PAGE_SLUG,
      },
    },
  })

  if (existingPage.docs[0]) {
    await payload.update({
      collection: 'pages',
      id: existingPage.docs[0].id,
      req,
      depth: 0,
      context: {
        disableRevalidate: true,
      },
      data: pageData,
    })
  } else {
    await payload.create({
      collection: 'pages',
      req,
      depth: 0,
      context: {
        disableRevalidate: true,
      },
      data: pageData,
    })
  }

  await ensureHeaderLink({ payload, req })
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  const pages = await payload.find({
    collection: 'pages',
    req,
    depth: 0,
    limit: 10,
    pagination: false,
    where: {
      slug: {
        equals: PAGE_SLUG,
      },
    },
  })

  await Promise.all(
    pages.docs.map((page) =>
      payload.delete({
        collection: 'pages',
        id: page.id,
        req,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
  )

  const header = await payload.findGlobal({
    slug: 'header',
    req,
    depth: 0,
  })

  const navItems = Array.isArray(header.navItems) ? header.navItems : []
  const nextNavItems = navItems.filter(
    (item) => !(item?.link?.type === 'custom' && item?.link?.url === PAGE_URL),
  )

  if (nextNavItems.length !== navItems.length) {
    await payload.updateGlobal({
      slug: 'header',
      req,
      context: {
        disableRevalidate: true,
      },
      data: {
        navItems: nextNavItems,
      },
    })
  }
}
