import type { PayloadRequest } from 'payload'

type UserRole = 'admin' | 'scout'

type LegacyRoles = UserRole[] | UserRole | null | undefined

type UserWithRole = {
  id?: number | string
  _id?: number | string
  email?: string | null
  role?: UserRole | null
  roles?: LegacyRoles
}

const coerceRole = (role: unknown): UserRole | undefined => {
  return role === 'admin' || role === 'scout' ? role : undefined
}

const getRoleFromLegacyRoles = (roles: LegacyRoles): UserRole | undefined => {
  if (Array.isArray(roles)) {
    if (roles.includes('admin')) return 'admin'
    if (roles.includes('scout')) return 'scout'
    return undefined
  }

  return coerceRole(roles)
}

export const getRequestUserRole = async (req: PayloadRequest): Promise<UserRole | undefined> => {
  const user = req.user as UserWithRole | null

  if (!user) {
    return undefined
  }

  const requestRole = coerceRole(user.role) ?? getRoleFromLegacyRoles(user.roles)

  if (requestRole) {
    return requestRole
  }

  const userID = user.id ?? user._id

  if (!userID) {
    return undefined
  }

  try {
    const userDoc = (await req.payload.findByID({
      collection: 'users',
      id: userID,
      depth: 0,
      req,
      // Fallback only when role is missing from JWT; use elevated read so
      // auth/session edge-cases do not fail collection access checks.
      overrideAccess: true,
    })) as UserWithRole

    const persistedRole = coerceRole(userDoc.role) ?? getRoleFromLegacyRoles(userDoc.roles)

    if (persistedRole) {
      return persistedRole
    }

    // Legacy recovery path:
    // If no explicit role is stored, treat the earliest account as admin so
    // a deployment cannot lock out all administrative edits.
    const firstUser = await req.payload.find({
      collection: 'users',
      depth: 0,
      limit: 1,
      pagination: false,
      sort: 'createdAt',
      req,
      overrideAccess: true,
    })

    const firstUserID = firstUser.docs[0]?.id

    if (firstUserID != null && String(firstUserID) === String(userID)) {
      return 'admin'
    }

    const userEmail = typeof user.email === 'string' ? user.email.toLowerCase() : undefined

    if (userEmail) {
      const userByEmail = await req.payload.find({
        collection: 'users',
        depth: 0,
        limit: 1,
        pagination: false,
        req,
        overrideAccess: true,
        where: {
          email: {
            equals: userEmail,
          },
        },
      })

      const persistedRoleByEmail =
        coerceRole((userByEmail.docs[0] as UserWithRole | undefined)?.role) ??
        getRoleFromLegacyRoles((userByEmail.docs[0] as UserWithRole | undefined)?.roles)

      if (persistedRoleByEmail) {
        return persistedRoleByEmail
      }
    }

    return undefined
  } catch {
    req.payload.logger?.debug?.(
      `getRequestUserRole: user lookup failed, treating as unauthenticated (user id: ${String(userID)})`,
    )

    return undefined
  }
}
