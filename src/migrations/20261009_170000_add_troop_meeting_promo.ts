import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "troop_meeting_settings"
      ADD COLUMN IF NOT EXISTS "promo_enabled" boolean DEFAULT false,
      ADD COLUMN IF NOT EXISTS "promo_message" varchar,
      ADD COLUMN IF NOT EXISTS "promo_link_label" varchar DEFAULT 'Sign up',
      ADD COLUMN IF NOT EXISTS "promo_link_url" varchar,
      ADD COLUMN IF NOT EXISTS "promo_expires_at" timestamp(3) with time zone;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "troop_meeting_settings"
      DROP COLUMN IF EXISTS "promo_enabled",
      DROP COLUMN IF EXISTS "promo_message",
      DROP COLUMN IF EXISTS "promo_link_label",
      DROP COLUMN IF EXISTS "promo_link_url",
      DROP COLUMN IF EXISTS "promo_expires_at";
  `)
}
