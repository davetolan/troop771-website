import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "troop_meeting_settings"
      ADD COLUMN IF NOT EXISTS "summer_break_message" varchar DEFAULT 'Troop meetings are paused for the summer. Check back soon.';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "troop_meeting_settings"
      DROP COLUMN IF EXISTS "summer_break_message";
  `)
}
