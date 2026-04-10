import Link from 'next/link'
import { ArrowUpRight, FileText } from 'lucide-react'

import { SectionHeading } from './SectionHeading'
import { resources } from './constants'

export function ResourcesPreviewSection() {
  return (
    <section className="bg-[linear-gradient(to_bottom,rgba(250,250,249,1),rgba(245,245,244,1))] py-20 sm:py-24" id="resources">
      <div className="container">
        <SectionHeading
          eyebrow="Resources"
          title="Public-friendly documents families can access quickly"
          description="This section is intentionally easy to update later in code as troop resources evolve."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {resources.map((resource) => (
            <Link
              className="group flex items-center justify-between rounded-[1.5rem] border border-stone-200 bg-white px-5 py-5 shadow-[0_16px_50px_-40px_rgba(41,37,36,0.3)] transition hover:border-[#7a755d]/35 hover:bg-stone-50"
              href={resource.href}
              key={resource.title}
            >
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-stone-100 p-3 text-stone-700 transition group-hover:bg-[#ece6d9] group-hover:text-[#4f5d3a]">
                  <FileText className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-stone-950">{resource.title}</h3>
                  <p className="mt-1 text-sm text-stone-500">Public resource preview</p>
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-stone-400 transition group-hover:text-[#4f5d3a]" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
