import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_activities_layout"
      ADD COLUMN "show_inactive" boolean DEFAULT false,
      DROP COLUMN "start_date",
      DROP COLUMN "end_date";

    ALTER TABLE "_pages_v_blocks_activities_layout"
      ADD COLUMN "show_inactive" boolean DEFAULT false,
      DROP COLUMN "start_date",
      DROP COLUMN "end_date";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_activities_layout"
      ADD COLUMN "start_date" timestamp(3) with time zone,
      ADD COLUMN "end_date" timestamp(3) with time zone,
      DROP COLUMN "show_inactive";

    ALTER TABLE "_pages_v_blocks_activities_layout"
      ADD COLUMN "start_date" timestamp(3) with time zone,
      ADD COLUMN "end_date" timestamp(3) with time zone,
      DROP COLUMN "show_inactive";
  `)
}
