import 'dotenv/config'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { aolCampoutForm } from '@/endpoints/seed/aol-campout-form'
import { aolPage } from '@/endpoints/seed/aol-page'

async function upsertAolCampoutForm(payload: Awaited<ReturnType<typeof getPayload>>) {
  const existing = await payload.find({
    collection: 'forms',
    depth: 0,
    limit: 1,
    pagination: false,
    where: {
      title: {
        equals: aolCampoutForm.title,
      },
    },
  })

  if (existing.docs[0]) {
    const updated = await payload.update({
      collection: 'forms',
      id: existing.docs[0].id,
      depth: 0,
      data: aolCampoutForm,
    })

    payload.logger.info(`Updated form: ${updated.title}`)
    return updated
  }

  const created = await payload.create({
    collection: 'forms',
    depth: 0,
    data: aolCampoutForm,
  })

  payload.logger.info(`Created form: ${created.title}`)
  return created
}

async function upsertAolCampoutPage() {
  const payload = await getPayload({ config: configPromise })

  const form = await upsertAolCampoutForm(payload)

  const pageData = aolPage({ aolCampoutForm: form })

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

void upsertAolCampoutPage()
