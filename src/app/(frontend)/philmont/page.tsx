import type { Metadata } from 'next'

import fs from 'node:fs/promises'
import path from 'node:path'

import Image from 'next/image'
import Link from 'next/link'
import {
  Backpack,
  CheckCircle2,
  ClipboardList,
  Compass,
  Download,
  Map,
  Mountain,
  ShieldCheck,
  TentTree,
} from 'lucide-react'

import { PrintButton } from './PrintButton'

export const metadata: Metadata = {
  title: 'Philmont Trek | Troop 771',
  description:
    'Troop 771 Philmont trek overview, high-adventure preparation, and a trail-ready packing list.',
}

type GearItem = {
  item: string
  qty: string
  notes: string
}

type GearSection = {
  title: string
  items: GearItem[]
}

const csvPath = path.join(process.cwd(), 'public', 'Philmont Packing List - csv.csv')
const csvDownloadHref = '/Philmont%20Packing%20List%20-%20csv.csv'
const gearSectionTitles = new Set([
  'Packs & Bags',
  'Clothing',
  'Sleeping Gear',
  'Toiletries/ Personal First Aid',
  'Other Gear',
  'Optional',
])

const preparationPoints = [
  {
    title: 'Self-reliance',
    description:
      'Scouts learn how to carry what they need, make good decisions when conditions change, and keep moving as a crew.',
    icon: Backpack,
  },
  {
    title: 'Outdoor judgment',
    description:
      'The trek turns map reading, weather awareness, water planning, cooking, and campsite discipline into lived experience.',
    icon: Compass,
  },
  {
    title: 'Crew leadership',
    description:
      'Every day requires communication, responsibility, and trust as Scouts rotate through real jobs with real consequences.',
    icon: ShieldCheck,
  },
] as const

const trekLessons = [
  'Pack with purpose and keep weight under control.',
  'Care for feet, layers, water, food, and sleep systems before small problems become big ones.',
  'Work as a crew through long miles, changing weather, and shared camp responsibilities.',
  'Bring home confidence that applies to future backpacking, canoeing, climbing, and wilderness trips.',
] as const

