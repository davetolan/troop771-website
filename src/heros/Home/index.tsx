'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cardIconMap, type CardIconValue } from '@/fields/scoutIcons'

export const HomeHero: React.FC<Page['hero']> = ({
  highlights,
  links,
  media,
  photoPanel,
  richText,
  secondaryMedia,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  const photoItems = (photoPanel?.items || []).slice(0, 3)
  const [primaryPhoto, ...secondaryPhotos] = photoItems

  return (
    <section className="relative overflow-hidden bg-stone-950 text-white">
      <div className="absolute inset-0">
        {media && typeof media === 'object' ? (
          <Media
            fill
            imgClassName="object-cover object-center opacity-30"
            pictureClassName="absolute inset-0"
            priority
            resource={media}
          />
        ) : null}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,113,108,0.18),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(180,138,69,0.14),transparent_28%),linear-gradient(135deg,rgba(28,25,23,0.98),rgba(41,37,36,0.94),rgba(31,58,44,0.88))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,rgba(28,25,23,0.96),transparent)]" />
        <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-lime-300/6 blur-3xl" />
        <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-amber-500/8 blur-3xl" />
      </div>

      <div className="container relative py-10 sm:py-14 lg:py-18">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-end">
          <div className="relative max-w-3xl">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-stone-950/35 p-6 shadow-[0_30px_90px_-55px_rgba(0,0,0,0.9)] backdrop-blur-md sm:p-8">
              {secondaryMedia && typeof secondaryMedia === 'object' ? (
                <div className="pointer-events-none absolute inset-0">
                  <Media
                    fill
                    imgClassName="object-cover object-[72%_center] opacity-42"
                    pictureClassName="absolute inset-0"
                    resource={secondaryMedia}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(17,24,39,0.9),rgba(17,24,39,0.58)_42%,rgba(17,24,39,0.78)),radial-gradient(circle_at_78%_26%,rgba(255,255,255,0.1),transparent_22%)]" />
                  <div className="absolute right-0 top-0 h-full w-[44%] bg-[linear-gradient(to_left,rgba(255,255,255,0.08),transparent)]" />
                </div>
              ) : null}

              {richText && (
                <RichText
                  className="relative z-10 [&_h1]:mt-6 [&_h1]:max-w-4xl [&_h1]:text-5xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h1]:text-white [&_h1]:sm:text-6xl [&_h1]:lg:text-7xl [&_p]:mt-6 [&_p]:max-w-2xl [&_p]:text-lg [&_p]:leading-8 [&_p]:text-stone-200 [&_p]:sm:text-xl"
                  data={richText}
                  enableGutter={false}
                  enableProse={false}
                />
              )}

              {Array.isArray(links) && links.length > 0 && (
                <div className="relative z-10 mt-8 flex flex-col gap-4 sm:flex-row">
                  {links.map(({ link }, i) => (
                    <CMSLink key={i} {...link} />
                  ))}
                </div>
              )}

              {Array.isArray(highlights) && highlights.length > 0 && (
                <ul className="relative z-10 mt-10 grid gap-3 sm:grid-cols-3">
                  {highlights.map((highlight, i) => {
                    const Icon = cardIconMap[(highlight.icon || 'none') as CardIconValue]

                    return (
                      <li
                        className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-stone-100 backdrop-blur-sm"
                        key={highlight.id || i}
                      >
                        {Icon ? <Icon className="h-5 w-5 text-amber-200" aria-hidden="true" /> : null}
                        <span>{highlight.label}</span>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </div>

          {photoItems.length > 0 ? (
            <div className="relative">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/12 via-white/6 to-transparent blur-xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-stone-900/35 p-6 shadow-2xl backdrop-blur-md">
                {(photoPanel?.kicker || photoPanel?.tagline) && (
                  <div className="flex items-center justify-between text-sm text-white/70">
                    {photoPanel?.kicker ? (
                      <span className="font-medium uppercase tracking-[0.22em] text-stone-200">
                        {photoPanel.kicker}
                      </span>
                    ) : null}
                    {photoPanel?.tagline ? <span>{photoPanel.tagline}</span> : null}
                  </div>
                )}

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {primaryPhoto ? (
                    <div className="relative min-h-[15rem] overflow-hidden rounded-2xl border border-white/10 sm:col-span-2">
                      {primaryPhoto.image && typeof primaryPhoto.image === 'object' ? (
                        <Media
                          fill
                          imgClassName="object-cover"
                          pictureClassName="absolute inset-0"
                          resource={primaryPhoto.image}
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,25,23,0.78),rgba(28,25,23,0.18),transparent)]" />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-200">
                          {primaryPhoto.caption}
                        </p>
                        {primaryPhoto.description ? (
                          <p className="mt-2 max-w-sm text-sm leading-6 text-stone-100">
                            {primaryPhoto.description}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ) : null}

                  {secondaryPhotos.map((photo, i) => (
                    <div
                      className="relative min-h-[13rem] overflow-hidden rounded-2xl border border-white/10"
                      key={photo.id || i}
                    >
                      {photo.image && typeof photo.image === 'object' ? (
                        <Media
                          fill
                          imgClassName="object-cover"
                          pictureClassName="absolute inset-0"
                          resource={photo.image}
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,25,23,0.82),rgba(28,25,23,0.18),transparent)]" />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <p className="text-lg font-semibold text-white">{photo.caption}</p>
                        {photo.description ? (
                          <p className="mt-2 text-sm leading-6 text-stone-100">{photo.description}</p>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>

                {photoPanel?.note ? (
                  <div className="mt-5 rounded-2xl border border-amber-200/15 bg-amber-200/10 px-5 py-4 text-sm leading-6 text-stone-100">
                    {photoPanel.note}
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
