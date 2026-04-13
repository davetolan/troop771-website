import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "scout_change_reports_id" integer;

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'payload_locked_documents_rels_scout_change_reports_fk'
      ) THEN
        ALTER TABLE "payload_locked_documents_rels"
          ADD CONSTRAINT "payload_locked_documents_rels_scout_change_reports_fk"
          FOREIGN KEY ("scout_change_reports_id")
          REFERENCES "public"."scout_change_reports"("id")
          ON DELETE cascade
          ON UPDATE no action;
      END IF;
    END
    $$;

    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_scout_change_reports_id_idx"
      ON "payload_locked_documents_rels" USING btree ("scout_change_reports_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "payload_locked_documents_rels_scout_change_reports_id_idx";
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_scout_change_reports_fk";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "scout_change_reports_id";
  `)
}
