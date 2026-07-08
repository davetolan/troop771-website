import type {
  CollectionAfterChangeHook,
  CollectionBeforeDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'
import { getRequestUserRole } from '@/access/getRequestUserRole'

const SCOUT_ROLE = 'scout'
const ADMIN_ROLE = 'admin'
const MAX_CHANGED_FIELDS = 25
const REPORT_COLLECTION = 'scout-change-reports'

const getChangedFields = (
  previousDoc: Record<string, unknown> | null | undefined,
  nextDoc: Record<string, unknown> | null | undefined,
): string[] => {
  if (!previousDoc || !nextDoc) {
    return []
  }

  const keys = new Set([...Object.keys(previousDoc), ...Object.keys(nextDoc)])
  const changed = [...keys].filter((key) => {
    if (['updatedAt', 'createdAt', 'id'].includes(key)) return false

    return JSON.stringify(previousDoc[key]) !== JSON.stringify(nextDoc[key])
  })

  return changed.slice(0, MAX_CHANGED_FIELDS)
}

const getTargetLabel = (doc: Record<string, unknown> | null | undefined): string | undefined => {
  const value = doc?.title ?? doc?.activity ?? doc?.name ?? doc?.slug
  return typeof value === 'string' && value.length > 0 ? value : undefined
}

const mergeChangedFields = (existingFields: unknown, nextFields: string[]): { field: string }[] => {
  const fieldNames = new Set<string>()

  if (Array.isArray(existingFields)) {
    for (const item of existingFields) {
      const field = item && typeof item === 'object' ? item.field : undefined

      if (typeof field === 'string' && field.length > 0) {
        fieldNames.add(field)
      }
    }
  }

  for (const field of nextFields) {
    fieldNames.add(field)
  }

  return [...fieldNames].slice(0, MAX_CHANGED_FIELDS).map((field) => ({ field }))
}

const findPendingScoutChangeReport = async ({
  actorID,
  targetID,
  targetSlug,
  targetType,
  req,
}: {
  actorID: number | string
  targetID?: string
  targetSlug: string
  targetType: 'collection' | 'global'
  req: Parameters<CollectionAfterChangeHook>[0]['req']
}) => {
  const existing = await req.payload.find({
    collection: REPORT_COLLECTION,
    depth: 0,
    limit: 1,
    pagination: false,
    req,
    sort: '-occurredAt',
    where: {
      and: [
        {
          actor: {
            equals: actorID,
          },
        },
        {
          reviewStatus: {
            equals: 'pending',
          },
        },
        {
          targetSlug: {
            equals: targetSlug,
          },
        },
        {
          targetType: {
            equals: targetType,
          },
        },
        ...(targetID
          ? [
              {
                targetID: {
                  equals: targetID,
                },
              },
            ]
          : []),
      ],
    },
  })

  return existing.docs[0]
}

const markScoutChangeReportsAsPublished = async ({
  req,
  targetID,
  targetSlug,
}: {
  req: Parameters<CollectionAfterChangeHook>[0]['req']
  targetID: string
  targetSlug: string
}) => {
  const reviewer = req.user
  const reviewerRole = await getRequestUserRole(req)

  if (!reviewer || reviewerRole !== ADMIN_ROLE) {
    return
  }

  const { docs } = await req.payload.find({
    collection: REPORT_COLLECTION,
    depth: 0,
    limit: 100,
    pagination: false,
    req,
    where: {
      and: [
        {
          reviewStatus: {
            equals: 'pending',
          },
        },
        {
          targetSlug: {
            equals: targetSlug,
          },
        },
        {
          targetType: {
            equals: 'collection',
          },
        },
        {
          targetID: {
            equals: targetID,
          },
        },
      ],
    },
  })

  await Promise.all(
    docs.map((report) =>
      req.payload.update({
        id: report.id,
        collection: REPORT_COLLECTION,
        data: {
          reviewStatus: 'published',
          reviewedAt: new Date().toISOString(),
          reviewedBy: reviewer.id,
        },
        req,
      }),
    ),
  )
}

type LogScoutChangeArgs = {
  req: Parameters<CollectionAfterChangeHook>[0]['req']
  action: 'create' | 'update' | 'delete'
  targetType: 'collection' | 'global'
  targetSlug: string
  targetID?: string
  targetLabel?: string
  changedFields?: string[]
}

const logScoutChange = async ({
  req,
  action,
  targetType,
  targetSlug,
  targetID,
  targetLabel,
  changedFields = [],
}: LogScoutChangeArgs): Promise<void> => {
  const actor = req.user
  const actorRole = await getRequestUserRole(req)

  if (!actor || actorRole !== SCOUT_ROLE) {
    return
  }

  const existingPendingReport = await findPendingScoutChangeReport({
    actorID: actor.id,
    req,
    targetID,
    targetSlug,
    targetType,
  })

  const nextChangedFields = mergeChangedFields(existingPendingReport?.changedFields, changedFields)
  const occurredAt = new Date().toISOString()

  if (existingPendingReport) {
    await req.payload.update({
      id: existingPendingReport.id,
      collection: REPORT_COLLECTION,
      data: {
        action: existingPendingReport.action === 'create' ? 'create' : action,
        changedFields: nextChangedFields,
        occurredAt,
        targetLabel,
      },
      req,
    })

    return
  }

  await req.payload.create({
    collection: REPORT_COLLECTION,
    data: {
      action,
      actor: actor.id,
      actorEmail: actor.email,
      actorName: actor.name,
      actorRole,
      changedFields: nextChangedFields,
      occurredAt,
      reviewStatus: 'pending',
      targetID,
      targetLabel,
      targetSlug,
      targetType,
    },
    req,
  })
}

export const createScoutCollectionAfterChangeHook = (slug: string): CollectionAfterChangeHook => {
  return async ({ doc, operation, previousDoc, req }) => {
    const currentDoc = (doc as Record<string, unknown> | undefined) ?? null
    const previousSnapshot = (previousDoc as Record<string, unknown> | undefined) ?? null

    if (!currentDoc) {
      return doc
    }

    const requestUserRole = await getRequestUserRole(req)

    if (requestUserRole === ADMIN_ROLE && currentDoc._status === 'published') {
      await markScoutChangeReportsAsPublished({
        req,
        targetID: String(currentDoc.id),
        targetSlug: slug,
      })
    }

    const changedFields =
      operation === 'update' ? getChangedFields(previousSnapshot, currentDoc) : []

    await logScoutChange({
      req,
      action: operation,
      changedFields,
      targetID: String(currentDoc.id),
      targetLabel: getTargetLabel(currentDoc),
      targetSlug: slug,
      targetType: 'collection',
    })

    return doc
  }
}

export const createScoutCollectionBeforeDeleteHook = (slug: string): CollectionBeforeDeleteHook => {
  return async ({ id, req }) => {
    await logScoutChange({
      req,
      action: 'delete',
      targetID: String(id),
      targetSlug: slug,
      targetType: 'collection',
    })
  }
}

export const createScoutGlobalAfterChangeHook = (slug: string): GlobalAfterChangeHook => {
  return async ({ doc, previousDoc, req }) => {
    const changedFields = getChangedFields(
      (previousDoc as Record<string, unknown> | undefined) ?? null,
      (doc as Record<string, unknown> | undefined) ?? null,
    )

    await logScoutChange({
      req,
      action: 'update',
      changedFields,
      targetLabel: getTargetLabel((doc as Record<string, unknown> | undefined) ?? null),
      targetSlug: slug,
      targetType: 'global',
    })

    return doc
  }
}
