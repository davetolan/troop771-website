import config from '@payload-config'
import { cookies } from 'next/headers'
import { getPayload } from 'payload'

import type { User } from '@/payload-types'
import { getClientSideURL } from '@/utilities/getURL'

type CollectionCheck = {
  ok: boolean
  error?: string
  totalDocs?: number
}

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value

  if (!token) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const meResponse = await fetch(`${getClientSideURL()}/api/users/me`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  })

  const { user } = (await meResponse.json()) as { user?: User | null }

  if (!meResponse.ok || !user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config })
  const collectionSlugs = payload.config.collections.map((collection) => collection.slug)

  const [gearPages, gearItems] = await Promise.all([
    checkCollection(payload, user, 'gear-pages'),
    checkCollection(payload, user, 'gear-items'),
  ])

  return Response.json({
    collectionsRegistered: {
      gearPages: collectionSlugs.includes('gear-pages'),
      gearItems: collectionSlugs.includes('gear-items'),
    },
    checks: {
      gearPages,
      gearItems,
    },
  })
}

async function checkCollection(
  payload: Awaited<ReturnType<typeof getPayload>>,
  user: User,
  collection: 'gear-items' | 'gear-pages',
): Promise<CollectionCheck> {
  try {
    const result = await payload.find({
      collection,
      depth: 0,
      limit: 1,
      overrideAccess: false,
      pagination: false,
      user,
    })

    return {
      ok: true,
      totalDocs: result.totalDocs,
    }
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
