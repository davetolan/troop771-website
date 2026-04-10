import Link from 'next/link'
import React from 'react'

import { siteNav } from '@/components/homepage/constants'

export async function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-[#f6f1e8]">
      <div className="container flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#4f5d3a]">
            Scouting Ministry 771
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-950">Troop 771</h2>
          <p className="mt-2 text-sm text-stone-600">Argyle, Texas</p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3">
          {siteNav.map((item) => (
            <Link
              className="text-sm font-medium text-stone-600 transition hover:text-stone-950"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
