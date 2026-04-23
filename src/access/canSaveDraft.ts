import type { Access } from 'payload'
import { getRequestUserRole } from './getRequestUserRole'

type VersionedData = {
  _status?: 'draft' | 'published'
}

export const canSaveDraft: Access = async ({ req, data }) => {
  const nextStatus = (data as VersionedData | undefined)?._status

  if (!req.user) {
    req.payload.logger.info({
      event: 'access.canSaveDraft',
      collection: 'unknown',
      allowed: false,
      reason: 'missing-user',
      nextStatus: nextStatus ?? null,
      method: req.method,
      url: (req as { url?: string }).url ?? null,
    })

    return false
  }

  const role = await getRequestUserRole(req)

  if (role === 'admin') {
    req.payload.logger.info({
      event: 'access.canSaveDraft',
      collection: 'unknown',
      allowed: true,
      reason: 'admin-role',
      nextStatus: nextStatus ?? null,
      userID: req.user?.id,
      userEmail: req.user?.email,
      resolvedRole: role,
      method: req.method,
      url: (req as { url?: string }).url ?? null,
    })

    return true
  }

  const allowed = nextStatus !== 'published'

  req.payload.logger.info({
    event: 'access.canSaveDraft',
    collection: 'unknown',
    allowed,
    reason: allowed ? 'non-admin-draft-only' : 'non-admin-publish-blocked',
    nextStatus: nextStatus ?? null,
    userID: req.user?.id,
    userEmail: req.user?.email,
    resolvedRole: role ?? null,
    method: req.method,
    url: (req as { url?: string }).url ?? null,
  })

  return allowed
}
