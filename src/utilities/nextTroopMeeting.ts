import { unstable_cache } from 'next/cache'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export type NextTroopMeeting = {
  title: string
  start: string
  end?: string
  location?: string
  description?: string
  calendarUrl?: string
}

type TroopMeetingException = {
  date: string
}

type TroopMeetingSettings = {
  alternateLocationActive?: boolean | null
  calendarUrl?: string | null
  defaultLocation?: string | null
  summerBreakActive?: boolean | null
}

type GetNextRegularTroopMeetingOptions = {
  exceptions?: TroopMeetingException[]
  maxWeeksToSearch?: number
  now?: Date
  settings?: TroopMeetingSettings | null
}

const DEFAULT_MEETING_LOCATION = 'Scout Barn'
const DEFAULT_MEETING_TITLE = 'Next Troop Meeting'
const MEETING_END = { hour: 20, minute: 30 }
const MEETING_START = { hour: 19, minute: 0 }
const TUESDAY = 2
export const TROOP_MEETING_TIME_ZONE = 'America/Chicago'

const getTimeZoneYear = (date: Date, timeZone = TROOP_MEETING_TIME_ZONE) =>
  Number(
    new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
    }).format(date),
  )

export function formatTroopMeetingStart(
  start: string,
  now = new Date(),
  timeZone = TROOP_MEETING_TIME_ZONE,
) {
  const startDate = new Date(start)
  const includeYear = getTimeZoneYear(startDate, timeZone) !== getTimeZoneYear(now, timeZone)

  const date = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    timeZone,
    weekday: 'long',
    ...(includeYear ? { year: 'numeric' } : {}),
  }).format(startDate)

  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone,
  }).format(startDate)

  return `${date} at ${time}`
}

const weekdayIndex = {
  Friday: 5,
  Monday: 1,
  Saturday: 6,
  Sunday: 0,
  Thursday: 4,
  Tuesday: TUESDAY,
  Wednesday: 3,
} as const

const getZonedDateParts = (date: Date, timeZone = TROOP_MEETING_TIME_ZONE) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    hour: '2-digit',
    hourCycle: 'h23',
    minute: '2-digit',
    month: '2-digit',
    timeZone,
    weekday: 'long',
    year: 'numeric',
  }).formatToParts(date)

  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((item) => item.type === type)?.value ?? ''
  const weekday = part('weekday') as keyof typeof weekdayIndex

  return {
    day: Number(part('day')),
    hour: Number(part('hour')),
    minute: Number(part('minute')),
    month: Number(part('month')),
    weekday: weekdayIndex[weekday],
    year: Number(part('year')),
  }
}

const toDateKey = (year: number, month: number, day: number) =>
  `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`

export function getDateKeyInTimeZone(date: Date, timeZone = TROOP_MEETING_TIME_ZONE) {
  const { day, month, year } = getZonedDateParts(date, timeZone)

  return toDateKey(year, month, day)
}

const addDaysToLocalDate = (year: number, month: number, day: number, days: number) => {
  const date = new Date(Date.UTC(year, month - 1, day + days, 12))

  return {
    day: date.getUTCDate(),
    month: date.getUTCMonth() + 1,
    year: date.getUTCFullYear(),
  }
}

function zonedTimeToUtcDate(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timeZone = TROOP_MEETING_TIME_ZONE,
) {
  const utcGuess = Date.UTC(year, month - 1, day, hour, minute)
  const guessedParts = getZonedDateParts(new Date(utcGuess), timeZone)
  const desiredLocalTime = Date.UTC(year, month - 1, day, hour, minute)
  const guessedLocalTime = Date.UTC(
    guessedParts.year,
    guessedParts.month - 1,
    guessedParts.day,
    guessedParts.hour,
    guessedParts.minute,
  )

  return new Date(utcGuess + desiredLocalTime - guessedLocalTime)
}

export function getNextRegularTroopMeeting(
  options: GetNextRegularTroopMeetingOptions = {},
): NextTroopMeeting | null {
  const now = options.now ?? new Date()
  const settings = options.settings

  if (settings?.summerBreakActive) {
    return null
  }

  const exceptionDates = new Set(
    (options.exceptions ?? []).map((exception) =>
      getDateKeyInTimeZone(new Date(exception.date), TROOP_MEETING_TIME_ZONE),
    ),
  )
  const maxWeeksToSearch = options.maxWeeksToSearch ?? 52
  const nowParts = getZonedDateParts(now)
  const todayMeetingEnd = zonedTimeToUtcDate(
    nowParts.year,
    nowParts.month,
    nowParts.day,
    MEETING_END.hour,
    MEETING_END.minute,
  )
  const initialDaysUntilTuesday =
    nowParts.weekday === TUESDAY && todayMeetingEnd.getTime() <= now.getTime()
      ? 7
      : (TUESDAY - nowParts.weekday + 7) % 7

  for (let week = 0; week < maxWeeksToSearch; week += 1) {
    const candidateDate = addDaysToLocalDate(
      nowParts.year,
      nowParts.month,
      nowParts.day,
      initialDaysUntilTuesday + week * 7,
    )
    const candidateDateKey = toDateKey(candidateDate.year, candidateDate.month, candidateDate.day)

    if (exceptionDates.has(candidateDateKey)) {
      continue
    }

    const start = zonedTimeToUtcDate(
      candidateDate.year,
      candidateDate.month,
      candidateDate.day,
      MEETING_START.hour,
      MEETING_START.minute,
    )
    const end = zonedTimeToUtcDate(
      candidateDate.year,
      candidateDate.month,
      candidateDate.day,
      MEETING_END.hour,
      MEETING_END.minute,
    )

    return {
      calendarUrl: settings?.calendarUrl ?? undefined,
      end: end.toISOString(),
      location: settings?.alternateLocationActive
        ? 'Alternate location · Check Slack'
        : settings?.defaultLocation || DEFAULT_MEETING_LOCATION,
      start: start.toISOString(),
      title: DEFAULT_MEETING_TITLE,
    }
  }

  return null
}

async function getNextTroopMeetingFromPayload() {
  const today = new Date()
  const exceptionSearchStart = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

  try {
    const payload = await getPayload({ config: configPromise })
    const [settings, exceptions] = await Promise.all([
      payload.findGlobal({
        slug: 'troopMeetingSettings',
        depth: 0,
        overrideAccess: false,
      }),
      payload.find({
        collection: 'troop-meeting-exceptions',
        depth: 0,
        limit: 100,
        overrideAccess: false,
        sort: 'date',
        where: {
          date: {
            greater_than_equal: exceptionSearchStart.toISOString(),
          },
        },
      }),
    ])

    return getNextRegularTroopMeeting({
      exceptions: exceptions.docs,
      now: today,
      settings,
    })
  } catch {
    return getNextRegularTroopMeeting({
      now: today,
    })
  }
}

const getCachedNextTroopMeetingResult = unstable_cache(
  getNextTroopMeetingFromPayload,
  ['next_troop_meeting'],
  {
    revalidate: 60 * 60,
    tags: ['next_troop_meeting'],
  },
)

export async function getCachedNextTroopMeeting(now = new Date()) {
  const meeting = await getCachedNextTroopMeetingResult()

  if (!meeting) {
    return null
  }

  const staleAfter = new Date(meeting.end ?? meeting.start)

  return staleAfter.getTime() > now.getTime() ? meeting : null
}
