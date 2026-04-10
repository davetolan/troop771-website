import 'dotenv/config'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

import { whyJoinPage } from '@/endpoints/seed/why-join-page'

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
  const mimetype = extension === '.png' ? 'image/png' : extension === '.webp' ? 'image/webp' : 'image/jpeg'

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

async function upsertWhyJoinPage() {
  const payload = await getPayload({ config: configPromise })

  const [featureImage, leadershipImage, serviceImage, hikingImage] = await Promise.all([
    upsertMedia(payload, {
      fileName: 'high-adventure.JPG',
      alt: 'Scouts on a high-adventure outing',
    }),
    upsertMedia(payload, {
      fileName: 'leadership.JPG',
      alt: 'Scouts in a leadership activity',
    }),
    upsertMedia(payload, {
      fileName: 'service.JPG',
      alt: 'Scouts participating in a service project',
    }),
    upsertMedia(payload, {
      fileName: 'hiking.JPG',
      alt: 'Scouts hiking on the trail',
    }),
  ])

  const pageData = whyJoinPage({
    featureImage,
    leadershipImage,
    serviceImage,
    hikingImage,
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
}

void upsertWhyJoinPage()
