import type { Metadata } from 'next'

import { draftMode } from 'next/headers'
import React from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { homeStatic } from '@/endpoints/seed/home-static'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { queryPageBySlug } from '@/utilities/queryPageBySlug'

import PageClient from './[slug]/page.client'

// Keeps the homepage's time-sensitive content (Upcoming Events, Promo
// show-from/show-until windows) from going stale between publishes.
export const revalidate = 3600

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()

  const page = (await queryPageBySlug({ slug: 'home' })) || homeStatic

  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      <PayloadRedirects disableNotFound url="/" />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = (await queryPageBySlug({ slug: 'home' })) || homeStatic

  return generateMeta({ doc: page })
}
