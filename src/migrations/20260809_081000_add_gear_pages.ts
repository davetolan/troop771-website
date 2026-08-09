import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_gear_pages_sections_items_status" AS ENUM('required', 'recommended', 'optional');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_gear_pages_status" AS ENUM('draft', 'published');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__gear_pages_v_version_sections_items_status" AS ENUM('required', 'recommended', 'optional');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__gear_pages_v_version_status" AS ENUM('draft', 'published');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_gear_items_category" AS ENUM(
        'general',
        'clothing',
        'footwear',
        'sleeping-gear',
        'packs-bags',
        'cooking-food',
        'water',
        'health-first-aid',
        'navigation-safety',
        'optional'
      );
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_gear_items_status" AS ENUM('draft', 'published');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__gear_items_v_version_category" AS ENUM(
        'general',
        'clothing',
        'footwear',
        'sleeping-gear',
        'packs-bags',
        'cooking-food',
        'water',
        'health-first-aid',
        'navigation-safety',
        'optional'
      );
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__gear_items_v_version_status" AS ENUM('draft', 'published');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE TABLE IF NOT EXISTS "gear_pages" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "intro" varchar,
      "hero_image_id" integer,
      "disclosure_show_disclosure" boolean DEFAULT false,
      "disclosure_disclosure_text" varchar DEFAULT 'Some links may help support Troop 771 at no additional cost to you. Choose the option that works best for your Scout.',
      "content" jsonb,
      "meta_title" varchar,
      "meta_image_id" integer,
      "meta_description" varchar,
      "published_at" timestamp(3) with time zone,
      "generate_slug" boolean DEFAULT true,
      "slug" varchar NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "_status" "enum_gear_pages_status" DEFAULT 'draft'
    );

    CREATE TABLE IF NOT EXISTS "gear_pages_sections" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar
    );

    CREATE TABLE IF NOT EXISTS "gear_pages_sections_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "item_id" integer NOT NULL,
      "quantity" varchar,
      "status" "enum_gear_pages_sections_items_status" DEFAULT 'required' NOT NULL,
      "hide_vendor_links" boolean DEFAULT false,
      "note" varchar
    );

    CREATE TABLE IF NOT EXISTS "_gear_pages_v" (
      "id" serial PRIMARY KEY NOT NULL,
      "parent_id" integer,
      "version_title" varchar,
      "version_intro" varchar,
      "version_hero_image_id" integer,
      "version_disclosure_show_disclosure" boolean DEFAULT false,
      "version_disclosure_disclosure_text" varchar DEFAULT 'Some links may help support Troop 771 at no additional cost to you. Choose the option that works best for your Scout.',
      "version_content" jsonb,
      "version_meta_title" varchar,
      "version_meta_image_id" integer,
      "version_meta_description" varchar,
      "version_published_at" timestamp(3) with time zone,
      "version_generate_slug" boolean DEFAULT true,
      "version_slug" varchar,
      "version_updated_at" timestamp(3) with time zone,
      "version_created_at" timestamp(3) with time zone,
      "version__status" "enum__gear_pages_v_version_status" DEFAULT 'draft',
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "latest" boolean,
      "autosave" boolean
    );

    CREATE TABLE IF NOT EXISTS "_gear_pages_v_version_sections" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "_gear_pages_v_version_sections_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "item_id" integer NOT NULL,
      "quantity" varchar,
      "status" "enum__gear_pages_v_version_sections_items_status" DEFAULT 'required' NOT NULL,
      "hide_vendor_links" boolean DEFAULT false,
      "note" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "gear_items" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "category" "enum_gear_items_category" DEFAULT 'general' NOT NULL,
      "summary" varchar,
      "image_id" integer,
      "amazon_url" varchar,
      "rei_url" varchar,
      "guidance" jsonb,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "_status" "enum_gear_items_status" DEFAULT 'draft'
    );

    CREATE TABLE IF NOT EXISTS "_gear_items_v" (
      "id" serial PRIMARY KEY NOT NULL,
      "parent_id" integer,
      "version_title" varchar,
      "version_category" "enum__gear_items_v_version_category" DEFAULT 'general' NOT NULL,
      "version_summary" varchar,
      "version_image_id" integer,
      "version_amazon_url" varchar,
      "version_rei_url" varchar,
      "version_guidance" jsonb,
      "version_updated_at" timestamp(3) with time zone,
      "version_created_at" timestamp(3) with time zone,
      "version__status" "enum__gear_items_v_version_status" DEFAULT 'draft',
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "latest" boolean,
      "autosave" boolean
    );

    ALTER TABLE "gear_pages"
      ADD CONSTRAINT "gear_pages_hero_image_id_media_id_fk"
      FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "gear_pages"
      ADD CONSTRAINT "gear_pages_meta_image_id_media_id_fk"
      FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "gear_pages_sections"
      ADD CONSTRAINT "gear_pages_sections_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."gear_pages"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "gear_pages_sections_items"
      ADD CONSTRAINT "gear_pages_sections_items_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."gear_pages_sections"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "gear_pages_sections_items"
      ADD CONSTRAINT "gear_pages_sections_items_item_id_gear_items_id_fk"
      FOREIGN KEY ("item_id") REFERENCES "public"."gear_items"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_gear_pages_v"
      ADD CONSTRAINT "_gear_pages_v_parent_id_gear_pages_id_fk"
      FOREIGN KEY ("parent_id") REFERENCES "public"."gear_pages"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_gear_pages_v"
      ADD CONSTRAINT "_gear_pages_v_version_hero_image_id_media_id_fk"
      FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_gear_pages_v"
      ADD CONSTRAINT "_gear_pages_v_version_meta_image_id_media_id_fk"
      FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_gear_pages_v_version_sections"
      ADD CONSTRAINT "_gear_pages_v_version_sections_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."_gear_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "_gear_pages_v_version_sections_items"
      ADD CONSTRAINT "_gear_pages_v_version_sections_items_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."_gear_pages_v_version_sections"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "_gear_pages_v_version_sections_items"
      ADD CONSTRAINT "_gear_pages_v_version_sections_items_item_id_gear_items_id_fk"
      FOREIGN KEY ("item_id") REFERENCES "public"."gear_items"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "gear_items"
      ADD CONSTRAINT "gear_items_image_id_media_id_fk"
      FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_gear_items_v"
      ADD CONSTRAINT "_gear_items_v_parent_id_gear_items_id_fk"
      FOREIGN KEY ("parent_id") REFERENCES "public"."gear_items"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_gear_items_v"
      ADD CONSTRAINT "_gear_items_v_version_image_id_media_id_fk"
      FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

    ALTER TABLE "pages_rels" ADD COLUMN IF NOT EXISTS "gear_pages_id" integer;
    ALTER TABLE "_pages_v_rels" ADD COLUMN IF NOT EXISTS "gear_pages_id" integer;
    ALTER TABLE "header_rels" ADD COLUMN IF NOT EXISTS "gear_pages_id" integer;
    ALTER TABLE "footer_rels" ADD COLUMN IF NOT EXISTS "gear_pages_id" integer;
    ALTER TABLE "header_nav_items_sub_items_rels" ADD COLUMN IF NOT EXISTS "gear_pages_id" integer;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "gear_pages_id" integer;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "gear_items_id" integer;

    ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_gear_pages_fk" FOREIGN KEY ("gear_pages_id") REFERENCES "public"."gear_pages"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_gear_pages_fk" FOREIGN KEY ("gear_pages_id") REFERENCES "public"."gear_pages"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_gear_pages_fk" FOREIGN KEY ("gear_pages_id") REFERENCES "public"."gear_pages"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_gear_pages_fk" FOREIGN KEY ("gear_pages_id") REFERENCES "public"."gear_pages"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "header_nav_items_sub_items_rels" ADD CONSTRAINT "header_nav_items_sub_items_rels_gear_pages_fk" FOREIGN KEY ("gear_pages_id") REFERENCES "public"."gear_pages"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gear_pages_fk" FOREIGN KEY ("gear_pages_id") REFERENCES "public"."gear_pages"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gear_items_fk" FOREIGN KEY ("gear_items_id") REFERENCES "public"."gear_items"("id") ON DELETE cascade ON UPDATE no action;

    CREATE INDEX IF NOT EXISTS "gear_pages_hero_image_idx" ON "gear_pages" USING btree ("hero_image_id");
    CREATE INDEX IF NOT EXISTS "gear_pages_meta_image_idx" ON "gear_pages" USING btree ("meta_image_id");
    CREATE INDEX IF NOT EXISTS "gear_pages_slug_idx" ON "gear_pages" USING btree ("slug");
    CREATE INDEX IF NOT EXISTS "gear_pages_updated_at_idx" ON "gear_pages" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "gear_pages_created_at_idx" ON "gear_pages" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "gear_pages__status_idx" ON "gear_pages" USING btree ("_status");
    CREATE INDEX IF NOT EXISTS "gear_pages_sections_order_idx" ON "gear_pages_sections" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "gear_pages_sections_parent_id_idx" ON "gear_pages_sections" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "gear_pages_sections_items_order_idx" ON "gear_pages_sections_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "gear_pages_sections_items_parent_id_idx" ON "gear_pages_sections_items" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "gear_pages_sections_items_item_idx" ON "gear_pages_sections_items" USING btree ("item_id");
    CREATE INDEX IF NOT EXISTS "_gear_pages_v_parent_idx" ON "_gear_pages_v" USING btree ("parent_id");
    CREATE INDEX IF NOT EXISTS "_gear_pages_v_version_hero_image_idx" ON "_gear_pages_v" USING btree ("version_hero_image_id");
    CREATE INDEX IF NOT EXISTS "_gear_pages_v_version_meta_image_idx" ON "_gear_pages_v" USING btree ("version_meta_image_id");
    CREATE INDEX IF NOT EXISTS "_gear_pages_v_version_version_slug_idx" ON "_gear_pages_v" USING btree ("version_slug");
    CREATE INDEX IF NOT EXISTS "_gear_pages_v_version_version_updated_at_idx" ON "_gear_pages_v" USING btree ("version_updated_at");
    CREATE INDEX IF NOT EXISTS "_gear_pages_v_version_version_created_at_idx" ON "_gear_pages_v" USING btree ("version_created_at");
    CREATE INDEX IF NOT EXISTS "_gear_pages_v_version_version__status_idx" ON "_gear_pages_v" USING btree ("version__status");
    CREATE INDEX IF NOT EXISTS "_gear_pages_v_created_at_idx" ON "_gear_pages_v" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "_gear_pages_v_updated_at_idx" ON "_gear_pages_v" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "_gear_pages_v_latest_idx" ON "_gear_pages_v" USING btree ("latest");
    CREATE INDEX IF NOT EXISTS "_gear_pages_v_autosave_idx" ON "_gear_pages_v" USING btree ("autosave");
    CREATE INDEX IF NOT EXISTS "_gear_pages_v_version_sections_order_idx" ON "_gear_pages_v_version_sections" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_gear_pages_v_version_sections_parent_id_idx" ON "_gear_pages_v_version_sections" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_gear_pages_v_version_sections_items_order_idx" ON "_gear_pages_v_version_sections_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_gear_pages_v_version_sections_items_parent_id_idx" ON "_gear_pages_v_version_sections_items" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_gear_pages_v_version_sections_items_item_idx" ON "_gear_pages_v_version_sections_items" USING btree ("item_id");
    CREATE INDEX IF NOT EXISTS "gear_items_image_idx" ON "gear_items" USING btree ("image_id");
    CREATE INDEX IF NOT EXISTS "gear_items_updated_at_idx" ON "gear_items" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "gear_items_created_at_idx" ON "gear_items" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "gear_items__status_idx" ON "gear_items" USING btree ("_status");
    CREATE INDEX IF NOT EXISTS "_gear_items_v_parent_idx" ON "_gear_items_v" USING btree ("parent_id");
    CREATE INDEX IF NOT EXISTS "_gear_items_v_version_image_idx" ON "_gear_items_v" USING btree ("version_image_id");
    CREATE INDEX IF NOT EXISTS "_gear_items_v_version_version_updated_at_idx" ON "_gear_items_v" USING btree ("version_updated_at");
    CREATE INDEX IF NOT EXISTS "_gear_items_v_version_version_created_at_idx" ON "_gear_items_v" USING btree ("version_created_at");
    CREATE INDEX IF NOT EXISTS "_gear_items_v_version_version__status_idx" ON "_gear_items_v" USING btree ("version__status");
    CREATE INDEX IF NOT EXISTS "_gear_items_v_created_at_idx" ON "_gear_items_v" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "_gear_items_v_updated_at_idx" ON "_gear_items_v" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "_gear_items_v_latest_idx" ON "_gear_items_v" USING btree ("latest");
    CREATE INDEX IF NOT EXISTS "_gear_items_v_autosave_idx" ON "_gear_items_v" USING btree ("autosave");
    CREATE INDEX IF NOT EXISTS "pages_rels_gear_pages_id_idx" ON "pages_rels" USING btree ("gear_pages_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_rels_gear_pages_id_idx" ON "_pages_v_rels" USING btree ("gear_pages_id");
    CREATE INDEX IF NOT EXISTS "header_rels_gear_pages_id_idx" ON "header_rels" USING btree ("gear_pages_id");
    CREATE INDEX IF NOT EXISTS "footer_rels_gear_pages_id_idx" ON "footer_rels" USING btree ("gear_pages_id");
    CREATE INDEX IF NOT EXISTS "header_nav_items_sub_items_rels_gear_pages_id_idx" ON "header_nav_items_sub_items_rels" USING btree ("gear_pages_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_gear_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("gear_pages_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_gear_items_id_idx" ON "payload_locked_documents_rels" USING btree ("gear_items_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "payload_locked_documents_rels_gear_items_id_idx";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_gear_pages_id_idx";
    DROP INDEX IF EXISTS "header_nav_items_sub_items_rels_gear_pages_id_idx";
    DROP INDEX IF EXISTS "footer_rels_gear_pages_id_idx";
    DROP INDEX IF EXISTS "header_rels_gear_pages_id_idx";
    DROP INDEX IF EXISTS "_pages_v_rels_gear_pages_id_idx";
    DROP INDEX IF EXISTS "pages_rels_gear_pages_id_idx";
    DROP INDEX IF EXISTS "_gear_items_v_autosave_idx";
    DROP INDEX IF EXISTS "_gear_items_v_latest_idx";
    DROP INDEX IF EXISTS "_gear_items_v_updated_at_idx";
    DROP INDEX IF EXISTS "_gear_items_v_created_at_idx";
    DROP INDEX IF EXISTS "_gear_items_v_version_version__status_idx";
    DROP INDEX IF EXISTS "_gear_items_v_version_version_created_at_idx";
    DROP INDEX IF EXISTS "_gear_items_v_version_version_updated_at_idx";
    DROP INDEX IF EXISTS "_gear_items_v_version_image_idx";
    DROP INDEX IF EXISTS "_gear_items_v_parent_idx";
    DROP INDEX IF EXISTS "gear_items__status_idx";
    DROP INDEX IF EXISTS "gear_items_created_at_idx";
    DROP INDEX IF EXISTS "gear_items_updated_at_idx";
    DROP INDEX IF EXISTS "gear_items_image_idx";
    DROP INDEX IF EXISTS "_gear_pages_v_version_sections_items_item_idx";
    DROP INDEX IF EXISTS "_gear_pages_v_version_sections_items_parent_id_idx";
    DROP INDEX IF EXISTS "_gear_pages_v_version_sections_items_order_idx";
    DROP INDEX IF EXISTS "_gear_pages_v_version_sections_parent_id_idx";
    DROP INDEX IF EXISTS "_gear_pages_v_version_sections_order_idx";
    DROP INDEX IF EXISTS "_gear_pages_v_autosave_idx";
    DROP INDEX IF EXISTS "_gear_pages_v_latest_idx";
    DROP INDEX IF EXISTS "_gear_pages_v_updated_at_idx";
    DROP INDEX IF EXISTS "_gear_pages_v_created_at_idx";
    DROP INDEX IF EXISTS "_gear_pages_v_version_version__status_idx";
    DROP INDEX IF EXISTS "_gear_pages_v_version_version_created_at_idx";
    DROP INDEX IF EXISTS "_gear_pages_v_version_version_updated_at_idx";
    DROP INDEX IF EXISTS "_gear_pages_v_version_version_slug_idx";
    DROP INDEX IF EXISTS "_gear_pages_v_version_meta_image_idx";
    DROP INDEX IF EXISTS "_gear_pages_v_version_hero_image_idx";
    DROP INDEX IF EXISTS "_gear_pages_v_parent_idx";
    DROP INDEX IF EXISTS "gear_pages_sections_items_item_idx";
    DROP INDEX IF EXISTS "gear_pages_sections_items_parent_id_idx";
    DROP INDEX IF EXISTS "gear_pages_sections_items_order_idx";
    DROP INDEX IF EXISTS "gear_pages_sections_parent_id_idx";
    DROP INDEX IF EXISTS "gear_pages_sections_order_idx";
    DROP INDEX IF EXISTS "gear_pages__status_idx";
    DROP INDEX IF EXISTS "gear_pages_created_at_idx";
    DROP INDEX IF EXISTS "gear_pages_updated_at_idx";
    DROP INDEX IF EXISTS "gear_pages_slug_idx";
    DROP INDEX IF EXISTS "gear_pages_meta_image_idx";
    DROP INDEX IF EXISTS "gear_pages_hero_image_idx";

    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_gear_items_fk";
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_gear_pages_fk";
    ALTER TABLE "header_nav_items_sub_items_rels" DROP CONSTRAINT IF EXISTS "header_nav_items_sub_items_rels_gear_pages_fk";
    ALTER TABLE "footer_rels" DROP CONSTRAINT IF EXISTS "footer_rels_gear_pages_fk";
    ALTER TABLE "header_rels" DROP CONSTRAINT IF EXISTS "header_rels_gear_pages_fk";
    ALTER TABLE "_pages_v_rels" DROP CONSTRAINT IF EXISTS "_pages_v_rels_gear_pages_fk";
    ALTER TABLE "pages_rels" DROP CONSTRAINT IF EXISTS "pages_rels_gear_pages_fk";

    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "gear_items_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "gear_pages_id";
    ALTER TABLE "header_nav_items_sub_items_rels" DROP COLUMN IF EXISTS "gear_pages_id";
    ALTER TABLE "footer_rels" DROP COLUMN IF EXISTS "gear_pages_id";
    ALTER TABLE "header_rels" DROP COLUMN IF EXISTS "gear_pages_id";
    ALTER TABLE "_pages_v_rels" DROP COLUMN IF EXISTS "gear_pages_id";
    ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "gear_pages_id";

    DROP TABLE IF EXISTS "_gear_items_v" CASCADE;
    DROP TABLE IF EXISTS "gear_items" CASCADE;
    DROP TABLE IF EXISTS "_gear_pages_v_version_sections_items" CASCADE;
    DROP TABLE IF EXISTS "_gear_pages_v_version_sections" CASCADE;
    DROP TABLE IF EXISTS "_gear_pages_v" CASCADE;
    DROP TABLE IF EXISTS "gear_pages_sections_items" CASCADE;
    DROP TABLE IF EXISTS "gear_pages_sections" CASCADE;
    DROP TABLE IF EXISTS "gear_pages" CASCADE;

    DROP TYPE IF EXISTS "public"."enum__gear_items_v_version_status";
    DROP TYPE IF EXISTS "public"."enum__gear_items_v_version_category";
    DROP TYPE IF EXISTS "public"."enum_gear_items_status";
    DROP TYPE IF EXISTS "public"."enum_gear_items_category";
    DROP TYPE IF EXISTS "public"."enum__gear_pages_v_version_status";
    DROP TYPE IF EXISTS "public"."enum__gear_pages_v_version_sections_items_status";
    DROP TYPE IF EXISTS "public"."enum_gear_pages_status";
    DROP TYPE IF EXISTS "public"."enum_gear_pages_sections_items_status";
  `)
}
