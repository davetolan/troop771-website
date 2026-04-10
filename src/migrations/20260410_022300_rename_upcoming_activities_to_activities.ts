import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "upcoming_activities" RENAME TO "activities";
    ALTER TYPE "public"."enum_upcoming_activities_month" RENAME TO "enum_activities_month";

    ALTER TABLE "payload_locked_documents_rels"
      RENAME COLUMN "upcoming_activities_id" TO "activities_id";

    ALTER TABLE "payload_locked_documents_rels"
      RENAME CONSTRAINT "payload_locked_documents_rels_upcoming_activities_fk"
      TO "payload_locked_documents_rels_activities_fk";

    ALTER INDEX "payload_locked_documents_rels_upcoming_activities_id_idx"
      RENAME TO "payload_locked_documents_rels_activities_id_idx";

    ALTER TABLE "activities"
      ADD COLUMN "active" boolean DEFAULT true NOT NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "activities" DROP COLUMN "active";

    ALTER INDEX "payload_locked_documents_rels_activities_id_idx"
      RENAME TO "payload_locked_documents_rels_upcoming_activities_id_idx";

    ALTER TABLE "payload_locked_documents_rels"
      RENAME CONSTRAINT "payload_locked_documents_rels_activities_fk"
      TO "payload_locked_documents_rels_upcoming_activities_fk";

    ALTER TABLE "payload_locked_documents_rels"
      RENAME COLUMN "activities_id" TO "upcoming_activities_id";

    ALTER TYPE "public"."enum_activities_month" RENAME TO "enum_upcoming_activities_month";
    ALTER TABLE "activities" RENAME TO "upcoming_activities";
  `)
}
