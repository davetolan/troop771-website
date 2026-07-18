'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/utilities/ui'

type EagleFaqProps = {
  faqs: {
    question: string
    answer: string
  }[]
}

export function EagleFaq({ faqs }: EagleFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="divide-y divide-stone-200 overflow-hidden rounded-2xl border border-stone-200 bg-white">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index
        const buttonId = `eagle-faq-${index}-button`
        const panelId = `eagle-faq-${index}-panel`

        return (
          <div key={faq.question}>
            <h3>
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-stone-950 transition hover:bg-stone-50 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#4f5d3a]"
                id={buttonId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                type="button"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn('h-5 w-5 shrink-0 text-[#4f5d3a] transition', isOpen && 'rotate-180')}
                />
              </button>
            </h3>
            <div
              aria-labelledby={buttonId}
              className={cn('px-5 text-sm leading-7 text-stone-700', isOpen ? 'block pb-5' : 'hidden')}
              id={panelId}
              role="region"
            >
              {faq.answer}
            </div>
          </div>
        )
      })}
    </div>
  )
}
