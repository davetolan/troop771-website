import canUseDOM from './canUseDOM'

const localhostURL = 'http://localhost:3000'

const isProduction = process.env.NODE_ENV === 'production'

const inferProtocol = (urlLike: string) => {
  if (/^https?:\/\//i.test(urlLike)) return urlLike

  const isLocalHost = /^localhost(?::\d+)?(\/|$)/i.test(urlLike)
  const isLoopback = /^127\.0\.0\.1(?::\d+)?(\/|$)/.test(urlLike)

  return `${isLocalHost || isLoopback ? 'http' : 'https'}://${urlLike}`
}

const normalizeURL = (urlLike: string): string | null => {
  const withProtocol = inferProtocol(urlLike.trim())

  try {
    const normalized = new URL(withProtocol)
    return normalized.toString().replace(/\/$/, '')
  } catch {
    return null
  }
}

const firstValidURL = (candidates: Array<string | undefined>): string => {
  for (const candidate of candidates) {
    if (!candidate) continue

    const normalized = normalizeURL(candidate)
    if (normalized) return normalized
  }

  return localhostURL
}

export const getPayloadServerURL = () => {
  // Auth and CORS sensitive configuration should always come from PAYLOAD_SERVER_URL in production.
  const payloadServerURL = normalizeURL(process.env.PAYLOAD_SERVER_URL || '')

  if (payloadServerURL) {
    return payloadServerURL
  }

  if (isProduction) {
    throw new Error(
      '[config] PAYLOAD_SERVER_URL is required in production. Falling back to localhost breaks admin auth/cookies.',
    )
  }

  return localhostURL
}

export const getCorsOriginsFromEnv = () => {
  const configuredOrigins = (process.env.PAYLOAD_CORS_ORIGINS || '')
    .split(',')
    .map((origin) => normalizeURL(origin))
    .filter((origin): origin is string => Boolean(origin))

  if (configuredOrigins.length > 0) {
    return configuredOrigins
  }

  const defaultOrigins = [
    process.env.NEXT_PUBLIC_SERVER_URL,
    process.env.PAYLOAD_SERVER_URL,
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ]
    .map((origin) => (origin ? normalizeURL(origin) : null))
    .filter((origin): origin is string => Boolean(origin))

  return [...new Set(defaultOrigins)]
}

export const getServerSideURL = () => {
  if (isProduction && !process.env.NEXT_PUBLIC_SERVER_URL) {
    throw new Error('[config] NEXT_PUBLIC_SERVER_URL is required in production for server-side URL resolution.')
  }

  return firstValidURL([
    process.env.NEXT_PUBLIC_SERVER_URL,
    // Fallback only for convenience in preview/SSR contexts.
    // Do not rely on this for custom-domain auth/cookie behavior in production.
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    localhostURL,
  ])
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  return process.env.NEXT_PUBLIC_SERVER_URL || ''
}

export const validateURLConfiguration = () => {
  const payloadServerURL = normalizeURL(process.env.PAYLOAD_SERVER_URL || '')
  const nextPublicServerURL = normalizeURL(process.env.NEXT_PUBLIC_SERVER_URL || '')

  if (!isProduction) {
    return
  }

  if (!payloadServerURL) {
    throw new Error('[config] PAYLOAD_SERVER_URL must be set to your canonical origin in production.')
  }

  if (!nextPublicServerURL) {
    throw new Error('[config] NEXT_PUBLIC_SERVER_URL must be set to your canonical origin in production.')
  }

  if (payloadServerURL !== nextPublicServerURL) {
    throw new Error(
      `[config] PAYLOAD_SERVER_URL (${payloadServerURL}) and NEXT_PUBLIC_SERVER_URL (${nextPublicServerURL}) must match exactly.`,
    )
  }
}
