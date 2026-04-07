import { ArrowUpRight, BadgeCheck, Compass, Shield, Stars, Tent } from 'lucide-react'

import { SectionHeading } from './SectionHeading'
import { whyJoinPoints } from './constants'

const icons = [Compass, ArrowUpRight, Tent, Shield, BadgeCheck] as const

export function WhyJoinSection() {
  return (
    <section
      aria-labelledby="why-join-heading"
      className="bg-slate-950 py-20 text-white sm:py-24"
      id="why-join"
    >
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <SectionHeading
              id="why-join-heading"
              eyebrow="Why Join Troop 771"
              title="A strong fit for families looking for growth, challenge, and purpose"
              description="Troop 771 is built to help scouts lead, serve, and become capable young men through consistent outdoor experience."
            />

            <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/6 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 text-emerald-200">
                <Stars className="h-5 w-5" aria-hidden="true" />
                <p className="text-sm font-semibold uppercase tracking-[0.22em]">
                  What parents often value most
                </p>
              </div>
              <p className="mt-4 text-base leading-7 text-slate-200">
                A credible troop should offer more than good intentions. It should create repeated
                opportunities for responsibility, challenge, and practical learning in a safe,
                structured environment.
              </p>
            </div>
          </div>

          <div className="grid gap-5">
            {whyJoinPoints.map((point, index) => {
              const Icon = icons[index]

              return (
                <article
                  className="rounded-[1.75rem] border border-white/10 bg-white/6 p-6 shadow-[0_24px_80px_-50px_rgba(0,0,0,0.8)] backdrop-blur-sm"
                  key={point.title}
                >
                  <div className="flex gap-4">
                    <div className="mt-1 rounded-2xl bg-emerald-400/10 p-3 text-emerald-300 ring-1 ring-emerald-300/20">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-white">{point.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{point.description}</p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
