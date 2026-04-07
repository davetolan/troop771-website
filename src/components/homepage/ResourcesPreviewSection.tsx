import Link from 'next/link'
import { ArrowUpRight, FileText } from 'lucide-react'

import { SectionHeading } from './SectionHeading'
import { resources } from './constants'

export function ResourcesPreviewSection() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24" id="resources">
      <div className="container">
        <SectionHeading
          eyebrow="Resources"
          title="Public-friendly documents families can access quickly"
          description="This section is intentionally easy to update later in code as troop resources evolve."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {resources.map((resource) => (
            <Link
              className="group flex items-center justify-between rounded-[1.5rem] border border-slate-200 bg-white px-5 py-5 shadow-[0_16px_50px_-40px_rgba(15,23,42,0.4)] transition hover:border-emerald-200 hover:bg-emerald-50/50"
              href={resource.href}
              key={resource.title}
            >
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-slate-100 p-3 text-slate-700 transition group-hover:bg-emerald-100 group-hover:text-emerald-800">
                  <FileText className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-950">{resource.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">Public resource preview</p>
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-slate-400 transition group-hover:text-emerald-700" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
