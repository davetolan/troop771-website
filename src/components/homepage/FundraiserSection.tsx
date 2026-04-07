import Link from 'next/link'
import { ArrowRight, Sprout } from 'lucide-react'

export function FundraiserSection() {
  return (
    <section className="bg-white py-20 sm:py-24" id="fundraiser">
      <div className="container">
        <div className="grid gap-6 rounded-[2rem] bg-[linear-gradient(135deg,#16331f,#21462a,#2e5f2b)] p-8 text-white shadow-[0_24px_90px_-50px_rgba(22,51,31,0.9)] sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-emerald-100">
              <Sprout className="h-4 w-4" aria-hidden="true" />
              Spring fundraiser
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              Spring Mulch Sale
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-emerald-50/90 sm:text-lg">
              We sell mulch, potting soil, and compost in early spring. Scouts can earn their own
              dues and even help pay for summer camp.
            </p>
          </div>

          <div>
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
              href="/fundraisers"
            >
              Support the Troop
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
