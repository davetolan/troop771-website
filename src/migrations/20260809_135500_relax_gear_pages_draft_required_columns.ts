import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "gear_pages" ALTER COLUMN "title" DROP NOT NULL;
    ALTER TABLE "gear_pages" ALTER COLUMN "slug" DROP NOT NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DELETE FROM "gear_pages" WHERE "title" IS NULL OR "slug" IS NULL;
    ALTER TABLE "gear_pages" ALTER COLUMN "title" SET NOT NULL;
    ALTER TABLE "gear_pages" ALTER COLUMN "slug" SET NOT NULL;
  `)
}
