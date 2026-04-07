import { Compass, HeartHandshake, Mountain, TentTree } from 'lucide-react'

import { SectionHeading } from './SectionHeading'
import { highlights } from './constants'

const highlightIcons = [Mountain, TentTree, Compass, HeartHandshake] as const

export function HighlightsSection() {
  return (
    <section
      aria-labelledby="activities-heading"
      className="bg-[linear-gradient(to_bottom,rgba(248,250,252,1),rgba(240,253,244,0.45))] py-20 sm:py-24"
      id="activities"
    >
      <div className="container">
        <SectionHeading
          id="activities-heading"
          eyebrow="What Scouts Experience"
          title="A program built for adventure, growth, and practical confidence"
          description="Parents can quickly see what makes Troop 771 active, purposeful, and worth joining."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {highlights.map((highlight, index) => {
            const Icon = highlightIcons[index]

            return (
              <article
                className="group rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.5)] transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_24px_80px_-38px_rgba(21,128,61,0.35)]"
                key={highlight.title}
              >
                <div className="inline-flex rounded-2xl bg-emerald-50 p-3 text-emerald-700 ring-1 ring-emerald-100">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-950">
                  {highlight.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{highlight.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
