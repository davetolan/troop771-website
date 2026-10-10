'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import React, { useRef } from 'react'

export const PhotoCardCarousel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const trackRef = useRef<HTMLDivElement | null>(null)

  const scrollByCard = (direction: 'next' | 'prev') => {
    const track = trackRef.current

    if (!track) return

    const firstCard = track.querySelector<HTMLElement>('[data-carousel-card]')
    const cardWidth = firstCard?.offsetWidth ?? Math.round(track.clientWidth * 0.85)
    const gap = 20
    const offset = cardWidth + gap

    track.scrollBy({
      behavior: 'smooth',
      left: direction === 'next' ? offset : -offset,
    })
  }

  return (
    <div>
      <div className="flex items-center justify-end gap-3">
        <button
          aria-label="Scroll cards left"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-700 shadow-sm transition hover:border-stone-400 hover:bg-stone-50"
          onClick={() => scrollByCard('prev')}
          type="button"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          aria-label="Scroll cards right"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-700 shadow-sm transition hover:border-stone-400 hover:bg-stone-50"
          onClick={() => scrollByCard('next')}
          type="button"
        >
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div
        className="-mx-4 mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        ref={trackRef}
      >
        {children}
      </div>
    </div>
  )
}
