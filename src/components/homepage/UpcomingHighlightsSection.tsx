import { CalendarRange } from 'lucide-react'

import { SectionHeading } from './SectionHeading'
import { upcomingHighlights } from './constants'

export function UpcomingHighlightsSection() {
  return (
    <section className="bg-[linear-gradient(to_bottom,rgba(245,245,244,1),rgba(239,235,224,0.7))] py-20 sm:py-24">
      <div className="container">
        <div className="rounded-[2rem] border border-stone-200 bg-[#fcfbf8] p-8 shadow-[0_20px_60px_-40px_rgba(41,37,36,0.3)] sm:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Upcoming Highlights"
              title="A simple preview of what’s ahead"
              description="This is a high-level snapshot of upcoming activities, without detailed dates, times, or locations."
            />

            <div className="inline-flex items-center gap-3 rounded-full bg-[#ece6d9] px-4 py-2 text-sm font-medium text-[#4f5d3a]">
              <CalendarRange className="h-4 w-4" aria-hidden="true" />
              Public calendar preview
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {upcomingHighlights.map((item) => (
              <article
                className="rounded-[1.5rem] border border-stone-200 bg-stone-100/70 px-5 py-6"
                key={`${item.month}-${item.activity}`}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">
                  {item.month}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-stone-950">
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
