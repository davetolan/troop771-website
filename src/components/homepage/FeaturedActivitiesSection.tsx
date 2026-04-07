import { Fish, Mountain, Sailboat, Trees } from 'lucide-react'

import { SectionHeading } from './SectionHeading'
import { featuredActivities } from './constants'

const activityIcons = [Fish, Trees, Mountain, Sailboat] as const
const activityGradients = [
  'from-amber-200/80 via-emerald-100 to-white',
  'from-emerald-200/70 via-lime-50 to-white',
  'from-sky-200/70 via-slate-50 to-white',
  'from-cyan-200/80 via-sky-50 to-white',
] as const

export function FeaturedActivitiesSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
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

            return (
              <article
                className={`overflow-hidden rounded-[1.75rem] border border-slate-200 bg-gradient-to-br ${activityGradients[index]} p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.5)]`}
                key={activity.name}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                      Activity
                    </p>
                    <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
                      {activity.name}
                    </h3>
                  </div>
                  <div className="rounded-2xl bg-white/70 p-3 text-slate-900 ring-1 ring-white/70 backdrop-blur">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>
                <p className="mt-10 max-w-xs text-sm leading-7 text-slate-700">{activity.detail}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
