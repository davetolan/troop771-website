import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { createScoutGlobalAfterChangeHook } from '@/hooks/logScoutChanges'
import { revalidateHeader } from './hooks/revalidateHeader'

type HeaderNavItem = {
  link?: {
    type?: 'reference' | 'custom'
    reference?: unknown
    url?: string | null
  }
  subItems?: unknown[]
}

const hasLinkTarget = (navItem: HeaderNavItem): boolean => {
  const linkData = navItem.link

  if (!linkData) return false

  if (linkData.type === 'custom') {
    return Boolean(linkData.url)
  }

  return Boolean(linkData.reference)
}

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
          requireTarget: false,
        }),
        {
          name: 'subItems',
          type: 'array',
          fields: [
            link({
              appearances: false,
            }),
          ],
          admin: {
            initCollapsed: true,
          },
        },
      ],
      maxRows: 6,
      validate: (value) => {
        if (!Array.isArray(value)) return true

        const invalidIndex = value.findIndex((item) => {
          const navItem = item as HeaderNavItem
          const hasSubItems = Array.isArray(navItem.subItems) && navItem.subItems.length > 0

          if (hasSubItems) return false

          return !hasLinkTarget(navItem)
        })

        if (invalidIndex === -1) return true

        return `Nav item ${invalidIndex + 1} must include an internal link or custom URL when it has no sub items.`
      },
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [createScoutGlobalAfterChangeHook('header'), revalidateHeader],
  },
}
