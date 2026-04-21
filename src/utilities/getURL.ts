import canUseDOM from './canUseDOM'

const localhostURL = 'http://localhost:3000'

export const getPayloadServerURL = () => {
  // Auth and CORS sensitive configuration should always come from PAYLOAD_SERVER_URL in production.
  return process.env.PAYLOAD_SERVER_URL || localhostURL
}

export const getServerSideURL = () => {
  return (
    process.env.NEXT_PUBLIC_SERVER_URL ||
    // Fallback only for convenience in preview/SSR contexts.
    // Do not rely on this for custom-domain auth/cookie behavior in production.
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    localhostURL
  )
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
