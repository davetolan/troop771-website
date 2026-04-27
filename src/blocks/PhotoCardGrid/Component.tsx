import Image from 'next/image'
import React from 'react'

import type { PhotoCardGridBlock as PhotoCardGridBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

export const PhotoCardGridBlock: React.FC<PhotoCardGridBlockProps> = ({
  backgroundMedia,
  cards,
  columns = 'three',
  description,
  eyebrow,
  title,
}) => {
  const resolvedColumns = columns || 'three'
  const gridClass = {
    two: 'md:grid-cols-2',
    three: 'md:grid-cols-2 xl:grid-cols-3',
    four: 'md:grid-cols-2 xl:grid-cols-4',
  }[resolvedColumns]

  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(to_bottom,rgba(255,255,255,1),rgba(250,250,249,1))] py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72">
        {backgroundMedia ? (
          <Media
            imgClassName="h-full w-full rounded-none border-0 object-cover object-center opacity-18"
            resource={backgroundMedia}
          />
        ) : (
          <Image
            alt=""
            aria-hidden="true"
            className="object-cover object-center opacity-18"
            fill
            sizes="100vw"
            src="/Canoeing.JPG"
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.96),rgba(250,250,249,0.88),transparent)]" />
      </div>
      <div className="container relative z-10">
        <div className="relative max-w-3xl">
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#4f5d3a]">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-base leading-7 text-stone-700 sm:text-lg">{description}</p>
          ) : null}
        </div>

        <div className={cn('mt-12 grid gap-5', gridClass)}>
          {(cards || []).map((card, index) => (
            <article
              className="overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white shadow-[0_20px_60px_-40px_rgba(41,37,36,0.28)] transition hover:-translate-y-1 hover:shadow-[0_28px_80px_-42px_rgba(41,37,36,0.36)]"
              key={card.id || index}
            >
              <div className="border-b border-stone-200">
                <Media
                  imgClassName="h-full min-h-[14rem] w-full rounded-none border-0 object-cover"
                  resource={card.media}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold tracking-tight text-stone-950">{card.title}</h3>
                {card.description ? (
                  <p className="mt-3 text-sm leading-7 text-stone-700">{card.description}</p>
                ) : null}
                {card.enableLink && card.link ? (
                  <div className="mt-5">
                    <CMSLink appearance="default" size="sm" {...card.link} />
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
