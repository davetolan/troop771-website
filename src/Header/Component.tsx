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
          {navItems.map(({ link, subItems }, index) => (
            <div className="group relative" key={index}>
              <CMSLink
                {...link}
                appearance="inline"
                className="text-sm font-medium text-stone-200 transition hover:text-white"
              />

              {subItems && subItems.length > 0 ? (
                <div className="invisible absolute left-0 top-full z-40 mt-2 min-w-56 rounded-xl border border-white/10 bg-stone-950/95 p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">
                  <ul className="flex flex-col gap-1">
                    {subItems.map(({ link: subLink }, subIndex) => (
                      <li key={subIndex}>
                        <CMSLink
                          {...subLink}
                          appearance="inline"
                          className="block rounded-md px-3 py-2 text-sm text-stone-100 transition hover:bg-white/5 hover:text-white"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
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
