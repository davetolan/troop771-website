'use client'

import { Download, FileDown } from 'lucide-react'
import React from 'react'

export type PackingListCsvSection = {
  title: string
  items: { item: string; qty: string; notes: string }[]
}

const csvCell = (value: string) =>
  /[",\r\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value

const buildCsv = (sections: PackingListCsvSection[]) => {
  const rows: string[][] = [['Item', 'Qty', 'Notes']]

  for (const section of sections) {
    rows.push([section.title, '', ''])
    for (const { item, qty, notes } of section.items) rows.push([item, qty, notes])
  }

  return rows.map((row) => row.map(csvCell).join(',')).join('\r\n')
}

export const PackingListActions: React.FC<{
  fileName: string
  sections: PackingListCsvSection[]
}> = ({ fileName, sections }) => {
  const downloadCsv = () => {
    const url = URL.createObjectURL(
      new Blob([buildCsv(sections)], { type: 'text/csv;charset=utf-8' }),
    )
    const anchor = document.createElement('a')

    anchor.href = url
    anchor.download = fileName
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <button
        className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-950"
        onClick={() => window.print()}
        type="button"
      >
        <FileDown className="h-4 w-4" aria-hidden="true" />
        Save as PDF
      </button>
      <button
        className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-950 transition hover:border-[#4f5d3a] hover:text-[#4f5d3a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-950"
        onClick={downloadCsv}
        type="button"
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        Download CSV
      </button>
    </>
  )
}
