import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
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
  await db.execute(sql`
    ALTER TABLE "pages_blocks_activities_layout"
      ALTER COLUMN "start_date" SET NOT NULL,
      ALTER COLUMN "end_date" SET NOT NULL;

    ALTER TABLE "_pages_v_blocks_activities_layout"
      ALTER COLUMN "start_date" SET NOT NULL,
      ALTER COLUMN "end_date" SET NOT NULL;
  `)
}
