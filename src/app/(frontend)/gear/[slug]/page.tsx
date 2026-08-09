import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { Media } from '@/components/Media'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { generateMeta } from '@/utilities/generateMeta'
import configPromise from '@payload-config'
import {
  ArrowLeft,
  Backpack,
  CookingPot,
  Cross,
  ExternalLink,
  Footprints,
  GlassWater,
  Map,
  Shirt,
  ShoppingBag,
  Tent,
} from 'lucide-react'
import Link from 'next/link'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import React, { cache } from 'react'

import type { GearItem } from '@/payload-types'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const gearPages = await payload.find({
    collection: 'gear-pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return gearPages.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

const statusLabels = {
  optional: 'Optional',
  recommended: 'Recommended',
  required: 'Required',
} as const

const fallbackGearIcons = {
  clothing: {
    Icon: Shirt,
    label: 'Clothing',
  },
  'cooking-food': {
    Icon: CookingPot,
    label: 'Cooking and food',
  },
  footwear: {
    Icon: Footprints,
    label: 'Footwear',
  },
  general: {
    Icon: ShoppingBag,
    label: 'General gear',
  },
  'health-first-aid': {
    Icon: Cross,
    label: 'Health and first aid',
  },
  'navigation-safety': {
    Icon: Map,
    label: 'Navigation and safety',
  },
  optional: {
    Icon: ShoppingBag,
    label: 'Optional gear',
  },
  'packs-bags': {
    Icon: Backpack,
    label: 'Packs and bags',
  },
  'sleeping-gear': {
    Icon: Tent,
    label: 'Sleeping gear',
  },
  water: {
    Icon: GlassWater,
    label: 'Water gear',
  },
} as const

export default async function GearPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = `/gear/${decodedSlug}`
  const gearPage = await queryGearPageBySlug({ slug: decodedSlug })

  if (!gearPage) return <PayloadRedirects url={url} />

  const disclosure = gearPage.disclosure
  const showDisclosure = Boolean(disclosure?.showDisclosure)
  const disclosureText = disclosure?.disclosureText
  const externalRel = showDisclosure ? 'noopener noreferrer sponsored' : 'noopener noreferrer'

  return (
    <main className="bg-stone-50 text-stone-950">
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      <section className="relative isolate overflow-hidden bg-stone-950 text-white">
        <div className="absolute inset-0">
          {gearPage.heroImage && typeof gearPage.heroImage === 'object' ? (
            <Media
              fill
              imgClassName="object-cover opacity-55"
              priority
              resource={gearPage.heroImage}
              size="100vw"
            />
          ) : (
            <div className="h-full bg-[linear-gradient(120deg,#1c1917,#4f5d3a)]" />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(12,10,9,0.86),rgba(28,25,23,0.68)_58%,rgba(79,93,58,0.42))]" />
        </div>

        <div className="container relative py-16 sm:py-20">
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-stone-200 transition hover:text-white"
            href="/gear"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Gear guides
          </Link>
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-amber-200">
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              Troop 771 Gear
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              {gearPage.title}
            </h1>
            {gearPage.intro ? (
              <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-200">{gearPage.intro}</p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container">
          {showDisclosure && disclosureText ? (
            <div className="mb-8 rounded-lg border border-amber-300/50 bg-amber-50 p-4 text-sm leading-6 text-stone-800">
              {disclosureText}
            </div>
          ) : null}

          <div className="grid gap-8">
            {gearPage.sections?.map((section) => (
              <section
                className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-[0_20px_65px_-52px_rgba(41,37,36,0.45)]"
                key={section.id}
              >
                <div className="border-b border-stone-200 bg-stone-950 px-5 py-5 text-white sm:px-6">
                  <h2 className="text-2xl font-semibold">{section.title}</h2>
                  {section.description ? (
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-300">
                      {section.description}
                    </p>
                  ) : null}
                </div>

                <div className="divide-y divide-stone-200">
                  {section.items?.map((sectionItem) => {
                    const item = sectionItem.item

                    if (!item || typeof item !== 'object') return null

                    return (
                      <GearListItem
                        externalRel={externalRel}
                        item={item}
                        key={sectionItem.id}
                        note={sectionItem.note}
                        quantity={sectionItem.quantity}
                        hideVendorLinks={Boolean(sectionItem.hideVendorLinks)}
                        status={sectionItem.status}
                      />
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function GearListItem({
  externalRel,
  hideVendorLinks,
  item,
  note,
  quantity,
  status,
}: {
  externalRel: string
  hideVendorLinks: boolean
  item: GearItem
  note?: string | null
  quantity?: string | null
  status?: 'optional' | 'recommended' | 'required' | null
}) {
  const hasVendorLinks = !hideVendorLinks && (item.amazonUrl || item.reiUrl)
  const fallbackIcon = fallbackGearIcons[item.category ?? 'general']
  const FallbackIcon = fallbackIcon.Icon

  return (
    <article className="grid gap-5 p-5 sm:grid-cols-[8rem_minmax(0,1fr)] sm:p-6">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-stone-100">
        {item.image && typeof item.image === 'object' ? (
          <Media fill imgClassName="object-cover" resource={item.image} size="8rem" />
        ) : (
          <div
            aria-label={fallbackIcon.label}
            className="flex h-full items-center justify-center bg-[#f3efe7] text-[#4f5d3a]"
            role="img"
          >
            <FallbackIcon className="h-12 w-12" aria-hidden="true" strokeWidth={1.75} />
          </div>
        )}
      </div>

      <div className="min-w-0">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-stone-950">{item.title}</h3>
            <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold">
              {quantity ? (
                <span className="rounded-full bg-stone-100 px-3 py-1 text-stone-700">
                  Qty: {quantity}
                </span>
              ) : null}
              {status ? (
                <span className="rounded-full bg-[#ece6d9] px-3 py-1 text-[#4f5d3a]">
                  {statusLabels[status]}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {note ? <p className="mt-4 text-sm leading-6 text-stone-800">{note}</p> : null}
        {item.summary ? (
          <p className="mt-3 text-sm leading-6 text-stone-700">{item.summary}</p>
        ) : null}

        {hasVendorLinks ? (
          <div className="mt-5 flex flex-wrap gap-3">
            {item.amazonUrl ? (
              <VendorButton href={item.amazonUrl} label="Amazon" rel={externalRel} />
            ) : null}
            {item.reiUrl ? <VendorButton href={item.reiUrl} label="REI" rel={externalRel} /> : null}
          </div>
        ) : null}
      </div>
    </article>
  )
}

function VendorButton({ href, label, rel }: { href: string; label: string; rel: string }) {
  return (
    <a
      className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-950 transition hover:border-[#4f5d3a] hover:text-[#4f5d3a]"
      href={href}
      rel={rel}
      target="_blank"
    >
      {label}
      <ExternalLink className="h-4 w-4" aria-hidden="true" />
    </a>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const gearPage = await queryGearPageBySlug({ slug: decodedSlug })

  return generateMeta({ doc: gearPage })
}

const queryGearPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'gear-pages',
    depth: 2,
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
