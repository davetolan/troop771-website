import React from 'react'

import type { PromoBlock as PromoBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

const isWithinWindow = (showFrom?: string | null, showUntil?: string | null, now = new Date()) => {
  if (showFrom && now.getTime() < new Date(showFrom).getTime()) {
    return false
  }

  if (showUntil && now.getTime() > new Date(showUntil).getTime()) {
    return false
  }

  return true
}

export const PromoBlock: React.FC<PromoBlockProps> = ({
  eyebrow,
  heading,
  image,
  layout = 'imageRight',
  links,
  showFrom,
  showUntil,
  text,
}) => {
  if (!isWithinWindow(showFrom, showUntil)) {
    return null
  }

  const isFullWidthBanner = layout === 'fullWidthBanner'
  const mediaFirst = layout === 'imageLeft'

  if (isFullWidthBanner) {
    return (
      <section className="relative isolate overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#1c1917,#292524,#1f3a2c)] py-12 text-white sm:py-16">
        <div className="absolute inset-0">
          {image ? (
            <Media
              imgClassName="h-full w-full rounded-none border-0 object-cover opacity-25"
              resource={image}
            />
          ) : null}
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(28,25,23,0.92),rgba(41,37,36,0.85),rgba(31,58,44,0.82))]" />
        </div>

        <div className="container relative z-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            {eyebrow ? (
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-200">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{heading}</h2>
            {text ? <p className="mt-3 text-base leading-7 text-stone-200">{text}</p> : null}
          </div>

          {links?.length ? (
            <div className="flex flex-col gap-3 sm:flex-row">
              {links.map(({ link }, index) => (
                <CMSLink key={index} size="lg" {...link} />
              ))}
            </div>
          ) : null}
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container">
        <div className="grid gap-8 overflow-hidden rounded-[2rem] border border-stone-200 bg-[#f6f1e8] shadow-[0_24px_90px_-55px_rgba(41,37,36,0.4)] lg:grid-cols-2">
          <div className={cn('relative min-h-[16rem]', mediaFirst ? 'lg:order-1' : 'lg:order-2')}>
            {image ? (
              <Media imgClassName="h-full w-full rounded-none border-0 object-cover" resource={image} />
            ) : (
              <div
                aria-label="Image placeholder"
                className="flex h-full min-h-[16rem] w-full items-center justify-center bg-gradient-to-br from-stone-200 to-stone-300 text-center text-sm font-medium tracking-wide text-stone-700"
              />
            )}
          </div>

          <div
            className={cn(
              'flex flex-col justify-center p-8 sm:p-10',
              mediaFirst ? 'lg:order-2' : 'lg:order-1',
            )}
          >
            {eyebrow ? (
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#4f5d3a]">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl">
              {heading}
            </h2>
            {text ? <p className="mt-4 text-base leading-7 text-stone-700">{text}</p> : null}
            {links?.length ? (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {links.map(({ link }, index) => (
                  <CMSLink key={index} size="lg" {...link} />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