export default async function PhilmontPage() {
  const gearSections = await getGearSections()
  const itemCount = gearSections.reduce((total, section) => total + section.items.length, 0)

  return (
    <main className="philmont-page bg-stone-50 text-stone-950">
      <section className="relative isolate overflow-hidden bg-stone-950 text-white">
        <div className="absolute inset-0">
          <Image
            alt=""
            aria-hidden="true"
            className="object-cover object-center opacity-60"
            fill
            priority
            sizes="100vw"
            src="/philmont-hiking.jpg"
          />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(12,10,9,0.84),rgba(28,25,23,0.72)_45%,rgba(63,80,47,0.52)),radial-gradient(circle_at_78%_20%,rgba(252,211,77,0.2),transparent_28%)]" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(to_top,rgba(12,10,9,0.68),transparent)]" />
        </div>

        <div className="container relative py-16 sm:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-stone-100 backdrop-blur">
                <Mountain className="h-4 w-4 text-amber-200" aria-hidden="true" />
                <span className="font-semibold uppercase tracking-[0.22em]">Philmont Trek</span>
              </div>

              <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                High adventure that prepares Scouts for a lifetime outdoors
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-200 sm:text-xl">
                Philmont is more than a destination. It is a proving ground where Scouts practice
                the skills, judgment, and leadership they will rely on for any future outdoor
                adventure.
              </p>

              <figure className="mt-8 max-w-3xl border-l-4 border-amber-300 pl-5">
                <blockquote className="text-xl font-medium leading-8 text-white sm:text-2xl">
                  For some this is an adventure of a lifetime, for others this will be the start of
                  a lifetime of adventure.
                </blockquote>
                <figcaption className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
                  Michael Graham
                </figcaption>
              </figure>

              <div className="no-print mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
                  download
                  href={csvDownloadHref}
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download CSV
                </a>
                <PrintButton />
              </div>
            </div>

            <aside className="rounded-2xl border border-white/12 bg-white/8 p-6 shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-3 text-amber-200">
                <Map className="h-5 w-5" aria-hidden="true" />
                <p className="text-sm font-semibold uppercase tracking-[0.22em]">Trail Ready</p>
              </div>
              <dl className="mt-6 grid gap-5">
                <div>
                  <dt className="text-sm text-stone-300">Gear categories</dt>
                  <dd className="mt-1 text-3xl font-semibold text-white">{gearSections.length}</dd>
                </div>
                <div>
                  <dt className="text-sm text-stone-300">Packing-list items</dt>
                  <dd className="mt-1 text-3xl font-semibold text-white">{itemCount}</dd>
                </div>
                <div>
                  <dt className="text-sm text-stone-300">Main goal</dt>
                  <dd className="mt-1 text-lg font-semibold text-white">Prepared, capable Scouts</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#4f5d3a]">
                Why We Go
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
                High adventure builds confidence that cannot be taught from the sidelines
              </h2>
              <p className="mt-5 text-base leading-8 text-stone-700">
                This trek will teach Scouts what they need to tackle future outdoor adventures:
                preparation, grit, teamwork, and the habits that keep a crew safe and effective in
                the backcountry.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {preparationPoints.map(({ title, description, icon: Icon }) => (
                <article
                  className="rounded-2xl border border-stone-200 bg-stone-50 p-5 shadow-[0_18px_55px_-42px_rgba(41,37,36,0.45)]"
                  key={title}
                >
                  <div className="inline-flex rounded-xl bg-[#ece6d9] p-3 text-[#4f5d3a]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-stone-950">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-stone-700">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(to_bottom,rgba(250,250,249,1),rgba(240,237,228,0.86))] py-16 sm:py-20">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.42fr)] lg:items-start">
            <div>
              <div className="flex items-center gap-3">
                <ClipboardList className="h-6 w-6 text-[#4f5d3a]" aria-hidden="true" />
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#4f5d3a]">
                  Packing List
                </p>
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
                Gear matters because preparation matters
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-stone-700">
                The right gear keeps Scouts warm, dry, organized, and able to focus on the crew and
                the trail. Use this list as the working baseline for personal packing decisions.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-300/40 bg-amber-50 p-5 text-sm leading-6 text-stone-800">
              <p className="font-semibold text-stone-950">PDF tip</p>
              <p className="mt-2">
                Use the Save packing list as PDF button above, then choose Save as PDF in the print
                dialog. The print version keeps the gear list and removes site navigation.
              </p>
            </div>
          </div>

          <div className="print-section mt-10 grid gap-6">
            {gearSections.map((section) => (
              <section
                className="gear-section overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_20px_65px_-48px_rgba(41,37,36,0.45)]"
                key={section.title}
              >
                <div className="flex items-center justify-between gap-4 border-b border-stone-200 bg-stone-950 px-5 py-4 text-white">
                  <h3 className="text-lg font-semibold">{section.title}</h3>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-stone-200">
                    {section.items.length} items
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
                      {section.items.map((gearItem) => (
                        <tr className="align-top" key={`${section.title}-${gearItem.item}`}>
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

      <section className="no-print bg-stone-950 py-16 text-white sm:py-20">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[0.5fr_1fr] lg:items-center">
            <div>
              <div className="inline-flex rounded-2xl bg-white/10 p-4 text-amber-200">
                <TentTree className="h-7 w-7" aria-hidden="true" />
              </div>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                What Scouts bring home
              </h2>
            </div>

            <ul className="grid gap-3 md:grid-cols-2">
              {trekLessons.map((lesson) => (
                <li
                  className="flex gap-3 rounded-2xl border border-white/10 bg-white/6 p-4 text-sm leading-6 text-stone-100"
                  key={lesson}
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-200" aria-hidden="true" />
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex items-center justify-center rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-200"
              href="/"
            >
              Back to Troop 771
            </Link>
            <a
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              download
              href={csvDownloadHref}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download packing list
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

async function getGearSections(): Promise<GearSection[]> {
  const csv = await fs.readFile(csvPath, 'utf8')
  const rows = parseCsv(csv)
  const sections: GearSection[] = []
  let currentSection: GearSection | null = null

  for (const [rawItem = '', rawQty = '', rawNotes = ''] of rows) {
    const item = rawItem.trim()
    const qty = rawQty.trim()
    const notes = rawNotes.trim()

    if (!item || item.toLowerCase() === 'item') continue

    if (!qty && !notes && gearSectionTitles.has(item)) {
      currentSection = { title: item, items: [] }
      sections.push(currentSection)
      continue
    }

    if (!currentSection) {
      currentSection = { title: 'Gear', items: [] }
      sections.push(currentSection)
    }

    currentSection.items.push({ item, qty, notes })
  }

  return sections
}

function parseCsv(input: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let value = ''
  let inQuotes = false

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index]
    const nextChar = input[index + 1]

    if (char === '"' && inQuotes && nextChar === '"') {
      value += '"'
      index += 1
      continue
    }

    if (char === '"') {
      inQuotes = !inQuotes
      continue
    }

    if (char === ',' && !inQuotes) {
      row.push(value)
      value = ''
      continue
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') index += 1
      row.push(value)
      if (row.some((cell) => cell.trim())) rows.push(row)
      row = []
      value = ''
      continue
    }

    value += char
  }

  row.push(value)
  if (row.some((cell) => cell.trim())) rows.push(row)

  return rows
}
