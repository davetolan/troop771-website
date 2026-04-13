import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_scout_change_reports_actor_role" AS ENUM('scout');
    CREATE TYPE "public"."enum_scout_change_reports_action" AS ENUM('create', 'update', 'delete');
    CREATE TYPE "public"."enum_scout_change_reports_target_type" AS ENUM('collection', 'global');

    CREATE TABLE "scout_change_reports" (
      "id" serial PRIMARY KEY NOT NULL,
      "occurred_at" timestamp(3) with time zone NOT NULL,
      "actor_id" integer NOT NULL,
      "actor_name" varchar,
      "actor_email" varchar NOT NULL,
      "actor_role" "enum_scout_change_reports_actor_role" NOT NULL,
      "action" "enum_scout_change_reports_action" NOT NULL,
      "target_type" "enum_scout_change_reports_target_type" NOT NULL,
      "target_slug" varchar NOT NULL,
      "target_id" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE "scout_change_reports_changed_fields" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "field" varchar NOT NULL
    );

    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "scout_change_reports_id" integer;

    ALTER TABLE "scout_change_reports" ADD CONSTRAINT "scout_change_reports_actor_id_users_id_fk" FOREIGN KEY ("actor_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
    ALTER TABLE "scout_change_reports_changed_fields" ADD CONSTRAINT "scout_change_reports_changed_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."scout_change_reports"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_scout_change_reports_fk" FOREIGN KEY ("scout_change_reports_id") REFERENCES "public"."scout_change_reports"("id") ON DELETE cascade ON UPDATE no action;

    CREATE INDEX "scout_change_reports_occurred_at_idx" ON "scout_change_reports" USING btree ("occurred_at");
    CREATE INDEX "scout_change_reports_actor_idx" ON "scout_change_reports" USING btree ("actor_id");
    CREATE INDEX "scout_change_reports_updated_at_idx" ON "scout_change_reports" USING btree ("updated_at");
    CREATE INDEX "scout_change_reports_created_at_idx" ON "scout_change_reports" USING btree ("created_at");
    CREATE INDEX "scout_change_reports_changed_fields_order_idx" ON "scout_change_reports_changed_fields" USING btree ("_order");
    CREATE INDEX "scout_change_reports_changed_fields_parent_id_idx" ON "scout_change_reports_changed_fields" USING btree ("_parent_id");
    CREATE INDEX "payload_locked_documents_rels_scout_change_reports_id_idx" ON "payload_locked_documents_rels" USING btree ("scout_change_reports_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX "scout_change_reports_occurred_at_idx";
    DROP INDEX "scout_change_reports_actor_idx";
    DROP INDEX "scout_change_reports_updated_at_idx";
    DROP INDEX "scout_change_reports_created_at_idx";
    DROP INDEX "scout_change_reports_changed_fields_order_idx";
    DROP INDEX "scout_change_reports_changed_fields_parent_id_idx";
    DROP INDEX "payload_locked_documents_rels_scout_change_reports_id_idx";

    ALTER TABLE "scout_change_reports" DROP CONSTRAINT "scout_change_reports_actor_id_users_id_fk";
    ALTER TABLE "scout_change_reports_changed_fields" DROP CONSTRAINT "scout_change_reports_changed_fields_parent_id_fk";
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_scout_change_reports_fk";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "scout_change_reports_id";

    DROP TABLE "scout_change_reports_changed_fields";
    DROP TABLE "scout_change_reports";

    DROP TYPE "public"."enum_scout_change_reports_actor_role";
    DROP TYPE "public"."enum_scout_change_reports_action";
    DROP TYPE "public"."enum_scout_change_reports_target_type";
  `)
}
