import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE "troop_meeting_exceptions" (
      "id" serial PRIMARY KEY NOT NULL,
      "date" timestamp(3) with time zone NOT NULL,
      "reason" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE "troop_meeting_settings" (
      "id" serial PRIMARY KEY NOT NULL,
      "summer_break_active" boolean DEFAULT false,
      "summer_break_message" varchar DEFAULT 'Troop meetings are paused for the summer. Check back soon.',
      "default_location" varchar DEFAULT 'Scout Barn',
      "alternate_location_active" boolean DEFAULT false,
      "calendar_url" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    ALTER TABLE "payload_locked_documents_rels"
      ADD COLUMN "troop_meeting_exceptions_id" integer;

    ALTER TABLE "payload_locked_documents_rels"
      ADD CONSTRAINT "payload_locked_documents_rels_troop_meeting_exceptions_fk"
      FOREIGN KEY ("troop_meeting_exceptions_id")
      REFERENCES "public"."troop_meeting_exceptions"("id")
      ON DELETE cascade
      ON UPDATE no action;

    CREATE INDEX "troop_meeting_exceptions_date_idx" ON "troop_meeting_exceptions" USING btree ("date");
    CREATE INDEX "troop_meeting_exceptions_updated_at_idx" ON "troop_meeting_exceptions" USING btree ("updated_at");
    CREATE INDEX "troop_meeting_exceptions_created_at_idx" ON "troop_meeting_exceptions" USING btree ("created_at");
    CREATE INDEX "payload_locked_documents_rels_troop_meeting_exceptions_id_idx" ON "payload_locked_documents_rels" USING btree ("troop_meeting_exceptions_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX "payload_locked_documents_rels_troop_meeting_exceptions_id_idx";
    DROP INDEX "troop_meeting_exceptions_created_at_idx";
    DROP INDEX "troop_meeting_exceptions_updated_at_idx";
    DROP INDEX "troop_meeting_exceptions_date_idx";

    ALTER TABLE "payload_locked_documents_rels"
      DROP CONSTRAINT "payload_locked_documents_rels_troop_meeting_exceptions_fk";

    ALTER TABLE "payload_locked_documents_rels"
      DROP COLUMN "troop_meeting_exceptions_id";

    DROP TABLE "troop_meeting_settings";
    DROP TABLE "troop_meeting_exceptions";
  `)
}
