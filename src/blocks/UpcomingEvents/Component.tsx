import { CalendarDays, MapPin } from 'lucide-react'
import { unstable_cache } from 'next/cache'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Media as MediaDoc, UpcomingEventsBlock as UpcomingEventsBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { formatTroopMeetingStart } from '@/utilities/nextTroopMeeting'
import { eventTypeOptions } from '@/collections/Events'

type UpcomingEventLink = {
  type?: 'custom' | 'reference' | null
  label?: string | null
  newTab?: boolean | null
  url?: string | null
  reference?: {
    relationTo: 'gear-pages' | 'pages' | 'posts'
    value: unknown
  } | null
}

type UpcomingEventItem = {
  id: number
  title: string
  start: string
  end?: string | null
  location?: string | null
  type: (typeof eventTypeOptions)[number]['value']
  summary?: string | null
  image?: MediaDoc | number | string | null
  enableLink?: boolean | null
  link?: UpcomingEventLink | null
}

const getUpcomingEvents = (onlyHomepageEvents: boolean, count: number) =>
  unstable_cache(
    async () => {
      const payload = await getPayload({ config: configPromise })
      const now = new Date().toISOString()

      const { docs } = await payload.find({
        collection: 'events',
        depth: 1,
        limit: count,
        overrideAccess: false,
        sort: 'start',
        where: {
          and: [
            {
              start: {
                greater_than_equal: now,
              },
            },
            ...(onlyHomepageEvents
              ? [
                  {
                    showOnHomepage: {
                      equals: true,
                    },
                  },
                ]
              : []),
          ],
        },
      })

      return docs as unknown as UpcomingEventItem[]
    },
    ['upcoming-events', onlyHomepageEvents ? 'homepage-only' : 'all', String(count)],
    {
      revalidate: 60 * 60,
      tags: ['collection_events'],
    },
  )()

const typeLabels = Object.fromEntries(
  eventTypeOptions.map(({ label, value }) => [value, label]),
) as Record<string, string>

export const UpcomingEventsBlock = async (
  props: UpcomingEventsBlockProps & { id?: string },
) => {
  const {
    id,
    count,
    emptyMessage,
    enableLink,
    heading,
    intro,
    link,
    onlyHomepageEvents = true,
  } = props

  const payload = await getPayload({ config: configPromise })

  let events: UpcomingEventItem[] = []

  try {
    events = await getUpcomingEvents(Boolean(onlyHomepageEvents), count || 4)
  } catch (error) {
    payload.logger.error({
      err: error,
      msg: 'Failed to load events for UpcomingEventsBlock',
    })
  }

  return (
    <section
      className="bg-[linear-gradient(to_bottom,rgba(255,255,255,1),rgba(250,250,249,1))] py-20 sm:py-24"
      id={id ? `block-${id}` : undefined}
    >
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            {heading ? (
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#4f5d3a]">
                {heading}
              </p>
            ) : null}
            {intro ? (
              <p className="mt-2 max-w-xl text-base leading-7 text-stone-700">{intro}</p>
            ) : null}
          </div>

          {enableLink && link ? (
            <CMSLink appearance="outline" size="sm" {...link} />
          ) : null}
        </div>

        {events.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {events.map((event) => (
              <article
                className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-[0_18px_40px_-38px_rgba(41,37,36,0.35)]"
                key={event.id}
              >
                {event.image ? (
                  <div className="relative min-h-[9rem] border-b border-stone-200">
                    <Media imgClassName="h-full w-full object-cover" resource={event.image} />
                  </div>
                ) : null}
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                    {typeLabels[event.type] ?? event.type}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight text-stone-950">
                    {event.title}
                  </h3>
                  <p className="mt-2 flex items-start gap-2 text-sm leading-6 text-stone-700">
                    <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-[#4f5d3a]" aria-hidden="true" />
                    <span>{formatTroopMeetingStart(event.start)}</span>
                  </p>
                  {event.location ? (
                    <p className="mt-1 flex items-start gap-2 text-sm leading-6 text-stone-700">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#4f5d3a]" aria-hidden="true" />
                      <span>{event.location}</span>
                    </p>
                  ) : null}
                  {event.summary ? (
                    <p className="mt-3 text-sm leading-6 text-stone-700">{event.summary}</p>
                  ) : null}
                  {event.enableLink && event.link ? (
                    <div className="mt-4">
                      <CMSLink appearance="default" size="sm" {...(event.link as object)} />
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-[1.5rem] border border-stone-200 bg-white p-8 text-sm leading-7 text-stone-700 shadow-[0_18px_40px_-38px_rgba(41,37,36,0.35)]">
            {emptyMessage || 'Upcoming events will appear here as they are added in Payload.'}
          </div>
        )}
      </div>
    </section>
  )
}
