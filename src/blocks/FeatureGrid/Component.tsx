import Image from 'next/image'
import React from 'react'

import type { FeatureGridBlock as FeatureGridBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'

export const FeatureGridBlock: React.FC<FeatureGridBlockProps> = ({
  description,
  eyebrow,
  features,
  theme = 'dark',
  title,
}) => {
  const isDark = theme === 'dark'

  return (
    <section
      className={cn('py-16 sm:py-20', isDark ? 'bg-[linear-gradient(135deg,#1c1917,#292524,#1f3a2c)] text-white' : 'bg-[linear-gradient(to_bottom,rgba(250,250,249,1),rgba(245,245,244,1))] text-stone-950')}
    >
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(20rem,0.55fr)] lg:items-end">
          <div className="max-w-3xl">
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
          </div>

          <div className="relative min-h-[16rem] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_24px_90px_-55px_rgba(0,0,0,0.45)]">
            <Image
              alt="Scouts in a leadership and high-adventure setting"
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 30rem"
              src={isDark ? '/high-adventure.JPG' : '/leadership.JPG'}
            />
            <div
              className={cn(
                'absolute inset-0',
                isDark
                  ? 'bg-[linear-gradient(to_top,rgba(28,25,23,0.82),rgba(28,25,23,0.18),transparent)]'
                  : 'bg-[linear-gradient(to_top,rgba(41,37,36,0.55),rgba(41,37,36,0.05),transparent)]',
              )}
            />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-200">
                Featured
              </p>
              <p className="mt-2 max-w-xs text-sm leading-6 text-stone-100">
                Use this layout for the kind of value-prop sections that need more visual weight.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {(features || []).map((feature, index) => (
            <article
              className={cn(
                'rounded-[1.75rem] border p-6 shadow-[0_24px_80px_-50px_rgba(0,0,0,0.5)]',
                isDark ? 'border-white/10 bg-white/6 backdrop-blur-sm' : 'border-stone-200 bg-white shadow-[0_20px_60px_-40px_rgba(41,37,36,0.28)]',
              )}
              key={feature.id || index}
            >
              <div className={cn('inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold', isDark ? 'bg-amber-200/10 text-amber-200 ring-1 ring-amber-100/15' : 'bg-[#ece6d9] text-[#4f5d3a] ring-1 ring-stone-300')}>
                {index + 1}
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">{feature.title}</h3>
              <p className={cn('mt-3 text-sm leading-7', isDark ? 'text-stone-300' : 'text-stone-700')}>
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
