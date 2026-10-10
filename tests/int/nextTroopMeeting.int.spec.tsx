import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { NextTroopMeetingBannerView } from '@/components/NextTroopMeetingBanner'
import {
  formatTroopMeetingStart,
  getBannerPromo,
  getNextRegularTroopMeeting,
  type NextTroopMeeting,
} from '@/utilities/nextTroopMeeting'

const now = new Date('2026-08-05T12:00:00.000Z')

afterEach(() => {
  cleanup()
})

describe('next troop meeting utility', () => {
  it('selects the next Tuesday troop meeting', () => {
    const meeting = getNextRegularTroopMeeting({ now })

    expect(meeting?.start).toBe('2026-08-12T00:00:00.000Z')
    expect(meeting?.end).toBe('2026-08-12T01:30:00.000Z')
  })

  it('uses the Scout Barn as the default location', () => {
    const meeting = getNextRegularTroopMeeting({ now })

    expect(meeting?.location).toBe('Scout Barn')
  })

  it('skips configured no-meeting dates', () => {
    const meeting = getNextRegularTroopMeeting({
      exceptions: [{ date: '2026-08-11T05:00:00.000Z' }],
      now,
    })

    expect(formatTroopMeetingStart(meeting!.start!, now)).toBe('Tuesday, August 18 at 7:00 PM')
  })

  it('ignores past exception dates', () => {
    const meeting = getNextRegularTroopMeeting({
      exceptions: [{ date: '2026-07-28T05:00:00.000Z' }],
      now,
    })

    expect(formatTroopMeetingStart(meeting!.start!, now)).toBe('Tuesday, August 11 at 7:00 PM')
  })

  it('moves to the following Tuesday after the current meeting end time', () => {
    const meeting = getNextRegularTroopMeeting({
      now: new Date('2026-08-12T02:31:00.000Z'),
    })

    expect(formatTroopMeetingStart(meeting!.start!, now)).toBe('Tuesday, August 18 at 7:00 PM')
  })

  it('keeps the current Tuesday meeting visible until the meeting end time', () => {
    const meeting = getNextRegularTroopMeeting({
      now: new Date('2026-08-12T01:00:00.000Z'),
    })

    expect(formatTroopMeetingStart(meeting!.start!, now)).toBe('Tuesday, August 11 at 7:00 PM')
  })

  it('converts meeting times to America/Chicago', () => {
    expect(formatTroopMeetingStart('2026-08-12T00:30:00.000Z', now)).toBe(
      'Tuesday, August 11 at 7:30 PM',
    )
  })

  it('includes the year when the meeting is in a different calendar year', () => {
    expect(formatTroopMeetingStart('2027-01-06T01:00:00.000Z', now)).toBe(
      'Tuesday, January 5, 2027 at 7:00 PM',
    )
  })

  it('shows a customizable message when the summer break flag is enabled', () => {
    const meeting = getNextRegularTroopMeeting({
      now,
      settings: {
        summerBreakActive: true,
        summerBreakMessage: 'Troop meetings resume in August. Check Slack for summer events.',
      },
    })

    render(<NextTroopMeetingBannerView meeting={meeting} />)

    expect(
      screen.getByText('Troop meetings resume in August. Check Slack for summer events.'),
    ).toBeTruthy()
    expect(screen.queryByText(/Tuesday,/)).toBeNull()
  })

  it('uses a default summer break message when no custom message is configured', () => {
    const meeting = getNextRegularTroopMeeting({
      now,
      settings: {
        summerBreakActive: true,
      },
    })

    expect(meeting?.title).toBe('Troop meetings are paused for the summer. Check back soon.')
  })

  it('uses the alternate location message when the flag is enabled', () => {
    const meeting = getNextRegularTroopMeeting({
      now,
      settings: {
        alternateLocationActive: true,
      },
    })

    expect(meeting?.location).toBe('Alternate location · Check Slack')
  })

  it('hides the location row when no location is available', () => {
    const meeting: NextTroopMeeting = {
      start: '2026-08-12T00:00:00.000Z',
      title: 'Next Troop Meeting',
    }

    render(<NextTroopMeetingBannerView meeting={meeting} now={now} />)

    expect(screen.getByLabelText('Next troop meeting announcement')).toBeTruthy()
    expect(screen.queryByText('Scout Barn')).toBeNull()
  })

  it('renders the optional calendar link when configured', () => {
    const meeting = getNextRegularTroopMeeting({
      now,
      settings: {
        calendarUrl: 'https://example.com/calendar',
      },
    })

    render(<NextTroopMeetingBannerView meeting={meeting} now={now} />)

    expect(screen.getByRole('link', { name: /view calendar/i }).getAttribute('href')).toBe(
      'https://example.com/calendar',
    )
  })

  it('hides the promo when it is disabled or has no message', () => {
    expect(getBannerPromo({ promo: { enabled: false, message: 'Camp with us' } }, now)).toBeNull()
    expect(getBannerPromo({ promo: { enabled: true, message: '  ' } }, now)).toBeNull()
    expect(getBannerPromo(null, now)).toBeNull()
  })

  it('hides the promo after its expiration date', () => {
    const promo = { enabled: true, message: 'Camp with us' }

    expect(
      getBannerPromo({ promo: { ...promo, expiresAt: '2026-08-04T12:00:00.000Z' } }, now),
    ).toBeNull()
    expect(
      getBannerPromo({ promo: { ...promo, expiresAt: '2026-08-06T12:00:00.000Z' } }, now)?.message,
    ).toBe('Camp with us')
  })

  it('renders the promo above the meeting announcement without replacing it', () => {
    const meeting = getNextRegularTroopMeeting({ now })
    const promo = getBannerPromo(
      {
        promo: {
          enabled: true,
          linkLabel: 'Sign up',
          linkUrl: '/aol-campout',
          message: 'Arrow of Light families: camp with us on November 7',
        },
      },
      now,
    )

    render(<NextTroopMeetingBannerView meeting={meeting} now={now} promo={promo} />)

    expect(screen.getByText('Arrow of Light families: camp with us on November 7')).toBeTruthy()
    expect(screen.getByRole('link', { name: /sign up/i }).getAttribute('href')).toBe('/aol-campout')
    expect(screen.getByLabelText('Next troop meeting announcement')).toBeTruthy()
  })

  it('renders only the meeting announcement when there is no promo', () => {
    render(<NextTroopMeetingBannerView meeting={getNextRegularTroopMeeting({ now })} now={now} />)

    expect(screen.queryByLabelText('Announcement')).toBeNull()
    expect(screen.getByLabelText('Next troop meeting announcement')).toBeTruthy()
  })
})
