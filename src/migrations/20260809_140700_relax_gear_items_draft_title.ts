import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "gear_items" ALTER COLUMN "title" DROP NOT NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DELETE FROM "gear_items" WHERE "title" IS NULL;
    ALTER TABLE "gear_items" ALTER COLUMN "title" SET NOT NULL;
  `)
}
