import Link from 'next/link'
import {
  Anchor,
  Compass,
  Mountain,
  ShieldCheck,
  TentTree,
  Trees,
  Waves,
} from 'lucide-react'

import { registrationUrl } from './constants'

const heroStats = [
  { label: 'Boy-led program', icon: Compass },
  { label: 'High adventure focus', icon: Mountain },
  { label: 'Outdoor skills for life', icon: TentTree },
] as const

const badgeIcons = [Trees, Waves, Anchor, ShieldCheck] as const

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(74,222,128,0.18),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.16),transparent_30%),linear-gradient(135deg,rgba(2,6,23,0.96),rgba(15,23,42,0.9),rgba(20,83,45,0.82))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,rgba(2,6,23,0.95),transparent)]" />
        <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <div className="container relative py-10 sm:py-14 lg:py-18">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-end">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white/85 backdrop-blur">
              <span className="font-semibold uppercase tracking-[0.22em] text-emerald-200">Troop 771</span>
              <span className="h-1 w-1 rounded-full bg-white/40" />
              <span>Argyle, TX</span>
              <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:block" />
              <span className="hidden text-white/70 sm:inline">Scouting Ministry 771</span>
            </div>

            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Adventure, Leadership, and Skills for Life
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              Our boy-led troop emphasizes high adventure, hands-on learning, and real leadership
              experience. Scouts develop confidence, self-reliance, and practical outdoor skills
              through activities like camping, climbing, sailing, and more.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
                href={registrationUrl}
                rel="noreferrer"
                target="_blank"
              >
                Join the Troop
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/8 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/14 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                href="#why-join"
              >
                Learn More
              </Link>
            </div>

            <ul className="mt-10 grid gap-3 sm:grid-cols-3">
              {heroStats.map(({ label, icon: Icon }) => (
                <li
                  className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-slate-100 backdrop-blur-sm"
                  key={label}
                >
                  <Icon className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/12 via-white/6 to-transparent blur-xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/8 p-6 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between text-sm text-white/70">
                <span className="font-medium uppercase tracking-[0.22em] text-emerald-200">
                  Life in the troop
                </span>
                <span>Boy-led. Active. Prepared.</span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {badgeIcons.map((Icon, index) => (
                  <div
                    className="rounded-2xl border border-white/10 bg-slate-900/45 p-5"
                    key={index}
                  >
                    <Icon className="h-7 w-7 text-emerald-300" aria-hidden="true" />
                    <p className="mt-4 text-lg font-semibold text-white">
                      {['Camp ready', 'Trail tested', 'Water confident', 'Character centered'][index]}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {
                        [
                          'Weekend campouts and outdoor practice build steady confidence over time.',
                          'Scouts learn to navigate challenge, weather, and teamwork with purpose.',
                          'Adventures like sailing and rafting expand comfort zones in the right way.',
                          'Service, responsibility, and leadership remain at the center of the program.',
                        ][index]
                      }
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-5 py-4 text-sm leading-6 text-emerald-50">
                High-adventure experiences are paired with practical preparation, leadership
                responsibility, and a strong culture of teamwork.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
