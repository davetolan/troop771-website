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

  const userDoc = await req.payload.findByID({
    collection: 'users',
    id: user.id,
    depth: 0,
    overrideAccess: false,
    req,
  })

  return userDoc.role ?? undefined
}
