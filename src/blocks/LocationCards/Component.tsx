import {
  ExternalLink,
  Landmark,
  MapPin,
  PawPrint,
  Tent,
  Trees,
  TreePine,
  Waves,
} from 'lucide-react'
import React from 'react'

import type { LocationCardsBlock as LocationCardsBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

type CardType = NonNullable<
  NonNullable<LocationCardsBlockProps['cards']>[number]['type']
>

const TYPE_LABELS: Record<CardType, string> = {
  troopProperty: 'Troop property',
  scoutCamp: 'Scout camp',
  statePark: 'State park',
  cityPark: 'City park',
  historicSite: 'Historic site',
  wildlifeRefuge: 'Wildlife refuge',
  whitewaterPark: 'Whitewater park',
  other: 'Other',
}

const TYPE_ICONS: Record<CardType, React.ComponentType<{ className?: string }>> = {
  troopProperty: Tent,
  scoutCamp: Tent,
  statePark: TreePine,
  cityPark: Trees,
  historicSite: Landmark,
  wildlifeRefuge: PawPrint,
  whitewaterPark: Waves,
  other: MapPin,
}

export const LocationCardsBlock: React.FC<LocationCardsBlockProps> = ({
  cards,
  columns = 'three',
  heading,
  intro,
}) => {
  const resolvedColumns = columns || 'three'
  const gridColsClass = {
    two: 'lg:grid-cols-2',
    three: 'lg:grid-cols-3',
  }[resolvedColumns]

  return (
    <section className="bg-[linear-gradient(135deg,#0c0a09,#1c1917,#1a1512)] py-16 text-white sm:py-20">
      <div className="container">
        {heading || intro ? (
          <div className="max-w-3xl">
            {heading ? (
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h2>
            ) : null}
            {intro ? <p className="mt-3 text-base leading-7 text-stone-300">{intro}</p> : null}
          </div>
        ) : null}

        <div className={cn('mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2', gridColsClass)}>
          {(cards || []).map((card, index) => {
            const isClosed = card.status === 'closed'
            const TypeIcon = card.type ? TYPE_ICONS[card.type] : MapPin
            const metaParts = [card.location, card.driveTime, card.type ? TYPE_LABELS[card.type] : null].filter(
              Boolean,
            )

            return (
              <article
                className={cn(
                  'relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/6 backdrop-blur-sm transition',
                  isClosed && 'opacity-60',
                )}
                key={card.id || index}
              >
                {isClosed ? (
                  <span className="absolute right-3 top-3 z-10 rounded-full border border-white/20 bg-stone-900/90 px-2.5 py-1 text-xs font-semibold text-amber-200">
                    Closed
                  </span>
                ) : null}

                <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-stone-800">
                  {card.image ? (
                    <Media
                      fill
                      imgClassName="h-full w-full rounded-none border-0 object-cover"
                      resource={card.image}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <TypeIcon className="h-10 w-10 text-stone-500" />
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold tracking-tight">{card.name}</h3>

                  {metaParts.length > 0 ? (
                    <p className="mt-1.5 text-sm text-stone-400">{metaParts.join(' · ')}</p>
                  ) : null}

                  {isClosed && card.statusNote ? (
                    <p className="mt-2 text-sm text-amber-200">{card.statusNote}</p>
                  ) : null}

                  {card.bestFor && card.bestFor.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {card.bestFor.map((item, tagIndex) => (
                        <span
                          className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-stone-200"
                          key={item.id || tagIndex}
                        >
                          {item.tag}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {card.description ? (
                    <p className="mt-3 text-sm leading-6 text-stone-300">{card.description}</p>
                  ) : null}

                  {card.nearby || card.tip ? (
                    <div className="mt-3 space-y-1 text-xs text-stone-400">
                      {card.nearby ? <p>Nearby: {card.nearby}</p> : null}
                      {card.tip ? <p>Tip: {card.tip}</p> : null}
                    </div>
                  ) : null}

                  <div className="flex-1" />

                  {card.links && card.links.length > 0 ? (
                    <div className="mt-5 flex flex-wrap gap-4 border-t border-white/10 pt-4">
                      {card.links.map((link, linkIndex) => (
                        <a
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300 transition hover:text-amber-200"
                          href={link.url}
                          key={link.id || linkIndex}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {link.label}
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
