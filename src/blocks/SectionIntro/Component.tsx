import Image from 'next/image'
import React from 'react'

import type { SectionIntroBlock as SectionIntroBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

export const SectionIntroBlock: React.FC<SectionIntroBlockProps> = ({
  alignment = 'left',
  description,
  eyebrow,
  links,
  theme = 'light',
  title,
}) => {
  const isCentered = alignment === 'center'
  const isDark = theme === 'dark'
  const isStone = theme === 'stone'

  return (
    <section
      className={cn(
        'relative overflow-hidden py-16 sm:py-20',
        isDark
          ? 'bg-stone-950 text-white'
          : isStone
            ? 'bg-[#f6f1e8] text-stone-950'
            : 'bg-white text-stone-950',
      )}
    >
      <div className="absolute inset-x-0 top-0 h-56">
        <Image
          alt=""
          aria-hidden="true"
          className="object-cover object-center opacity-25"
          fill
          sizes="100vw"
          src={isDark ? '/OnTheWater.JPG' : isStone ? '/Trail.JPG' : '/outdoor.JPG'}
        />
        <div
          className={cn(
            'absolute inset-0',
            isDark
              ? 'bg-[linear-gradient(to_bottom,rgba(28,25,23,0.92),rgba(28,25,23,0.7),transparent)]'
              : 'bg-[linear-gradient(to_bottom,rgba(250,250,249,0.94),rgba(250,250,249,0.8),transparent)]',
          )}
        />
      </div>
      <div className="container">
        <div className={cn('relative max-w-3xl', isCentered && 'mx-auto text-center')}>
          {eyebrow ? (
            <p className={cn('text-sm font-semibold uppercase tracking-[0.28em]', isDark ? 'text-amber-200' : 'text-[#4f5d3a]')}>
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
          {description ? (
            <p className={cn('mt-4 text-base leading-7 sm:text-lg', isDark ? 'text-stone-200' : 'text-stone-700')}>
              {description}
            </p>
          ) : null}
          {links?.length ? (
            <div className={cn('mt-8 flex flex-col gap-4 sm:flex-row', isCentered && 'sm:justify-center')}>
              {links.map(({ link }, index) => (
                <CMSLink key={index} size="lg" {...link} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
