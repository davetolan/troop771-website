import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE "eagle_project_fundraising" (
      "id" serial PRIMARY KEY NOT NULL,
      "kason_raised" numeric DEFAULT 356 NOT NULL,
      "kason_last_updated" varchar DEFAULT 'TBD',
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE "eagle_project_fundraising";
  `)
}
