import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Activities } from './collections/Activities'
import { GearItems } from './collections/GearItems'
import { GearPages } from './collections/GearPages'
import { MeritBadgeCounselors } from './collections/MeritBadgeCounselors'
import { Troops } from './collections/Troops'
import { TroopMeetingExceptions } from './collections/TroopMeetingExceptions'
import { ScoutChangeReports } from './collections/ScoutChangeReports'
import { Users } from './collections/Users'
import { RecipeCategories } from './collections/RecipeCategories'
import { Recipes } from './collections/Recipes'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { TroopMeetingSettings } from './TroopMeetingSettings/config'
import { EagleProjectFundraising } from './EagleProjectFundraising/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import {
  getCorsOriginsFromEnv,
  getPayloadServerURL,
  validateURLConfiguration,
} from './utilities/getURL'
import { logPayloadError } from './hooks/logPayloadError'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const maxUploadFileSize = 4 * 1024 * 1024
validateURLConfiguration()
const serverURL = getPayloadServerURL()
const corsOrigins = getCorsOriginsFromEnv()

console.info(`[payload] serverURL=${serverURL}; corsOrigins=${corsOrigins.join(', ') || '(none)'}`)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  collections: [
    Pages,
    Posts,
    Recipes,
    GearPages,
    GearItems,
    Activities,
    TroopMeetingExceptions,
    MeritBadgeCounselors,
    Troops,
    Media,
    Categories,
    RecipeCategories,
    Users,
    ScoutChangeReports,
  ],
  hooks: {
    afterError: [logPayloadError],
  },
  cors: corsOrigins,
  globals: [Header, Footer, TroopMeetingSettings, EagleProjectFundraising],
  plugins,
  serverURL,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  upload: {
    abortOnLimit: true,
    limits: {
      // Keep server-side uploads below Vercel's request-size ceiling.
      fileSize: maxUploadFileSize,
    },
    responseOnLimit: 'File is too large. Please upload a file smaller than 4 MB.',
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
