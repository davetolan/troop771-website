import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)
import { redirects } from './redirects'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/**',
      },
      {
        pathname: '/api/media/file/**',
      },
    ],
    qualities: [100],
    // Payload already generates sized/re-encoded variants on upload (see
    // src/collections/Media.ts), so Vercel's on-demand optimizer only needs
    // to cover our actual CSS breakpoints — not the much wider Next defaults
    // (8 device widths x 8 image widths x 2 formats). A narrower matrix and
    // a single output format means far fewer unique cache-write variants.
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    // Media URLs already include an updatedAt-based cache-busting query
    // param (see getMediaUrl), so it's safe to cache optimized variants for
    // a long time without risking stale images after an edit.
    minimumCacheTTL: 2678400, // 31 days
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', '') as 'http' | 'https',
        }
      }),
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
