import Image from 'next/image'
import { Compass, HeartHandshake, Mountain, TentTree } from 'lucide-react'

import { SectionHeading } from './SectionHeading'
import { highlights } from './constants'

const highlightIcons = [Mountain, TentTree, Compass, HeartHandshake] as const

export function HighlightsSection() {
  return (
    <section
      aria-labelledby="activities-heading"
      className="bg-[linear-gradient(to_bottom,rgba(250,250,249,1),rgba(245,245,244,1),rgba(240,237,228,0.78))] py-20 sm:py-24"
      id="activities"
    >
      <div className="container">
        <SectionHeading
          id="activities-heading"
          eyebrow="What Scouts Experience"
          title="A program built for adventure, growth, and practical confidence"
          description="See what makes Troop 771 active, purposeful, and worth joining."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {highlights.map((highlight, index) => {
            const Icon = highlightIcons[index]
            const isHighAdventureCard = highlight.title === 'High Adventure'
            const isOutdoorSkillsCard = highlight.title === 'Outdoor Skills'
            const isLeadershipCard = highlight.title === 'Leadership Development'
            const isServiceCard = highlight.title === 'Service & Character'

            return (
              <article
                className="group rounded-[1.75rem] border border-stone-200 bg-stone-50 p-6 shadow-[0_20px_60px_-40px_rgba(41,37,36,0.35)] transition hover:-translate-y-1 hover:border-[#7a755d]/40 hover:bg-white hover:shadow-[0_24px_80px_-42px_rgba(68,64,60,0.4)]"
                key={highlight.title}
              >
                {isHighAdventureCard || isOutdoorSkillsCard || isLeadershipCard || isServiceCard ? (
                  <div className="relative -m-6 mb-6 min-h-[12rem] overflow-hidden border-b border-stone-200">
                    <Image
                      alt={
                        isHighAdventureCard
                          ? 'Scouts on a high-adventure outing'
                          : isOutdoorSkillsCard
                            ? 'Scouts practicing outdoor skills during a troop activity'
                            : isLeadershipCard
                              ? 'Scouts leading during a troop activity'
                              : 'Scouts serving together during a troop service project'
                      }
                      className="object-cover"
                      fill
                      sizes="(max-width: 1280px) 50vw, 25vw"
                      src={
                        isHighAdventureCard
                          ? '/high-adventure.JPG'
                          : isOutdoorSkillsCard
                            ? '/outdoor.JPG'
                            : isLeadershipCard
                              ? '/leadership.JPG'
                              : '/service.JPG'
                      }
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,25,23,0.68),rgba(28,25,23,0.12),transparent)]" />
                  </div>
                ) : null}

                <div className="inline-flex rounded-2xl bg-[#ece6d9] p-3 text-[#4f5d3a] ring-1 ring-stone-300">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-stone-950">
                  {highlight.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-stone-700">{highlight.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
