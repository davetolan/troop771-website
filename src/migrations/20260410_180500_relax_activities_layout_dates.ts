import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

// On a database built by replaying the full migration history from scratch, this migration
// runs before `20260410_223800_add_activities_layout_block` creates the table it alters — that
// later migration already defines `start_date`/`end_date` as nullable, so there's nothing to
// relax yet. Guard on the table's existence instead of failing; already-migrated environments
// (where the table already exists) are unaffected.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  const { rows } = await db.execute(sql`
    SELECT to_regclass('public.pages_blocks_activities_layout') IS NOT NULL AS "exists"
  `)

  if (!rows[0]?.exists) {
    return
  }

  await db.execute(sql`
    ALTER TABLE "pages_blocks_activities_layout"
      ALTER COLUMN "start_date" DROP NOT NULL,
      ALTER COLUMN "end_date" DROP NOT NULL;

    ALTER TABLE "_pages_v_blocks_activities_layout"
      ALTER COLUMN "start_date" DROP NOT NULL,
      ALTER COLUMN "end_date" DROP NOT NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  const { rows } = await db.execute(sql`
    SELECT to_regclass('public.pages_blocks_activities_layout') IS NOT NULL AS "exists"
  `)

  if (!rows[0]?.exists) {
    return
  }

  await db.execute(sql`
    ALTER TABLE "pages_blocks_activities_layout"
      ALTER COLUMN "start_date" SET NOT NULL,
      ALTER COLUMN "end_date" SET NOT NULL;

    ALTER TABLE "_pages_v_blocks_activities_layout"
      ALTER COLUMN "start_date" SET NOT NULL,
      ALTER COLUMN "end_date" SET NOT NULL;
  `)
}
