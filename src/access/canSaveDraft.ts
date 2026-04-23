import type { Access } from 'payload'
import { getRequestUserRole } from './getRequestUserRole'

type VersionedData = {
  _status?: 'draft' | 'published'
}

export const canSaveDraft: Access = async ({ req, data }) => {
  const nextStatus = (data as VersionedData | undefined)?._status
  const requestMethod = req.method ?? ''
  const requestURL = (req as { url?: string }).url ?? ''

  if (!req.user) {
    req.payload.logger.info({
      event: 'access.canSaveDraft',
      collection: 'unknown',
      allowed: false,
      reason: 'missing-user',
      nextStatus: nextStatus ?? null,
      method: requestMethod || null,
      url: requestURL || null,
    })

    return false
  }

  const isReadOnlyMethod = ['GET', 'HEAD', 'OPTIONS'].includes(requestMethod.toUpperCase())
  const isAdminAccessProbe = requestURL.includes('/api/access')

  if (isReadOnlyMethod || isAdminAccessProbe) {
    req.payload.logger.info({
      event: 'access.canSaveDraft',
      collection: 'unknown',
      allowed: true,
      reason: isReadOnlyMethod ? 'read-only-method' : 'admin-access-probe',
      nextStatus: nextStatus ?? null,
      userID: req.user?.id,
      userEmail: req.user?.email,
      method: requestMethod || null,
      url: requestURL || null,
    })

    return true
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
      method: requestMethod || null,
      url: requestURL || null,
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
    method: requestMethod || null,
    url: requestURL || null,
  })

  return allowed
}
