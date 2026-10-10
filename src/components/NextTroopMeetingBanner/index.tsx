import { ArrowRight, CalendarDays, ExternalLink, MapPin, Megaphone } from 'lucide-react'
import Link from 'next/link'

import {
  type BannerPromo,
  formatTroopMeetingStart,
  getCachedBannerPromo,
  getCachedNextTroopMeeting,
  type NextTroopMeeting,
} from '@/utilities/nextTroopMeeting'

type NextTroopMeetingBannerViewProps = {
  meeting: NextTroopMeeting | null
  now?: Date
  promo?: BannerPromo | null
}

const promoLinkClassName =
  'inline-flex w-fit items-center gap-1.5 pl-6 font-semibold text-white underline underline-offset-4 transition hover:text-amber-200 sm:pl-0'

function BannerPromoView({ promo }: { promo: BannerPromo }) {
  const linkContent = (
    <>
      {promo.linkLabel || 'Learn more'}
      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
    </>
  )

  return (
    <section aria-label="Announcement" className="bg-[#344225] text-[#f8f3e6]">
      <div className="container flex flex-col gap-2 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-2 sm:items-center">
          <Megaphone
            className="mt-0.5 h-4 w-4 shrink-0 text-amber-200 sm:mt-0"
            aria-hidden="true"
          />
          <p className="min-w-0 font-semibold">{promo.message}</p>
        </div>

        {promo.linkUrl ? (
          promo.linkUrl.startsWith('/') ? (
            <Link className={promoLinkClassName} href={promo.linkUrl}>
              {linkContent}
            </Link>
          ) : (
            <a className={promoLinkClassName} href={promo.linkUrl} rel="noreferrer" target="_blank">
              {linkContent}
            </a>
          )
        ) : null}
      </div>
    </section>
  )
}

export function NextTroopMeetingBannerView({
  meeting,
  now,
  promo,
}: NextTroopMeetingBannerViewProps) {
  return (
    <>
      {promo ? <BannerPromoView promo={promo} /> : null}
      {meeting ? <NextTroopMeetingView meeting={meeting} now={now} /> : null}
    </>
  )
}

function NextTroopMeetingView({ meeting, now }: { meeting: NextTroopMeeting; now?: Date }) {
  return (
    <section
      aria-label="Next troop meeting announcement"
      className="border-b border-amber-200 bg-[#f8f3e6] text-stone-950"
    >
      <div className="container flex flex-col gap-3 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex min-w-0 items-start gap-2 sm:items-center">
            <CalendarDays
              className="mt-0.5 h-4 w-4 shrink-0 text-[#4f5d3a] sm:mt-0"
              aria-hidden="true"
            />
            <p className="min-w-0 font-medium">
              {meeting.start ? (
                <>
                  <span className="font-semibold">{meeting.title}:</span>{' '}
                  <span>{formatTroopMeetingStart(meeting.start, now)}</span>
                </>
              ) : (
                <span className="font-semibold">{meeting.title}</span>
              )}
            </p>
          </div>

          {meeting.location ? (
            <div className="flex min-w-0 items-center gap-2 pl-6 text-stone-700 sm:pl-0">
              <MapPin className="h-4 w-4 shrink-0 text-[#4f5d3a]" aria-hidden="true" />
              <span className="truncate">{meeting.location}</span>
            </div>
          ) : null}
        </div>

        {meeting.calendarUrl ? (
          <a
            className="inline-flex w-fit items-center gap-1.5 pl-6 font-semibold text-[#344225] underline-offset-4 transition hover:text-stone-950 hover:underline sm:pl-0"
            href={meeting.calendarUrl}
            rel="noreferrer"
            target="_blank"
          >
            View Calendar
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </section>
  )
}

export async function NextTroopMeetingBanner() {
  const [meeting, promo] = await Promise.all([getCachedNextTroopMeeting(), getCachedBannerPromo()])

  return <NextTroopMeetingBannerView meeting={meeting} promo={promo} />
}
