'use client'

import { Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'

type CounselorListItem = {
  id: number
  name: string
  troop: string
  meritBadges: string[]
}

type MeritBadgeCounselorsListProps = {
  counselors: CounselorListItem[]
  emptyMessage: string
}

const normalize = (value: string) => value.trim().toLowerCase()

export const MeritBadgeCounselorsList: React.FC<MeritBadgeCounselorsListProps> = ({
  counselors,
  emptyMessage,
}) => {
  const [query, setQuery] = useState('')
  const normalizedQuery = normalize(query)

  const badgeOptions = useMemo(
    () =>
      Array.from(new Set(counselors.flatMap((counselor) => counselor.meritBadges)))
        .filter(Boolean)
        .sort((left, right) => left.localeCompare(right)),
    [counselors],
  )

  const filteredCounselors = useMemo(() => {
    if (!normalizedQuery) {
      return counselors
    }

    return counselors.filter((counselor) =>
      counselor.meritBadges.some((badge) => normalize(badge).includes(normalizedQuery)),
    )
  }, [counselors, normalizedQuery])

  if (counselors.length === 0) {
    return (
      <div className="mt-12 rounded-[1.75rem] border border-stone-200 bg-white p-8 text-sm leading-7 text-stone-700 shadow-[0_18px_40px_-38px_rgba(41,37,36,0.35)]">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="mt-12">
      <div className="flex flex-col gap-3 border-b border-stone-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full sm:max-w-md">
          <span className="sr-only">Search by merit badge</span>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400"
          />
          <input
            className="h-12 w-full rounded-full border border-stone-300 bg-white pl-12 pr-12 text-base text-stone-950 outline-none transition focus:border-[#4f5d3a] focus:ring-4 focus:ring-[#4f5d3a]/15"
            list="merit-badge-options"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by merit badge"
            type="search"
            value={query}
          />
          {query ? (
            <button
              aria-label="Clear merit badge search"
              className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-stone-500 transition hover:bg-stone-100 hover:text-stone-950"
              onClick={() => setQuery('')}
              type="button"
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          ) : null}
        </label>

        <p className="text-sm font-medium text-stone-600">
          {filteredCounselors.length} of {counselors.length}
        </p>

        <datalist id="merit-badge-options">
          {badgeOptions.map((badge) => (
            <option key={badge} value={badge} />
          ))}
        </datalist>
      </div>

      {filteredCounselors.length > 0 ? (
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {filteredCounselors.map((counselor) => (
            <article
              className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-[0_18px_40px_-38px_rgba(41,37,36,0.35)]"
              key={counselor.id}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-xl font-semibold tracking-tight text-stone-950">
                  {counselor.name}
                </h3>
                <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-stone-600">
                  {counselor.troop}
                </span>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {counselor.meritBadges.map((badge, index) => (
                  <li
                    className="rounded-full border border-[#4f5d3a]/20 bg-[#4f5d3a]/10 px-3 py-1 text-sm font-medium text-[#344024]"
                    key={`${badge}-${index}`}
                  >
                    {badge}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-[1.75rem] border border-stone-200 bg-white p-8 text-sm leading-7 text-stone-700 shadow-[0_18px_40px_-38px_rgba(41,37,36,0.35)]">
          No counselors match that merit badge search.
        </div>
      )}
    </div>
  )
}
