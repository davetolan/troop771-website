import type { PayloadRequest } from 'payload'

type UserRole = 'admin' | 'scout'

type UserWithRole = {
  id?: number | string
  role?: UserRole
}

export const getRequestUserRole = async (req: PayloadRequest): Promise<UserRole | undefined> => {
  const user = req.user as UserWithRole | null

  if (!user) {
    return undefined
  }

  if (user.role) {
    return user.role
  }

  if (!user.id) {
    return undefined
  }

  try {
    const userDoc = await req.payload.findByID({
      collection: 'users',
      id: user.id,
      depth: 0,
      // Fallback only when role is missing from JWT; use elevated read so
      // auth/session edge-cases do not fail collection access checks.
      overrideAccess: true,
    })

    return userDoc.role ?? undefined
  } catch {
    req.payload.logger?.debug?.(
      `getRequestUserRole: user lookup failed, treating as unauthenticated (user id: ${String(user.id)})`,
    )

    return undefined
  }
}
