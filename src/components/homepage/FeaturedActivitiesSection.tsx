import Image from 'next/image'
import { Fish, Mountain, Waves, Trees } from 'lucide-react'

import { SectionHeading } from './SectionHeading'
import { featuredActivities } from './constants'

const activityIcons = [Fish, Trees, Mountain, Waves] as const
const activityGradients = [
  'from-amber-100 via-stone-50 to-white',
  'from-lime-100/70 via-stone-50 to-white',
  'from-stone-200/80 via-stone-50 to-white',
  'from-teal-100/60 via-stone-50 to-white',
] as const

export function FeaturedActivitiesSection() {
  return (
    <section className="bg-[linear-gradient(to_bottom,rgba(255,255,255,1),rgba(250,250,249,1))] py-20 sm:py-24">
      <div className="container">
        <SectionHeading
          align="center"
          eyebrow="Featured Activities"
          title="A troop experience that stays active and varied"
          description="Scouts do more than sit through meetings. They learn by doing, outdoors and together."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featuredActivities.map((activity, index) => {
            const Icon = activityIcons[index]
            const isFishingCard = activity.name === 'Fishing'
            const isHikingCard = activity.name === 'Hiking'
            const isClimbingCard = activity.name === 'Climbing'
            const isRaftingCard = activity.name === 'Rafting'

            return (
              <article
                className={`overflow-hidden rounded-[1.75rem] border border-stone-200 bg-gradient-to-br ${activityGradients[index]} p-6 shadow-[0_20px_60px_-40px_rgba(41,37,36,0.28)]`}
                key={activity.name}
              >
                {isFishingCard || isHikingCard || isClimbingCard || isRaftingCard ? (
                  <div className="relative -m-6 mb-6 min-h-[12rem] overflow-hidden border-b border-stone-200">
                    <Image
                      alt={
                        isFishingCard
                          ? 'Scouts fishing during a troop activity'
                          : isHikingCard
                          ? 'Scouts hiking during a troop activity'
                          : isClimbingCard
                            ? 'Scouts climbing during a troop activity'
                            : 'Scouts rafting during a troop activity'
                      }
                      className="object-cover"
                      fill
                      sizes="(max-width: 1280px) 50vw, 25vw"
                      src={
                        isFishingCard
                          ? '/fishing.JPG'
                          : isHikingCard
                          ? '/hiking.JPG'
                          : isClimbingCard
                            ? '/Climbing3.JPG'
                            : '/rafting.jpg'
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
