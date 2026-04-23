'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import React, { useEffect, useId, useRef, useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { registrationUrl } from '@/components/homepage/constants'

type MobileNavProps = {
  navItems: NonNullable<HeaderType['navItems']>
}

export function MobileNav({ navItems }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const panelId = useId()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const firstFocusable = panelRef.current?.querySelector<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )

    firstFocusable?.focus()
  }, [isOpen])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    const desktopMediaQuery = window.matchMedia('(min-width: 1024px)')
    const onDesktopMediaChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    desktopMediaQuery.addEventListener('change', onDesktopMediaChange)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      desktopMediaQuery.removeEventListener('change', onDesktopMediaChange)
    }
  }, [])

  return (
    <div className="relative lg:hidden">
      <button
        aria-controls={panelId}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-stone-200 transition hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
        onClick={() => setIsOpen((previousState) => !previousState)}
        type="button"
      >
        {isOpen ? (
          <X aria-hidden="true" className="h-5 w-5" />
        ) : (
          <Menu aria-hidden="true" className="h-5 w-5" />
        )}
      </button>

      <div
        aria-label="Mobile"
        className={`absolute right-0 top-full mt-3 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-white/10 bg-stone-950/95 p-3 text-left shadow-2xl backdrop-blur-xl transition-all duration-200 ease-out ${
          isOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
        }`}
        hidden={!isOpen}
        id={panelId}
        ref={panelRef}
      >
        <nav aria-label="Primary mobile">
          <ul
            className="flex flex-col gap-1"
            onClickCapture={(event) => {
              if ((event.target as HTMLElement).closest('a')) {
                setIsOpen(false)
              }
            }}
          >
            {navItems.map(({ link, subItems }, index) => {
              const dropdownItems = subItems ?? []
              const hasSubItems = dropdownItems.length > 0
              const hasLinkTarget =
                (link?.type === 'custom' && Boolean(link?.url)) ||
                (link?.type === 'reference' && Boolean(link?.reference))

              return (
                <li key={index}>
                  {hasLinkTarget ? (
                    <CMSLink
                      {...link}
                      appearance="inline"
                      className="block rounded-md px-3 py-2 text-sm font-medium text-stone-100 transition hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                    />
                  ) : hasSubItems ? (
                    <span className="block rounded-md px-3 py-2 text-sm font-medium text-stone-100">
                      {link?.label}
                    </span>
                  ) : null}
                  {hasSubItems ? (
                    <ul className="mt-1 ml-3 flex flex-col gap-1 border-l border-white/10 pl-3">
                      {dropdownItems.map(({ link: subLink }, subIndex) => (
                        <li key={subIndex}>
                          <CMSLink
                            {...subLink}
                            appearance="inline"
                            className="block rounded-md px-3 py-2 text-xs font-medium text-stone-300 transition hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                          />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              )
            })}
          </ul>
        </nav>

        <Link
          className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-amber-300 px-4 py-2 text-sm font-semibold text-stone-950 transition hover:bg-amber-200"
          href={registrationUrl}
          rel="noreferrer"
          target="_blank"
        >
          Join the Troop
        </Link>
      </div>
    </div>
  )
}
