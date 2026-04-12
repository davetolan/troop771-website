import type { Access } from 'payload'

type UserWithRole = {
  role?: 'admin' | 'scout'
}

type VersionedData = {
  _status?: 'draft' | 'published'
}

export const canSaveDraft: Access = ({ req, data }) => {
  const user = req.user as UserWithRole | null

  if (!user) return false
  if (user.role === 'admin') return true

  const nextStatus = (data as VersionedData | undefined)?._status

  return nextStatus !== 'published'
}
