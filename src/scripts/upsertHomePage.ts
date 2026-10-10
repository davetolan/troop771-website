import 'dotenv/config'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

import { homePage } from '@/endpoints/seed/home-page'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const projectRoot = path.resolve(dirname, '../..')

async function upsertMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  args: {
    alt: string
    fileName: string
  },
) {
  const { alt, fileName } = args
  const { name: baseName } = path.parse(fileName)

  // Vercel Blob storage may suffix the stored filename to keep it unique
  // (e.g. "service.JPG" -> "service-1777255983408.JPG"), so match loosely
  // on the base name rather than requiring an exact filename match.
  const existing = await payload.find({
    collection: 'media',
    depth: 0,
    limit: 50,
    pagination: false,
    where: {
      filename: {
        like: baseName,
      },
    },
  })

  const existingMatch = existing.docs.find((doc) => {
    if (!doc.filename) return false
    const docBaseName = path.parse(doc.filename).name
    return docBaseName === baseName || docBaseName.startsWith(`${baseName}-`)
  })

  if (existingMatch) {
    return existingMatch
  }

  const filePath = path.join(projectRoot, 'public', fileName)
  const data = await fs.readFile(filePath)
  const extension = path.extname(fileName).toLowerCase()
  const mimetype =
    extension === '.png' ? 'image/png' : extension === '.webp' ? 'image/webp' : 'image/jpeg'

  try {
    return await payload.create({
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
  } catch (error) {
    // A blob can already exist at this path (e.g. an orphaned upload from a
    // prior run) without a matching Payload media document. Retry once with
    // a disambiguated filename rather than failing the whole seed run.
    const message = error instanceof Error ? error.message : String(error)

    if (!message.includes('already exists')) {
      throw error
    }

    const disambiguatedName = `${baseName}-home-${Date.now()}${extension}`

    return payload.create({
      collection: 'media',
      depth: 0,
      data: {
        alt,
      },
      file: {
        data,
        mimetype,
        name: disambiguatedName,
        size: data.byteLength,
      },
    })
  }
}

async function upsertHomePage() {
  const payload = await getPayload({ config: configPromise })

  const [
    heroBackgroundImage,
    heroCardTextureImage,
    hikingPanelImage,
    trailPanelImage,
    waterPanelImage,
    highAdventureImage,
    outdoorSkillsImage,
    leadershipImage,
    serviceImage,
    fishingImage,
    hikingActivityImage,
    climbingImage,
    cavingImage,
    canoeingImage,
  ] = await Promise.all([
    upsertMedia(payload, { fileName: 'Climbing2.JPG', alt: 'Scouts climbing during a troop outing' }),
    // Also reused below as the "Rafting" activity card image — same file, one Media doc.
    upsertMedia(payload, { fileName: 'rafting.jpg', alt: 'Scouts rafting during a troop outing' }),
    upsertMedia(payload, { fileName: 'hiking2.jpg', alt: 'Scouts hiking during a troop outdoor activity' }),
    upsertMedia(payload, { fileName: 'Trail.JPG', alt: 'Trail view from a troop hiking outing' }),
    upsertMedia(payload, { fileName: 'OnTheWater.JPG', alt: 'Scouts on the water during a troop outing' }),
    upsertMedia(payload, { fileName: 'high-adventure.JPG', alt: 'Scouts on a high-adventure outing' }),
    upsertMedia(payload, { fileName: 'outdoor.JPG', alt: 'Scouts practicing outdoor skills during a troop activity' }),
    upsertMedia(payload, { fileName: 'leadership.JPG', alt: 'Scouts leading during a troop activity' }),
    upsertMedia(payload, { fileName: 'service.JPG', alt: 'Scouts serving together during a troop service project' }),
    upsertMedia(payload, { fileName: 'fishing.JPG', alt: 'Scouts fishing during a troop activity' }),
    upsertMedia(payload, { fileName: 'hiking.JPG', alt: 'Scouts hiking during a troop activity' }),
    upsertMedia(payload, { fileName: 'Climbing3.JPG', alt: 'Scouts climbing during a troop activity' }),
    upsertMedia(payload, { fileName: 'Caving.jpg', alt: 'Scouts in a cave during a troop activity' }),
    upsertMedia(payload, { fileName: 'canoeing2.JPG', alt: 'Scouts canoeing during a troop activity' }),
  ])

  const raftingImage = heroCardTextureImage

  const whyJoinPage = await payload.find({
    collection: 'pages',
    depth: 0,
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: 'why-join',
      },
    },
  })

  const pageData = homePage({
    heroBackgroundImage,
    heroCardTextureImage,
    hikingPanelImage,
    trailPanelImage,
    waterPanelImage,
    highAdventureImage,
    outdoorSkillsImage,
    leadershipImage,
    serviceImage,
    fishingImage,
    hikingActivityImage,
    climbingImage,
    raftingImage,
    cavingImage,
    canoeingImage,
    whyJoinPageId: whyJoinPage.docs[0]?.id,
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

void upsertHomePage().then(
  () => process.exit(0),
  (error) => {
    console.error(error)
    process.exit(1)
  },
)
