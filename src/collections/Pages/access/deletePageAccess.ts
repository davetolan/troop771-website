import type { Access } from 'payload'

import type { User } from '@/payload-types'
import { getRequestUserRole } from '@/access/getRequestUserRole'

type LoggableUser = {
  id?: number | string
  _id?: number | string
  email?: string | null
  role?: string | null
  roles?: string[] | string | null
}

export const deletePageAccess: Access<User> = async ({ id, req }) => {
  const user = (req.user as LoggableUser | null) ?? null

  if (!user) {
    req.payload.logger.warn({
      event: 'pages.delete.access-check',
      collection: 'pages',
      documentID: id ?? null,
      allowed: false,
      reason: 'missing-user',
      request: {
        method: req.method,
        api: req.payloadAPI,
      },
    })

    return false
  }

  const role = await getRequestUserRole(req)
  const allowed = role === 'admin'

  req.payload.logger.info({
    event: 'pages.delete.access-check',
    collection: 'pages',
    documentID: id ?? null,
    allowed,
    userID: user.id ?? user._id ?? null,
    userEmail: user.email ?? null,
    jwtRole: user.role ?? null,
    legacyRoles: user.roles ?? null,
    resolvedRole: role ?? null,
    request: {
      method: req.method,
      api: req.payloadAPI,
    },
  })

  return allowed
}
