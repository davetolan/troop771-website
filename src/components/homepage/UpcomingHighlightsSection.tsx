import { CalendarRange } from 'lucide-react'

import { SectionHeading } from './SectionHeading'
import { upcomingHighlights } from './constants'

export function UpcomingHighlightsSection() {
  return (
    <section className="bg-stone-100/80 py-20 sm:py-24">
      <div className="container">
        <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.35)] sm:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Upcoming Highlights"
              title="A simple preview of what’s ahead"
              description="This is a high-level snapshot of upcoming activities, without detailed dates, times, or locations."
            />

            <div className="inline-flex items-center gap-3 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800">
              <CalendarRange className="h-4 w-4" aria-hidden="true" />
              Public calendar preview
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {upcomingHighlights.map((item) => (
              <article
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-6"
                key={`${item.month}-${item.activity}`}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                  {item.month}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                  {item.activity}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
