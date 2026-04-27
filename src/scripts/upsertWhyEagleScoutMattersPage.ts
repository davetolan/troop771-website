import 'dotenv/config'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

import { whyEagleScoutMattersPage } from '@/endpoints/seed/why-eagle-scout-matters-page'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const projectRoot = path.resolve(dirname, '../..')

async function upsertMedia(payload: Awaited<ReturnType<typeof getPayload>>, args: {
  alt: string
  fileName: string
}) {
  const { alt, fileName } = args

  const existing = await payload.find({
    collection: 'media',
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

  const filePath = path.join(projectRoot, 'public', fileName)
  const data = await fs.readFile(filePath)
  const extension = path.extname(fileName).toLowerCase()
  const mimetype =
    extension === '.png' ? 'image/png' : extension === '.webp' ? 'image/webp' : 'image/jpeg'

  return payload.create({
    collection: 'media',
    depth: 0,
    data: {
      alt,
    },
    file: {
      data,
      mimetype,
      name: fileName,
      size: data.byteLength,
    },
  })
}

async function upsertWhyEagleScoutMatters() {
  const payload = await getPayload({ config: configPromise })

  const [challengeImage, collegeImage, leadershipImage, parentRoiImage, serviceImage, trailImage] = await Promise.all([
    upsertMedia(payload, {
      fileName: 'high-adventure.JPG',
      alt: 'Scouts on a high-adventure outing',
    }),
    upsertMedia(payload, {
      fileName: 'philmont-climbing.jpg',
      alt: 'Scout climbing at Philmont high adventure',
    }),
    upsertMedia(payload, {
      fileName: 'leadership.JPG',
      alt: 'Scouts practicing leadership and teamwork',
    }),
    upsertMedia(payload, {
      fileName: 'leadership2.jpg',
      alt: 'Scouts learning leadership together outdoors',
    }),
    upsertMedia(payload, {
      fileName: 'service.JPG',
      alt: 'Scouts completing a service project',
    }),
    upsertMedia(payload, {
      fileName: 'hiking.JPG',
      alt: 'Scouts hiking together on a trail',
    }),
  ])

  const pageData = whyEagleScoutMattersPage({
    challengeImage,
    collegeImage,
    leadershipImage,
    parentRoiImage,
    serviceImage,
    trailImage,
  })

  const existing = await payload.find({
    collection: 'pages',
    depth: 0,
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: pageData.slug,
      },
    },
  })

  if (existing.docs[0]) {
    const updated = await payload.update({
      collection: 'pages',
      context: {
        disableRevalidate: true,
      },
      id: existing.docs[0].id,
      depth: 0,
      data: pageData,
    })

    payload.logger.info(`Updated page: ${updated.slug}`)
    await ensureHeaderNavLink(payload)
    return
  }

  const created = await payload.create({
    collection: 'pages',
    context: {
      disableRevalidate: true,
    },
    depth: 0,
    data: pageData,
  })

  payload.logger.info(`Created page: ${created.slug}`)
  await ensureHeaderNavLink(payload)
}

async function ensureHeaderNavLink(payload: Awaited<ReturnType<typeof getPayload>>) {
  const header = await payload.findGlobal({
    slug: 'header',
    depth: 0,
  })

  const navItems = Array.isArray(header.navItems) ? header.navItems : []
  const hasLink = navItems.some((item) => item?.link?.type === 'custom' && item.link.url === '/why-eagle-scout-matters')

  if (hasLink) {
    return
  }

  await payload.updateGlobal({
    slug: 'header',
    context: {
      disableRevalidate: true,
    },
    data: {
      navItems: [
        ...navItems,
        {
          link: {
            type: 'custom',
            label: 'Why Eagle Scout Matters',
            url: '/why-eagle-scout-matters',
          },
        },
      ],
    },
  })
}

void upsertWhyEagleScoutMatters()
