import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_activities_status" AS ENUM('draft', 'published');
    CREATE TYPE "public"."enum__activities_v_version_status" AS ENUM('draft', 'published');
    CREATE TYPE "public"."enum_scout_change_reports_review_status" AS ENUM('pending', 'published');

    ALTER TABLE "activities"
      ADD COLUMN "_status" "enum_activities_status" DEFAULT 'draft';

    CREATE TABLE "_activities_v" (
      "id" serial PRIMARY KEY NOT NULL,
      "parent_id" integer,
      "version_month" "enum_activities_month",
      "version_year" numeric,
      "version_activity" varchar,
      "version_active" boolean DEFAULT true,
      "version_updated_at" timestamp(3) with time zone,
      "version_created_at" timestamp(3) with time zone,
      "version__status" "enum__activities_v_version_status" DEFAULT 'draft',
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "latest" boolean,
      "autosave" boolean
    );

    ALTER TABLE "scout_change_reports"
      ADD COLUMN "review_status" "enum_scout_change_reports_review_status" DEFAULT 'pending' NOT NULL,
      ADD COLUMN "reviewed_at" timestamp(3) with time zone,
      ADD COLUMN "reviewed_by_id" integer,
      ADD COLUMN "target_label" varchar;

    ALTER TABLE "_activities_v"
      ADD CONSTRAINT "_activities_v_parent_id_activities_id_fk"
      FOREIGN KEY ("parent_id")
      REFERENCES "public"."activities"("id")
      ON DELETE set null
      ON UPDATE no action;

    ALTER TABLE "scout_change_reports"
      ADD CONSTRAINT "scout_change_reports_reviewed_by_id_users_id_fk"
      FOREIGN KEY ("reviewed_by_id")
      REFERENCES "public"."users"("id")
      ON DELETE set null
      ON UPDATE no action;

    CREATE INDEX "activities__status_idx" ON "activities" USING btree ("_status");
    CREATE INDEX "_activities_v_parent_idx" ON "_activities_v" USING btree ("parent_id");
    CREATE INDEX "_activities_v_version_version_updated_at_idx" ON "_activities_v" USING btree ("version_updated_at");
    CREATE INDEX "_activities_v_version_version_created_at_idx" ON "_activities_v" USING btree ("version_created_at");
    CREATE INDEX "_activities_v_version_version__status_idx" ON "_activities_v" USING btree ("version__status");
    CREATE INDEX "_activities_v_created_at_idx" ON "_activities_v" USING btree ("created_at");
    CREATE INDEX "_activities_v_updated_at_idx" ON "_activities_v" USING btree ("updated_at");
    CREATE INDEX "_activities_v_latest_idx" ON "_activities_v" USING btree ("latest");
    CREATE INDEX "_activities_v_autosave_idx" ON "_activities_v" USING btree ("autosave");
    CREATE INDEX "scout_change_reports_review_status_idx" ON "scout_change_reports" USING btree ("review_status");
    CREATE INDEX "scout_change_reports_reviewed_by_idx" ON "scout_change_reports" USING btree ("reviewed_by_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX "activities__status_idx";
    DROP INDEX "_activities_v_parent_idx";
    DROP INDEX "_activities_v_version_version_updated_at_idx";
    DROP INDEX "_activities_v_version_version_created_at_idx";
    DROP INDEX "_activities_v_version_version__status_idx";
    DROP INDEX "_activities_v_created_at_idx";
    DROP INDEX "_activities_v_updated_at_idx";
    DROP INDEX "_activities_v_latest_idx";
    DROP INDEX "_activities_v_autosave_idx";
    DROP INDEX "scout_change_reports_review_status_idx";
    DROP INDEX "scout_change_reports_reviewed_by_idx";

    ALTER TABLE "_activities_v" DROP CONSTRAINT "_activities_v_parent_id_activities_id_fk";
    ALTER TABLE "scout_change_reports" DROP CONSTRAINT "scout_change_reports_reviewed_by_id_users_id_fk";

    ALTER TABLE "scout_change_reports"
      DROP COLUMN "review_status",
      DROP COLUMN "reviewed_at",
      DROP COLUMN "reviewed_by_id",
      DROP COLUMN "target_label";

    DROP TABLE "_activities_v";

    ALTER TABLE "activities" DROP COLUMN "_status";

    DROP TYPE "public"."enum_activities_status";
    DROP TYPE "public"."enum__activities_v_version_status";
    DROP TYPE "public"."enum_scout_change_reports_review_status";
  `)
}
