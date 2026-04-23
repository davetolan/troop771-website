declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BLOB_READ_WRITE_TOKEN: string
      PAYLOAD_SECRET: string
      DATABASE_URL: string
      PAYLOAD_SERVER_URL?: string
      PAYLOAD_CORS_ORIGINS?: string
      NEXT_PUBLIC_SERVER_URL: string
      SLACK_BOT_TOKEN?: string
      SLACK_CONTACT_FORM_TITLE?: string
      SLACK_WEBSITE_NOTIFICATIONS_CHANNEL_ID?: string
      VERCEL_BLOB_CALLBACK_URL?: string
      VERCEL_PROJECT_PRODUCTION_URL?: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
