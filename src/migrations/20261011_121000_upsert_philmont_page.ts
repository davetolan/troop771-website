import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'
import fs from 'fs/promises'
import path from 'path'

import { philmontPage } from '../endpoints/seed/philmont-page'

const PAGE_SLUG = 'philmont'

// This migration seeds/updates a `pages` document through the Local API, which always builds
// its queries from the *current* collection config, not the schema as of this migration's
// timestamp. Replaying the migration history against a database that is missing a later
// `pages` block table would fail here, so only the packing list table this page depends on is
// checked up front. A brand-new database is expected to be populated via the `/next/seed`
// endpoint (src/endpoints/seed/index.ts), which creates this same page.
const hasPackingListSchema = async (db: MigrateUpArgs['db']): Promise<boolean> => {
  const { rows } = await db.execute(sql`
    SELECT EXISTS (
      SELECT 1 FROM information_schema.tables
      WHERE table_name = 'pages_blocks_packing_list_sections_items'
    ) AS "hasPackingListBlock"
  `)

  const row = rows[0] as { hasPackingListBlock: boolean } | undefined

  return Boolean(row?.hasPackingListBlock)
}

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

const getFirstMedia = async ({
  payload,
  req,
}: {
  payload: MigrateUpArgs['payload']
  req: MigrateUpArgs['req']
}) => {
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

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  if (!(await hasPackingListSchema(db))) {
    payload.logger.warn({
      msg: '[20261011_121000_upsert_philmont_page] Skipping: the packing list block tables are not present. Seed content via the `/next/seed` endpoint instead.',
    })
    return
  }

  const [heroImage, sectionImage] = await Promise.all([
    getOrCreateMediaByFilename({
      fileName: 'philmont-hiking.jpg',
      alt: 'Scouts hiking on the trail at Philmont',
      payload,
      req,
    }),
    getOrCreateMediaByFilename({
      fileName: 'philmont-climbing.jpg',
      alt: 'Scout climbing at Philmont high adventure',
      payload,
      req,
    }),
  ])

  const pageData = philmontPage({ heroImage, sectionImage })

  // `select` keeps this query to the `pages` table itself rather than joining every block
  // table in the current collection config.
  const existingPage = await payload.find({
    collection: 'pages',
    req,
    depth: 0,
    limit: 1,
    pagination: false,
    select: {},
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
      select: {},
      context: {
        disableRevalidate: true,
      },
      data: pageData,
    })
    return
  }

  await payload.create({
    collection: 'pages',
    req,
    depth: 0,
    select: {},
    context: {
      disableRevalidate: true,
    },
    data: pageData,
  })
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content-only migration: the page is left in place so a schema rollback never deletes
  // edits made in the admin.
}
