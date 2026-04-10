import React from 'react'

import type { SplitSectionBlock as SplitSectionBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

export const SplitSectionBlock: React.FC<SplitSectionBlockProps> = ({
  body,
  description,
  eyebrow,
  links,
  media,
  mediaPosition = 'right',
  theme = 'light',
  title,
}) => {
  const mediaFirst = mediaPosition === 'left'
  const isDark = theme === 'dark'
  const isStone = theme === 'stone'

  return (
    <section
      className={cn(
        'py-16 sm:py-20',
        isDark
          ? 'bg-[linear-gradient(135deg,#1c1917,#292524,#1f3a2c)] text-white'
          : isStone
            ? 'bg-[#f6f1e8] text-stone-950'
            : 'bg-white text-stone-950',
      )}
    >
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
          <div className={cn(mediaFirst ? 'lg:order-1' : 'lg:order-2')}>
            <div className="relative overflow-hidden rounded-[2rem] border border-stone-200/70 shadow-[0_24px_90px_-55px_rgba(41,37,36,0.4)]">
              <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.18),transparent_28%),linear-gradient(to_top,rgba(28,25,23,0.28),transparent_45%)]" />
              <Media
                imgClassName="h-full min-h-[22rem] w-full rounded-none border-0 object-cover"
                resource={media}
              />
            </div>
          </div>

          <div className={cn(mediaFirst ? 'lg:order-2' : 'lg:order-1')}>
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
            {body ? (
              <div className={cn('mt-6 rounded-[1.5rem] border p-6', isDark ? 'border-white/10 bg-white/6 [&_p]:text-stone-300 [&_h2]:text-white [&_h3]:text-white [&_li]:text-stone-300' : 'border-stone-200 bg-white/80 [&_p]:text-stone-700 [&_h2]:text-stone-950 [&_h3]:text-stone-950 [&_li]:text-stone-700')}>
                <RichText data={body} enableGutter={false} />
              </div>
            ) : null}
            {links?.length ? (
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
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
