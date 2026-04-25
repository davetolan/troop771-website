'use client'

import { FileDown } from 'lucide-react'

export function PrintButton() {
  return (
    <button
      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/16 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      onClick={() => window.print()}
      type="button"
    >
      <FileDown className="h-4 w-4" aria-hidden="true" />
      Save packing list as PDF
    </button>
  )
}
