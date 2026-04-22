import type { Access } from 'payload'

import type { User } from '@/payload-types'

export const adminOnly: Access<User> = ({ req: { user } }) => {
  return Boolean(user)
}
