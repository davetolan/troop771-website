import type { Access } from 'payload'

import type { User } from '@/payload-types'
import { getRequestUserRole } from './getRequestUserRole'

export const adminOnly: Access<User> = async ({ req }) => {
  const { user } = req

  if (!user) {
    return false
  }

  const role = await getRequestUserRole(req)

  return role === 'admin'
}
