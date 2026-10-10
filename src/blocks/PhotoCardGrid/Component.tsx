import Image from 'next/image'
import React from 'react'

import type { PhotoCardGridBlock as PhotoCardGridBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

import { cardIconMap, type CardIconValue } from '@/fields/scoutIcons'

import { PhotoCardCarousel } from './Carousel.client'

type CardProps = NonNullable<PhotoCardGridBlockProps['cards']>[number]

const Card: React.FC<{ card: CardProps; isCarousel: boolean }> = ({ card, isCarousel }) => {
  const Icon = cardIconMap[(card.icon || 'none') as CardIconValue]

  return (
    <article
      className={cn(
        'overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white shadow-[0_20px_60px_-40px_rgba(41,37,36,0.28)] transition hover:-translate-y-1 hover:shadow-[0_28px_80px_-42px_rgba(41,37,36,0.36)]',
        isCarousel && 'min-w-[85%] shrink-0 snap-start sm:min-w-[22rem] lg:min-w-[24rem]',
      )}
      data-carousel-card={isCarousel ? true : undefined}
    >
      <div className="relative h-56 overflow-hidden border-b border-stone-200">
        <Media
          fill
          imgClassName="rounded-none border-0 object-cover"
          pictureClassName="absolute inset-0"
          resource={card.media}
        />
        {Icon ? (
          <div className="absolute right-4 top-4 rounded-2xl bg-white/90 p-3 text-stone-900 shadow-sm ring-1 ring-stone-200 backdrop-blur">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
        ) : null}
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
  )
}

export const PhotoCardGridBlock: React.FC<PhotoCardGridBlockProps> = ({
  backgroundMedia,
  cards,
  columns = 'three',
  description,
  eyebrow,
  layout = 'grid',
  title,
}) => {
  const resolvedColumns = columns || 'three'
  const isCarousel = layout === 'carousel'
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

        {isCarousel ? (
          <div className="mt-6">
            <PhotoCardCarousel>
              {(cards || []).map((card, index) => (
                <Card card={card} isCarousel key={card.id || index} />
              ))}
            </PhotoCardCarousel>
          </div>
        ) : (
          <div className={cn('mt-12 grid gap-5', gridClass)}>
            {(cards || []).map((card, index) => (
              <Card card={card} isCarousel={false} key={card.id || index} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
