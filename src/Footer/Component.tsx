import React from 'react'

import type { Footer as FooterType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { getCachedGlobal } from '@/utilities/getGlobals'

export async function Footer() {
  const footerData: FooterType = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

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
          {navItems.map(({ link }, index) => (
            <CMSLink
              {...link}
              className="text-sm font-medium text-stone-600 transition hover:text-stone-950"
              appearance="inline"
              key={index}
            />
          ))}
        </nav>
      </div>
    </footer>
  )
}
