import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { ArrowRight, Backpack, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import { Media } from '@/components/Media'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function GearIndexPage() {
  const payload = await getPayload({ config: configPromise })

  const gearPages = await payload.find({
    collection: 'gear-pages',
    depth: 1,
    draft: false,
    limit: 100,
    overrideAccess: false,
    pagination: false,
    sort: 'title',
    where: {
      _status: {
        equals: 'published',
      },
    },
    select: {
      title: true,
      slug: true,
      intro: true,
      heroImage: true,
    },
  })

  return (
    <main className="bg-stone-50 pt-24 pb-24 text-stone-950">
      <div className="container">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-[#4f5d3a]">
            <Backpack className="h-4 w-4" aria-hidden="true" />
            Gear Guides
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            Gear lists for Troop 771 adventures
          </h1>
          <p className="mt-5 text-lg leading-8 text-stone-700">
            Find the right packing list for a new Scout, summer camp, high adventure, or the next
            trip on the calendar.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {gearPages.docs.map((gearPage) => (
            <article
              className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-[0_18px_60px_-46px_rgba(41,37,36,0.45)]"
              key={gearPage.id}
            >
              <div className="relative aspect-[16/9] bg-stone-200">
                {gearPage.heroImage && typeof gearPage.heroImage === 'object' ? (
                  <Media
                    fill
                    imgClassName="object-cover"
                    priority={false}
                    resource={gearPage.heroImage}
                    size="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[#4f5d3a]">
                    <Backpack className="h-12 w-12" aria-hidden="true" />
                  </div>
                )}
              </div>
              <div className="p-5">
                <h2 className="text-xl font-semibold text-stone-950">{gearPage.title}</h2>
                {gearPage.intro ? (
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-stone-700">
                    {gearPage.intro}
                  </p>
                ) : null}
                <Link
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#4f5d3a] transition hover:text-stone-950"
                  href={`/gear/${gearPage.slug}`}
                >
                  View list
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {gearPages.docs.length === 0 ? (
          <div className="mt-12 rounded-lg border border-stone-200 bg-white p-8 text-stone-700">
            <ExternalLink className="h-6 w-6 text-[#4f5d3a]" aria-hidden="true" />
            <p className="mt-4 text-lg font-semibold text-stone-950">No gear guides are published yet.</p>
            <p className="mt-2 text-sm leading-6">Check back after the first gear page is published.</p>
          </div>
        ) : null}
      </div>
    </main>
  )
}

export function generateMetadata(): Metadata {
  return {
    description: 'Troop 771 gear guides and packing lists for Scouts and families.',
    title: 'Troop 771 Gear Guides',
  }
}
