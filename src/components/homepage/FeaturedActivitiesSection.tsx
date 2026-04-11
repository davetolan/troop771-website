'use client'

import Image from 'next/image'
import { ArrowLeft, ArrowRight, Fish, Mountain, ShipWheel, Trees, Waves, WavesLadder } from 'lucide-react'
import { useRef } from 'react'

import { SectionHeading } from './SectionHeading'
import { featuredActivities } from './constants'

const activityIcons = [Fish, Trees, Mountain, Waves, WavesLadder, ShipWheel] as const
const activityGradients = [
  'from-amber-100 via-stone-50 to-white',
  'from-lime-100/70 via-stone-50 to-white',
  'from-stone-200/80 via-stone-50 to-white',
  'from-teal-100/60 via-stone-50 to-white',
  'from-stone-100 via-amber-50 to-white',
  'from-sky-100/70 via-stone-50 to-white',
] as const

export function FeaturedActivitiesSection() {
  const trackRef = useRef<HTMLDivElement | null>(null)

  const scrollByCard = (direction: 'next' | 'prev') => {
    const track = trackRef.current

    if (!track) return

    const firstCard = track.querySelector<HTMLElement>('[data-activity-card]')
    const cardWidth = firstCard?.offsetWidth ?? Math.round(track.clientWidth * 0.85)
    const gap = 20
    const offset = cardWidth + gap

    track.scrollBy({
      behavior: 'smooth',
      left: direction === 'next' ? offset : -offset,
    })
  }

  return (
    <section
      className="bg-[linear-gradient(to_bottom,rgba(255,255,255,1),rgba(250,250,249,1))] py-20 sm:py-24"
      id="activities"
    >
      <div className="container">
        <SectionHeading
          align="center"
          eyebrow="Featured Activities"
          title="A troop experience that stays active and varied"
          description="Scouts do more than sit through meetings. They learn by doing, outdoors and together."
        />

        <div className="mt-12 flex items-center justify-end gap-3">
          <button
            aria-label="Scroll featured activities left"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-700 shadow-sm transition hover:border-stone-400 hover:bg-stone-50"
            onClick={() => scrollByCard('prev')}
            type="button"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            aria-label="Scroll featured activities right"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-700 shadow-sm transition hover:border-stone-400 hover:bg-stone-50"
            onClick={() => scrollByCard('next')}
            type="button"
          >
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div
          className="-mx-4 mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          ref={trackRef}
        >
          {featuredActivities.map((activity, index) => {
            const Icon = activityIcons[index]
            const isFishingCard = activity.name === 'Fishing'
            const isHikingCard = activity.name === 'Hiking'
            const isClimbingCard = activity.name === 'Climbing'
            const isRaftingCard = activity.name === 'Rafting'
            const isCavingCard = activity.name === 'Caving'
            const isCanoeingCard = activity.name === 'Canoeing'

            return (
              <article
                className={`min-w-[85%] snap-start overflow-hidden rounded-[1.75rem] border border-stone-200 bg-gradient-to-br ${activityGradients[index]} p-6 shadow-[0_20px_60px_-40px_rgba(41,37,36,0.28)] sm:min-w-[22rem] lg:min-w-[24rem]`}
                data-activity-card
                key={activity.name}
              >
                {isFishingCard || isHikingCard || isClimbingCard || isRaftingCard || isCavingCard || isCanoeingCard ? (
                  <div className="relative -m-6 mb-6 min-h-[12rem] overflow-hidden border-b border-stone-200">
                    <Image
                      alt={
                        isFishingCard
                          ? 'Scouts fishing during a troop activity'
                          : isHikingCard
                          ? 'Scouts hiking during a troop activity'
                          : isClimbingCard
                            ? 'Scouts climbing during a troop activity'
                            : isRaftingCard
                              ? 'Scouts rafting during a troop activity'
                              : isCavingCard
                                ? 'Scouts in a cave during a troop activity'
                                : 'Scouts canoeing during a troop activity'
                      }
                      className="object-cover"
                      fill
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 22rem, 24rem"
                      src={
                        isFishingCard
                          ? '/fishing.JPG'
                          : isHikingCard
                          ? '/hiking.JPG'
                          : isClimbingCard
                            ? '/Climbing3.JPG'
                            : isRaftingCard
                              ? '/rafting.jpg'
                              : isCavingCard
                                ? '/Caving.jpg'
                                : '/canoeing2.JPG'
                      }
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,25,23,0.72),rgba(28,25,23,0.12),transparent)]" />
                  </div>
                ) : null}

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">
                      Activity
                    </p>
                    <h3 className="mt-4 text-2xl font-semibold tracking-tight text-stone-950">
                      {activity.name}
                    </h3>
                  </div>
                  <div className="rounded-2xl bg-white/80 p-3 text-stone-900 ring-1 ring-stone-200 backdrop-blur">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>
                <p className="mt-10 max-w-xs text-sm leading-7 text-stone-700">{activity.detail}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
