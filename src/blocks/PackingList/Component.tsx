import { ClipboardList } from 'lucide-react'
import React from 'react'

import type { PackingListBlock as PackingListBlockProps } from '@/payload-types'

import { PackingListActions } from './Actions.client'

const toFileName = (title?: string | null) => {
  const base = (title || 'packing-list')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return `${base || 'packing-list'}.csv`
}

export const PackingListBlock: React.FC<PackingListBlockProps> = ({
  description,
  eyebrow,
  sections,
  title,
}) => {
  const visibleSections = (sections || []).filter((section) => section.items?.length)

  return (
    <section className="packing-list-block bg-[linear-gradient(to_bottom,rgba(250,250,249,1),rgba(240,237,228,0.86))] py-16 text-stone-950 sm:py-20">
      <div className="container">
        <div className="max-w-3xl">
          {eyebrow ? (
            <div className="flex items-center gap-3">
              <ClipboardList className="h-6 w-6 text-[#4f5d3a]" aria-hidden="true" />
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#4f5d3a]">
                {eyebrow}
              </p>
            </div>
          ) : null}
          {title ? (
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="mt-5 text-base leading-8 text-stone-700">{description}</p>
          ) : null}
          <PackingListActions
            fileName={toFileName(title)}
            sections={visibleSections.map((section) => ({
              title: section.title,
              items: (section.items || []).map(({ item, notes, qty }) => ({
                item,
                qty: qty || '',
                notes: notes || '',
              })),
            }))}
          />
        </div>

        <div className="mt-10 grid gap-6">
          {visibleSections.map((section, sectionIndex) => (
            <section
              className="gear-section overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_20px_65px_-48px_rgba(41,37,36,0.45)]"
              key={section.id || sectionIndex}
            >
              <div className="flex items-center justify-between gap-4 border-b border-stone-200 bg-stone-950 px-5 py-4 text-white">
                <h3 className="text-lg font-semibold">{section.title}</h3>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-stone-200">
                  {section.items?.length} items
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
                  <thead className="bg-stone-100 text-xs uppercase tracking-[0.16em] text-stone-500">
                    <tr>
                      <th className="w-[38%] px-5 py-3 font-semibold">Item</th>
                      <th className="w-[12%] px-5 py-3 font-semibold">Qty</th>
                      <th className="px-5 py-3 font-semibold">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {section.items?.map((gearItem, itemIndex) => (
                      <tr className="align-top" key={gearItem.id || itemIndex}>
                        <td className="px-5 py-4 font-medium text-stone-950">{gearItem.item}</td>
                        <td className="px-5 py-4 text-stone-700">{gearItem.qty || '-'}</td>
                        <td className="px-5 py-4 leading-6 text-stone-700">
                          {gearItem.notes || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
