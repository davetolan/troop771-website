import type { Access } from 'payload'
import { getRequestUserRole } from './getRequestUserRole'

type VersionedData = {
  _status?: 'draft' | 'published'
}

export const canSaveDraft: Access = async ({ req, data }) => {
  if (!req.user) return false

  const role = await getRequestUserRole(req)

  if (role === 'admin') return true

  const nextStatus = (data as VersionedData | undefined)?._status

  return nextStatus !== 'published'
}
