import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const AUTH_COOKIE_NAMES = [
  'payload-token',
  'payload-token.sig',
  'payload-refresh-token',
  'payload-refresh-token.sig',
  'users-token',
  'users-token.sig',
  'users-refresh-token',
  'users-refresh-token.sig',
] as const

async function clearAuthCookies() {
  const cookieStore = await cookies()

  for (const cookieName of AUTH_COOKIE_NAMES) {
    cookieStore.set(cookieName, '', {
      expires: new Date(0),
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  }
}

const buildLoggedOutResponse = async () => {
  await clearAuthCookies()

  return NextResponse.json({ message: 'Logged out successfully.' }, { status: 200 })
}

export const POST = buildLoggedOutResponse
export const GET = buildLoggedOutResponse
