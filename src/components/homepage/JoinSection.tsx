import Link from 'next/link'
import { ArrowRight, MapPinned, MessageSquareMore } from 'lucide-react'

import { registrationUrl } from './constants'

export function JoinSection() {
  return (
    <section className="bg-[linear-gradient(to_bottom,rgba(255,255,255,1),rgba(248,250,252,1))] py-20 sm:py-24" id="join">
      <div className="container">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.8fr)]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_90px_-55px_rgba(15,23,42,0.5)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">
              How to Join
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Ready to get started? Register online and come see what Troop 771 is all about.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-800"
                href={registrationUrl}
                rel="noreferrer"
                target="_blank"
              >
                Register Online
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
                href="/contact"
              >
                Contact Us
                <MessageSquareMore className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-8 sm:p-10">
            <div className="inline-flex rounded-2xl bg-white p-3 text-emerald-800 ring-1 ring-emerald-100">
              <MapPinned className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950">
              Meeting area
            </h3>
            <p className="mt-4 text-base leading-8 text-slate-700">
              We meet in the Dunham Road area near the Cross Timbers Trailhead.
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              For public safety and privacy, exact addresses and detailed logistics are shared
              directly with interested families.
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}
