import Link from 'next/link'
import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { registrationUrl } from '@/components/homepage/constants'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { MobileNav } from './MobileNav'

export async function Header() {
  const headerData: HeaderType = await getCachedGlobal('header', 1)()
  const navItems = headerData?.navItems || []

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-stone-950/75 text-white backdrop-blur-xl">
      <div className="container flex min-h-[4.5rem] items-center justify-between gap-6 py-4">
        <Link className="min-w-0" href="/">
          <span className="block text-xs font-semibold uppercase tracking-[0.26em] text-stone-200">
            Scouting Ministry 771
          </span>
          <span className="mt-1 block text-lg font-semibold tracking-tight text-white">
            Troop 771
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {navItems.map(({ link }, index) => (
            <CMSLink
              {...link}
              appearance="inline"
              className="text-sm font-medium text-stone-200 transition hover:text-white"
              key={index}
            />
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Link
            className="hidden items-center justify-center rounded-full bg-amber-300 px-4 py-2 text-sm font-semibold text-stone-950 transition hover:bg-amber-200 lg:inline-flex"
            href={registrationUrl}
            rel="noreferrer"
            target="_blank"
          >
            Join the Troop
          </Link>

          <MobileNav navItems={navItems} />
        </div>
      </div>
    </header>
  )
}
