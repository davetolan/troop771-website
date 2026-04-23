import type { AfterErrorHook } from 'payload'

type LoggableUser = {
  id?: number | string
  _id?: number | string
  email?: string | null
  role?: string | null
  roles?: string[] | string | null
}

export const logPayloadError: AfterErrorHook = async ({
  collection,
  error,
  graphqlResult,
  req,
  result,
}) => {
  const user = (req.user as LoggableUser | null) ?? null

  req.payload.logger.error({
    event: 'payload.request.error',
    collection: collection?.slug ?? null,
    error: {
      message: error.message,
      name: error.name,
      stack: error.stack ?? null,
    },
    graphqlResult: graphqlResult ?? null,
    request: {
      api: req.payloadAPI,
      method: req.method,
      routeParams: req.routeParams ?? null,
      url: (req as { url?: string }).url ?? null,
    },
    response: result ?? null,
    user: user
      ? {
          id: user.id ?? user._id ?? null,
          email: user.email ?? null,
          role: user.role ?? null,
          roles: user.roles ?? null,
        }
      : null,
  })
}
