import 'dotenv/config'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { whyEagleScoutMattersPage } from '@/endpoints/seed/why-eagle-scout-matters-page'

async function findMediaByFilename(payload: Awaited<ReturnType<typeof getPayload>>, fileName: string) {
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

  const media = existing.docs[0]

  if (!media) {
    throw new Error(
      `Required media not found: ${fileName}. Upload it in Media first, then rerun page:upsert:eagle.`,
    )
  }

  return media
}

async function upsertWhyEagleScoutMatters() {
  const payload = await getPayload({ config: configPromise })

  const [challengeImage, collegeImage, leadershipImage, parentRoiImage, serviceImage, trailImage] = await Promise.all([
    findMediaByFilename(payload, 'high-adventure.JPG'),
    findMediaByFilename(payload, 'philmont-climbing.jpg'),
    findMediaByFilename(payload, 'leadership.JPG'),
    findMediaByFilename(payload, 'leadership2.jpg'),
    findMediaByFilename(payload, 'service.JPG'),
    findMediaByFilename(payload, 'hiking.JPG'),
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
