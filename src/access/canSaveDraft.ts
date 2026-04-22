import type { Access } from 'payload'

export const canSaveDraft: Access = ({ req: { user } }) => {
  return Boolean(user)
}
