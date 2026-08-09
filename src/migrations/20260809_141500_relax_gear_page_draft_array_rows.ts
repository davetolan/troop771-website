import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "gear_pages_sections" ALTER COLUMN "title" DROP NOT NULL;
    ALTER TABLE "_gear_pages_v_version_sections" ALTER COLUMN "title" DROP NOT NULL;
    ALTER TABLE "gear_pages_sections_items" ALTER COLUMN "item_id" DROP NOT NULL;
    ALTER TABLE "_gear_pages_v_version_sections_items" ALTER COLUMN "item_id" DROP NOT NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DELETE FROM "gear_pages_sections" WHERE "title" IS NULL;
    DELETE FROM "_gear_pages_v_version_sections" WHERE "title" IS NULL;
    DELETE FROM "gear_pages_sections_items" WHERE "item_id" IS NULL;
    DELETE FROM "_gear_pages_v_version_sections_items" WHERE "item_id" IS NULL;
    ALTER TABLE "gear_pages_sections" ALTER COLUMN "title" SET NOT NULL;
    ALTER TABLE "_gear_pages_v_version_sections" ALTER COLUMN "title" SET NOT NULL;
    ALTER TABLE "gear_pages_sections_items" ALTER COLUMN "item_id" SET NOT NULL;
    ALTER TABLE "_gear_pages_v_version_sections_items" ALTER COLUMN "item_id" SET NOT NULL;
  `)
}
