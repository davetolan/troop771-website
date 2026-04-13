import type {
  CollectionAfterChangeHook,
  CollectionBeforeDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

const SCOUT_ROLE = 'scout'
const MAX_CHANGED_FIELDS = 25

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

type LogScoutChangeArgs = {
  req: Parameters<CollectionAfterChangeHook>[0]['req']
  action: 'create' | 'update' | 'delete'
  targetType: 'collection' | 'global'
  targetSlug: string
  targetID?: string
  changedFields?: string[]
}

const logScoutChange = async ({
  req,
  action,
  targetType,
  targetSlug,
  targetID,
  changedFields = [],
}: LogScoutChangeArgs): Promise<void> => {
  const actor = req.user

  if (!actor || actor.role !== SCOUT_ROLE) {
    return
  }

  await req.payload.create({
    collection: 'scout-change-reports',
    data: {
      action,
      actor: actor.id,
      actorEmail: actor.email,
      actorName: actor.name,
      actorRole: actor.role,
      changedFields: changedFields.map((field) => ({ field })),
      occurredAt: new Date().toISOString(),
      targetID,
      targetSlug,
      targetType,
    },
    req,
  })
}

export const createScoutCollectionAfterChangeHook = (
  slug: string,
): CollectionAfterChangeHook => {
  return async ({ doc, operation, previousDoc, req }) => {
    const changedFields =
      operation === 'update'
        ? getChangedFields(
            (previousDoc as Record<string, unknown> | undefined) ?? null,
            (doc as Record<string, unknown> | undefined) ?? null,
          )
        : []

    await logScoutChange({
      req,
      action: operation,
      changedFields,
      targetID: String(doc.id),
      targetSlug: slug,
      targetType: 'collection',
    })

    return doc
  }
}

export const createScoutCollectionBeforeDeleteHook = (
  slug: string,
): CollectionBeforeDeleteHook => {
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
      targetSlug: slug,
      targetType: 'global',
    })

    return doc
  }
}
