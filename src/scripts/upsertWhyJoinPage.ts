import 'dotenv/config'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { whyJoinPage } from '@/endpoints/seed/why-join-page'

async function upsertWhyJoinPage() {
  const payload = await getPayload({ config: configPromise })

  const existing = await payload.find({
    collection: 'pages',
    depth: 0,
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: whyJoinPage.slug,
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
      data: whyJoinPage,
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
    data: whyJoinPage,
  })

  payload.logger.info(`Created page: ${created.slug}`)
}

void upsertWhyJoinPage()
