import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "gear_pages" ADD COLUMN IF NOT EXISTS "_order" varchar;
    ALTER TABLE "_gear_pages_v" ADD COLUMN IF NOT EXISTS "version__order" varchar;

    CREATE INDEX IF NOT EXISTS "gear_pages__order_idx" ON "gear_pages" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_gear_pages_v_version_version__order_idx" ON "_gear_pages_v" USING btree ("version__order");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "gear_pages__order_idx";
    DROP INDEX IF EXISTS "_gear_pages_v_version_version__order_idx";

    ALTER TABLE "gear_pages" DROP COLUMN IF EXISTS "_order";
    ALTER TABLE "_gear_pages_v" DROP COLUMN IF EXISTS "version__order";
  `)
}
