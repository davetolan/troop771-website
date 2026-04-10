import Link from 'next/link'
import { ArrowRight, FileText, MapPinned, MessageSquareMore, Sprout } from 'lucide-react'

import { registrationUrl, resources, upcomingHighlights } from './constants'

export function JoinSection() {
  return (
    <section className="bg-[linear-gradient(to_bottom,rgba(255,255,255,1),rgba(250,250,249,1))] py-20 sm:py-24" id="join">
      <div className="container">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.8fr)]">
          <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-[0_24px_90px_-55px_rgba(41,37,36,0.32)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#4f5d3a]">
              How to Join
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-stone-700 sm:text-lg">
              Ready to get started? Register online and come see what Troop 771 is all about.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3b3128] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4a3d31] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4a3d31]"
                href={registrationUrl}
                rel="noreferrer"
                target="_blank"
              >
                Register Online
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-400 hover:bg-stone-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-500"
                href="/contact"
              >
                Contact Us
                <MessageSquareMore className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-[#d9cfbe] bg-[#f4efe4] p-8 sm:p-10">
            <div className="inline-flex rounded-2xl bg-white p-3 text-[#4f5d3a] ring-1 ring-[#e7dfd1]">
              <MapPinned className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight text-stone-950">
              Meeting area
            </h3>
            <p className="mt-4 text-base leading-8 text-stone-700">
              We meet in the Dunham Road area near the Cross Timbers Trailhead.
            </p>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              For public safety and privacy, exact addresses and detailed logistics are shared
              directly with interested families.
            </p>
          </aside>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_16px_50px_-42px_rgba(41,37,36,0.25)]">
            <div className="inline-flex rounded-2xl bg-[#ece6d9] p-3 text-[#4f5d3a]">
              <Sprout className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-xl font-semibold tracking-tight text-stone-950">
              Spring Mulch Sale
            </h3>
            <p className="mt-3 text-sm leading-7 text-stone-700">
              Mulch, potting soil, and compost in early spring help scouts earn dues and offset camp costs.
            </p>
            <Link
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#4f5d3a] transition hover:text-stone-950"
              href="/fundraisers"
            >
              Support the Troop
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_16px_50px_-42px_rgba(41,37,36,0.25)]">
            <div className="inline-flex rounded-2xl bg-[#ece6d9] p-3 text-[#4f5d3a]">
              <FileText className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-xl font-semibold tracking-tight text-stone-950">
              Public Resources
            </h3>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-stone-700">
              {resources.slice(0, 3).map((resource) => (
                <li key={resource.title}>{resource.title}</li>
              ))}
            </ul>
            <Link
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#4f5d3a] transition hover:text-stone-950"
              href="/resources"
            >
              View Resources
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="rounded-[1.75rem] border border-stone-200 bg-[#f6f1e8] p-6 shadow-[0_16px_50px_-42px_rgba(41,37,36,0.22)]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#4f5d3a]">
              Upcoming
            </p>
            <ul className="mt-4 space-y-4">
              {upcomingHighlights.map((item) => (
                <li className="border-b border-stone-300/70 pb-4 last:border-b-0 last:pb-0" key={`${item.month}-${item.activity}`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                    {item.month}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-stone-950">{item.activity}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
