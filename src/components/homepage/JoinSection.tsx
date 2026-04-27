import Link from 'next/link'
import { MapPinned, MessageSquareMore } from 'lucide-react'

import { getCachedUpcomingActivities } from '@/utilities/getUpcomingActivities'

export async function JoinSection() {
  const upcomingActivities = await getCachedUpcomingActivities()
  const upcomingItems = upcomingActivities.slice(0, 2)

  return (
    <section className="bg-[linear-gradient(to_bottom,rgba(255,255,255,1),rgba(250,250,249,1))] py-20 sm:py-24" id="join">
      <div className="container">
        <div className="grid gap-6 lg:grid-cols-[minmax(280px,0.8fr)_minmax(240px,0.6fr)] lg:items-start">
          <aside className="rounded-[2rem] border border-[#d9cfbe] bg-[#f4efe4] p-8 sm:p-10">
            <div className="inline-flex rounded-2xl bg-white p-3 text-[#4f5d3a] ring-1 ring-[#e7dfd1]">
              <MapPinned className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight text-stone-950">
              Meeting area
            </h3>
            <p className="mt-4 text-base leading-8 text-stone-700">
              We meet on most Tuesday nights during the school year in the Dunham Road area near
              the Cross Timbers Trailhead.
            </p>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              Contact us before your visit so we can confirm that we are meeting that week and
              share the latest date, time, and location details.
            </p>
            <Link
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-400 hover:bg-stone-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-500"
              href="/contact"
            >
              Contact Us
              <MessageSquareMore className="h-4 w-4" aria-hidden="true" />
            </Link>
          </aside>

          <div className="rounded-[1.75rem] border border-stone-200 bg-[#f6f1e8] p-6 shadow-[0_16px_50px_-42px_rgba(41,37,36,0.22)]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#4f5d3a]">
              Upcoming
            </p>
            {upcomingItems.length > 0 ? (
              <ul className="mt-4 space-y-4">
                {upcomingItems.map((item) => (
                  <li className="border-b border-stone-300/70 pb-4 last:border-b-0 last:pb-0" key={`${item.month}-${item.year}-${item.activity}`}>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                      {item.month} {item.year}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-stone-950">{item.activity}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm leading-7 text-stone-700">
                Upcoming activities will appear here as they are added in Payload.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
