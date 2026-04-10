import Image from 'next/image'
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
    <section className="relative overflow-hidden bg-stone-950 text-white">
      <div className="absolute inset-0">
        <Image
          alt=""
          aria-hidden="true"
          className="object-cover object-center opacity-30"
          fill
          priority
          sizes="100vw"
          src="/Climbing2.JPG"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,113,108,0.18),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(180,138,69,0.14),transparent_28%),linear-gradient(135deg,rgba(28,25,23,0.98),rgba(41,37,36,0.94),rgba(31,58,44,0.88))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,rgba(28,25,23,0.96),transparent)]" />
        <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-lime-300/6 blur-3xl" />
        <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-amber-500/8 blur-3xl" />
      </div>

      <div className="container relative py-10 sm:py-14 lg:py-18">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-end">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white/85 backdrop-blur">
              <span className="font-semibold uppercase tracking-[0.22em] text-stone-200">Troop 771</span>
              <span className="h-1 w-1 rounded-full bg-white/40" />
              <span>Argyle, TX</span>
              <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:block" />
              <span className="hidden text-white/70 sm:inline">Scouting Ministry 771</span>
            </div>

            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Adventure, Leadership, and Skills for Life
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-200 sm:text-xl">
              Our boy-led troop emphasizes high adventure, hands-on learning, and real leadership
              experience. Scouts develop confidence, self-reliance, and practical outdoor skills
              through activities like camping, climbing, sailing, and more.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                className="inline-flex items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
                href={registrationUrl}
                rel="noreferrer"
                target="_blank"
              >
                Join the Troop
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/8 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/14 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                href="/why-join"
              >
                Learn More
              </Link>
            </div>

            <ul className="mt-10 grid gap-3 sm:grid-cols-3">
              {heroStats.map(({ label, icon: Icon }) => (
                <li
                  className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-stone-100 backdrop-blur-sm"
                  key={label}
                >
                  <Icon className="h-5 w-5 text-amber-200" aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/12 via-white/6 to-transparent blur-xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-stone-900/35 p-6 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between text-sm text-white/70">
                <span className="font-medium uppercase tracking-[0.22em] text-stone-200">
                  Life in the troop
                </span>
                <span>Boy-led. Active. Prepared.</span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="relative min-h-[15rem] overflow-hidden rounded-2xl border border-white/10 sm:col-span-2">
                  <Image
                    alt="Scouts climbing during a troop outdoor activity"
                    className="object-cover"
                    fill
                    sizes="(max-width: 1024px) 100vw, 32rem"
                    src="/Climbing.JPG"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,25,23,0.78),rgba(28,25,23,0.18),transparent)]" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-200">
                      Troop in action
                    </p>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-stone-100">
                      Real outdoor experience is a visible part of the program, from climbing and
                      campouts to water-based adventure.
                    </p>
                  </div>
                </div>

                <div className="relative min-h-[13rem] overflow-hidden rounded-2xl border border-white/10">
                  <Image
                    alt="Trail view from a troop hiking outing"
                    className="object-cover"
                    fill
                    sizes="(max-width: 1024px) 100vw, 16rem"
                    src="/Trail.JPG"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,25,23,0.82),rgba(28,25,23,0.18),transparent)]" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-lg font-semibold text-white">Trail tested</p>
                    <p className="mt-2 text-sm leading-6 text-stone-100">
                      Scouts learn to navigate challenge, weather, and teamwork with purpose.
                    </p>
                  </div>
                </div>

                <div className="relative min-h-[13rem] overflow-hidden rounded-2xl border border-white/10">
                  <Image
                    alt="Scouts on the water during a troop outing"
                    className="object-cover"
                    fill
                    sizes="(max-width: 1024px) 100vw, 16rem"
                    src="/OnTheWater.JPG"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,25,23,0.82),rgba(28,25,23,0.18),transparent)]" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-lg font-semibold text-white">Water confident</p>
                    <p className="mt-2 text-sm leading-6 text-stone-100">
                      Adventures like sailing and rafting expand comfort zones in the right way.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-amber-200/15 bg-amber-200/10 px-5 py-4 text-sm leading-6 text-stone-100">
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
