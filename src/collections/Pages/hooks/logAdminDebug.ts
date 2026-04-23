import type {
  CollectionAfterReadHook,
  CollectionBeforeChangeHook,
  PayloadRequest,
} from 'payload'
import { getRequestUserRole } from '@/access/getRequestUserRole'

type LoggableUser = {
  id?: number | string
  _id?: number | string
  email?: string | null
  role?: string | null
  roles?: string[] | string | null
}

const getUserMeta = (req: PayloadRequest) => {
  const user = (req.user as LoggableUser | null) ?? null

  return {
    user,
    userID: user?.id ?? user?._id,
    userEmail: user?.email ?? null,
    jwtRole: user?.role ?? null,
    legacyRoles: user?.roles ?? null,
  }
}

const getRequestContext = (req: PayloadRequest) => {
  const requestMeta = req as PayloadRequest & {
    url?: string
    path?: string
    route?: { path?: string }
  }

  return {
    method: req.method,
    url: requestMeta.url ?? null,
    path: requestMeta.path ?? null,
    routePath: requestMeta.route?.path ?? null,
    api: req.payloadAPI,
  }
}

export const logPagesEditReadContext: CollectionAfterReadHook = async ({ doc, req }) => {
  const { user, userEmail, userID, jwtRole, legacyRoles } = getUserMeta(req)
  const resolvedRole = user ? await getRequestUserRole(req) : undefined

  req.payload.logger.info({
    event: 'pages.edit.read-context',
    collection: 'pages',
    documentID: doc?.id,
    documentSlug: doc?.slug,
    documentStatus: doc?._status,
    userID,
    userEmail,
    hasUser: Boolean(user),
    jwtRole,
    legacyRoles,
    resolvedRole: resolvedRole ?? null,
    request: getRequestContext(req),
  })

  return doc
}

export const logPagesSaveAttemptContext: CollectionBeforeChangeHook = async ({
  data,
  originalDoc,
  operation,
  req,
}) => {
  const { user, userEmail, userID, jwtRole, legacyRoles } = getUserMeta(req)
  const resolvedRole = user ? await getRequestUserRole(req) : undefined

  req.payload.logger.info({
    event: 'pages.save.attempt-context',
    collection: 'pages',
    operation,
    originalDocumentID: originalDoc?.id,
    originalStatus: originalDoc?._status,
    incomingStatus: data?._status,
    userID,
    userEmail,
    hasUser: Boolean(user),
    jwtRole,
    legacyRoles,
    resolvedRole: resolvedRole ?? null,
    request: getRequestContext(req),
  })

  return data
}
