import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_merit_badge_counselors_status" AS ENUM('draft', 'published');
    CREATE TYPE "public"."enum__merit_badge_counselors_v_version_status" AS ENUM('draft', 'published');

    CREATE TABLE "merit_badge_counselors_merit_badges" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "badge" varchar
    );

    CREATE TABLE "merit_badge_counselors" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar,
      "active" boolean DEFAULT true,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "_status" "enum_merit_badge_counselors_status" DEFAULT 'draft'
    );

    CREATE TABLE "_merit_badge_counselors_v_version_merit_badges" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "badge" varchar,
      "_uuid" varchar
    );

    CREATE TABLE "_merit_badge_counselors_v" (
      "id" serial PRIMARY KEY NOT NULL,
      "parent_id" integer,
      "version_name" varchar,
      "version_active" boolean DEFAULT true,
      "version_updated_at" timestamp(3) with time zone,
      "version_created_at" timestamp(3) with time zone,
      "version__status" "enum__merit_badge_counselors_v_version_status" DEFAULT 'draft',
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "latest" boolean,
      "autosave" boolean
    );

    CREATE TABLE "pages_blocks_merit_badge_counselors_layout" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "title" varchar,
      "description" varchar,
      "show_inactive" boolean DEFAULT false,
      "empty_message" varchar DEFAULT 'No merit badge counselors are listed yet.',
      "block_name" varchar
    );

    CREATE TABLE "_pages_v_blocks_merit_badge_counselors_layout" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "title" varchar,
      "description" varchar,
      "show_inactive" boolean DEFAULT false,
      "empty_message" varchar DEFAULT 'No merit badge counselors are listed yet.',
      "_uuid" varchar,
      "block_name" varchar
    );

    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "merit_badge_counselors_id" integer;

    ALTER TABLE "merit_badge_counselors_merit_badges"
      ADD CONSTRAINT "merit_badge_counselors_merit_badges_parent_id_fk"
      FOREIGN KEY ("_parent_id")
      REFERENCES "public"."merit_badge_counselors"("id")
      ON DELETE cascade
      ON UPDATE no action;

    ALTER TABLE "_merit_badge_counselors_v_version_merit_badges"
      ADD CONSTRAINT "_merit_badge_counselors_v_version_merit_badges_parent_id_fk"
      FOREIGN KEY ("_parent_id")
      REFERENCES "public"."_merit_badge_counselors_v"("id")
      ON DELETE cascade
      ON UPDATE no action;

    ALTER TABLE "_merit_badge_counselors_v"
      ADD CONSTRAINT "_merit_badge_counselors_v_parent_id_merit_badge_counselors_id_fk"
      FOREIGN KEY ("parent_id")
      REFERENCES "public"."merit_badge_counselors"("id")
      ON DELETE set null
      ON UPDATE no action;

    ALTER TABLE "pages_blocks_merit_badge_counselors_layout"
      ADD CONSTRAINT "pages_blocks_merit_badge_counselors_layout_parent_id_fk"
      FOREIGN KEY ("_parent_id")
      REFERENCES "public"."pages"("id")
      ON DELETE cascade
      ON UPDATE no action;

    ALTER TABLE "_pages_v_blocks_merit_badge_counselors_layout"
      ADD CONSTRAINT "_pages_v_blocks_merit_badge_counselors_layout_parent_id_fk"
      FOREIGN KEY ("_parent_id")
      REFERENCES "public"."_pages_v"("id")
      ON DELETE cascade
      ON UPDATE no action;

    ALTER TABLE "payload_locked_documents_rels"
      ADD CONSTRAINT "payload_locked_documents_rels_merit_badge_counselors_fk"
      FOREIGN KEY ("merit_badge_counselors_id")
      REFERENCES "public"."merit_badge_counselors"("id")
      ON DELETE cascade
      ON UPDATE no action;

    CREATE INDEX "merit_badge_counselors_merit_badges_order_idx" ON "merit_badge_counselors_merit_badges" USING btree ("_order");
    CREATE INDEX "merit_badge_counselors_merit_badges_parent_id_idx" ON "merit_badge_counselors_merit_badges" USING btree ("_parent_id");
    CREATE INDEX "merit_badge_counselors_updated_at_idx" ON "merit_badge_counselors" USING btree ("updated_at");
    CREATE INDEX "merit_badge_counselors_created_at_idx" ON "merit_badge_counselors" USING btree ("created_at");
    CREATE INDEX "merit_badge_counselors__status_idx" ON "merit_badge_counselors" USING btree ("_status");
    CREATE INDEX "_merit_badge_counselors_v_version_merit_badges_order_idx" ON "_merit_badge_counselors_v_version_merit_badges" USING btree ("_order");
    CREATE INDEX "_merit_badge_counselors_v_version_merit_badges_parent_id_idx" ON "_merit_badge_counselors_v_version_merit_badges" USING btree ("_parent_id");
    CREATE INDEX "_merit_badge_counselors_v_parent_idx" ON "_merit_badge_counselors_v" USING btree ("parent_id");
    CREATE INDEX "_merit_badge_counselors_v_version_version_updated_at_idx" ON "_merit_badge_counselors_v" USING btree ("version_updated_at");
    CREATE INDEX "_merit_badge_counselors_v_version_version_created_at_idx" ON "_merit_badge_counselors_v" USING btree ("version_created_at");
    CREATE INDEX "_merit_badge_counselors_v_version_version__status_idx" ON "_merit_badge_counselors_v" USING btree ("version__status");
    CREATE INDEX "_merit_badge_counselors_v_created_at_idx" ON "_merit_badge_counselors_v" USING btree ("created_at");
    CREATE INDEX "_merit_badge_counselors_v_updated_at_idx" ON "_merit_badge_counselors_v" USING btree ("updated_at");
    CREATE INDEX "_merit_badge_counselors_v_latest_idx" ON "_merit_badge_counselors_v" USING btree ("latest");
    CREATE INDEX "_merit_badge_counselors_v_autosave_idx" ON "_merit_badge_counselors_v" USING btree ("autosave");
    CREATE INDEX "pages_blocks_merit_badge_counselors_layout_order_idx" ON "pages_blocks_merit_badge_counselors_layout" USING btree ("_order");
    CREATE INDEX "pages_blocks_merit_badge_counselors_layout_parent_id_idx" ON "pages_blocks_merit_badge_counselors_layout" USING btree ("_parent_id");
    CREATE INDEX "pages_blocks_merit_badge_counselors_layout_path_idx" ON "pages_blocks_merit_badge_counselors_layout" USING btree ("_path");
    CREATE INDEX "_pages_v_blocks_merit_badge_counselors_layout_order_idx" ON "_pages_v_blocks_merit_badge_counselors_layout" USING btree ("_order");
    CREATE INDEX "_pages_v_blocks_merit_badge_counselors_layout_parent_id_idx" ON "_pages_v_blocks_merit_badge_counselors_layout" USING btree ("_parent_id");
    CREATE INDEX "_pages_v_blocks_merit_badge_counselors_layout_path_idx" ON "_pages_v_blocks_merit_badge_counselors_layout" USING btree ("_path");
    CREATE INDEX "payload_locked_documents_rels_merit_badge_counselors_id_idx" ON "payload_locked_documents_rels" USING btree ("merit_badge_counselors_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX "payload_locked_documents_rels_merit_badge_counselors_id_idx";
    DROP INDEX "_pages_v_blocks_merit_badge_counselors_layout_path_idx";
    DROP INDEX "_pages_v_blocks_merit_badge_counselors_layout_parent_id_idx";
    DROP INDEX "_pages_v_blocks_merit_badge_counselors_layout_order_idx";
    DROP INDEX "pages_blocks_merit_badge_counselors_layout_path_idx";
    DROP INDEX "pages_blocks_merit_badge_counselors_layout_parent_id_idx";
    DROP INDEX "pages_blocks_merit_badge_counselors_layout_order_idx";
    DROP INDEX "_merit_badge_counselors_v_autosave_idx";
    DROP INDEX "_merit_badge_counselors_v_latest_idx";
    DROP INDEX "_merit_badge_counselors_v_updated_at_idx";
    DROP INDEX "_merit_badge_counselors_v_created_at_idx";
    DROP INDEX "_merit_badge_counselors_v_version_version__status_idx";
    DROP INDEX "_merit_badge_counselors_v_version_version_created_at_idx";
    DROP INDEX "_merit_badge_counselors_v_version_version_updated_at_idx";
    DROP INDEX "_merit_badge_counselors_v_parent_idx";
    DROP INDEX "_merit_badge_counselors_v_version_merit_badges_parent_id_idx";
    DROP INDEX "_merit_badge_counselors_v_version_merit_badges_order_idx";
    DROP INDEX "merit_badge_counselors__status_idx";
    DROP INDEX "merit_badge_counselors_created_at_idx";
    DROP INDEX "merit_badge_counselors_updated_at_idx";
    DROP INDEX "merit_badge_counselors_merit_badges_parent_id_idx";
    DROP INDEX "merit_badge_counselors_merit_badges_order_idx";

    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_merit_badge_counselors_fk";
    ALTER TABLE "_pages_v_blocks_merit_badge_counselors_layout" DROP CONSTRAINT "_pages_v_blocks_merit_badge_counselors_layout_parent_id_fk";
    ALTER TABLE "pages_blocks_merit_badge_counselors_layout" DROP CONSTRAINT "pages_blocks_merit_badge_counselors_layout_parent_id_fk";
    ALTER TABLE "_merit_badge_counselors_v" DROP CONSTRAINT "_merit_badge_counselors_v_parent_id_merit_badge_counselors_id_fk";
    ALTER TABLE "_merit_badge_counselors_v_version_merit_badges" DROP CONSTRAINT "_merit_badge_counselors_v_version_merit_badges_parent_id_fk";
    ALTER TABLE "merit_badge_counselors_merit_badges" DROP CONSTRAINT "merit_badge_counselors_merit_badges_parent_id_fk";

    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "merit_badge_counselors_id";

    DROP TABLE "_pages_v_blocks_merit_badge_counselors_layout";
    DROP TABLE "pages_blocks_merit_badge_counselors_layout";
    DROP TABLE "_merit_badge_counselors_v_version_merit_badges";
    DROP TABLE "_merit_badge_counselors_v";
    DROP TABLE "merit_badge_counselors_merit_badges";
    DROP TABLE "merit_badge_counselors";

    DROP TYPE "public"."enum__merit_badge_counselors_v_version_status";
    DROP TYPE "public"."enum_merit_badge_counselors_status";
  `)
}
