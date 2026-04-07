import Link from 'next/link'
import React from 'react'

import { registrationUrl, siteNav } from '@/components/homepage/constants'

export async function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/75 text-white backdrop-blur-xl">
      <div className="container flex min-h-[4.5rem] items-center justify-between gap-6 py-4">
        <Link className="min-w-0" href="/">
          <span className="block text-xs font-semibold uppercase tracking-[0.26em] text-emerald-200">
            Scouting Ministry 771
          </span>
          <span className="mt-1 block text-lg font-semibold tracking-tight text-white">
            Troop 771
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {siteNav.map((item) => (
            <Link
              className="text-sm font-medium text-slate-200 transition hover:text-white"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
          href={registrationUrl}
          rel="noreferrer"
          target="_blank"
        >
          Join the Troop
        </Link>
      </div>
    </header>
  )
}
