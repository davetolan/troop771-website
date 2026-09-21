import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'
import fs from 'fs/promises'
import path from 'path'

import { whyEagleScoutMattersPage } from '../endpoints/seed/why-eagle-scout-matters-page'

const PAGE_SLUG = 'why-eagle-scout-matters'
const PAGE_TITLE = 'Why Eagle Scout Matters'
const PAGE_URL = '/why-eagle-scout-matters'

// This migration seeds/updates a `pages` document through the Local API, which always builds
// its queries from the *current* collection config, not the schema as of this migration's
// original timestamp. That's harmless on any database that already has every later migration
// applied (every real deploy target, since this migration has long since run there). But
// replaying the full migration history against a brand-new database reaches this migration
// before the merit badge counselors block, the activities layout `show_inactive` column, and
// the gear pages relationship exist, and the Local API query fails on the missing columns.
// Guard against that instead of crashing the whole migrate run — a brand-new database is
// expected to be populated via the `/next/seed` endpoint (src/endpoints/seed/index.ts), which
// already creates this same page, so skipping the backfill here loses nothing.
const hasRequiredPagesSchema = async (db: MigrateUpArgs['db']): Promise<boolean> => {
  const { rows } = await db.execute(sql`
    SELECT
      EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'pages_blocks_activities_layout' AND column_name = 'show_inactive'
      ) AS "hasActivitiesShowInactive",
      EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_name = 'pages_blocks_merit_badge_counselors_layout'
      ) AS "hasMeritBadgeCounselorsBlock",
      EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'pages_rels' AND column_name = 'gear_pages_id'
      ) AS "hasGearPagesRel"
  `)

  const row = rows[0] as
    | {
        hasActivitiesShowInactive: boolean
        hasGearPagesRel: boolean
        hasMeritBadgeCounselorsBlock: boolean
      }
    | undefined

  return Boolean(
    row?.hasActivitiesShowInactive && row?.hasMeritBadgeCounselorsBlock && row?.hasGearPagesRel,
  )
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

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  if (!(await hasRequiredPagesSchema(db))) {
    payload.logger.warn({
      msg: '[20260426_151500_upsert_why_eagle_scout_matters_page] Skipping: required `pages` schema from later migrations is not present yet. This only happens when running `payload migrate` against a brand-new database — seed content via the `/next/seed` endpoint instead.',
    })
    return
  }

  const [challengeImage, collegeImage, leadershipImage, parentRoiImage, serviceImage, trailImage] = await Promise.all([
    getOrCreateMediaByFilename({
      fileName: 'high-adventure.JPG',
      alt: 'Scouts on a high-adventure outing',
      payload,
      req,
    }),
    getOrCreateMediaByFilename({
      fileName: 'philmont-climbing.jpg',
      alt: 'Scout climbing at Philmont high adventure',
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
      fileName: 'leadership2.jpg',
      alt: 'Scouts learning leadership together outdoors',
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
    collegeImage,
    leadershipImage,
    parentRoiImage,
    serviceImage,
    trailImage,
  })

  // `select` keeps this query to the `pages` table itself. Without it, the Local API
  // fetches every block type ever added to `pages` (via the current, not historical,
  // collection config) — including block columns that later migrations haven't created
  // yet when this migration runs against an older database state.
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
  } else {
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

  await ensureHeaderLink({ payload, req })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  if (!(await hasRequiredPagesSchema(db))) {
    payload.logger.warn({
      msg: '[20260426_151500_upsert_why_eagle_scout_matters_page] Skipping revert: required `pages` schema from later migrations is not present yet.',
    })
    return
  }

  const pages = await payload.find({
    collection: 'pages',
    req,
    depth: 0,
    limit: 10,
    pagination: false,
    select: {},
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
