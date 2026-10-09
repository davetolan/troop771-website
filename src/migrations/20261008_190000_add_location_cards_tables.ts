import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_location_cards_cards_type" AS ENUM('troopProperty', 'scoutCamp', 'statePark', 'cityPark', 'historicSite', 'wildlifeRefuge', 'whitewaterPark', 'other');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_location_cards_cards_status" AS ENUM('open', 'closed');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_location_cards_columns" AS ENUM('two', 'three');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_location_cards_cards_type" AS ENUM('troopProperty', 'scoutCamp', 'statePark', 'cityPark', 'historicSite', 'wildlifeRefuge', 'whitewaterPark', 'other');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_location_cards_cards_status" AS ENUM('open', 'closed');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_location_cards_columns" AS ENUM('two', 'three');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;

    CREATE TABLE IF NOT EXISTS "pages_blocks_location_cards_cards_best_for" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "tag" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_location_cards_cards_links" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar,
      "url" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_location_cards_cards" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar,
      "image_id" integer,
      "location" varchar,
      "drive_time" varchar,
      "type" "enum_pages_blocks_location_cards_cards_type",
      "description" varchar,
      "tip" varchar,
      "nearby" varchar,
      "status" "enum_pages_blocks_location_cards_cards_status" DEFAULT 'open',
      "status_note" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_location_cards" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "heading" varchar,
      "intro" varchar,
      "columns" "enum_pages_blocks_location_cards_columns" DEFAULT 'three',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_location_cards_cards_best_for" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "tag" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_location_cards_cards_links" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "label" varchar,
      "url" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_location_cards_cards" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar,
      "image_id" integer,
      "location" varchar,
      "drive_time" varchar,
      "type" "enum__pages_v_blocks_location_cards_cards_type",
      "description" varchar,
      "tip" varchar,
      "nearby" varchar,
      "status" "enum__pages_v_blocks_location_cards_cards_status" DEFAULT 'open',
      "status_note" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_location_cards" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "heading" varchar,
      "intro" varchar,
      "columns" "enum__pages_v_blocks_location_cards_columns" DEFAULT 'three',
      "_uuid" varchar,
      "block_name" varchar
    );

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_location_cards_cards_best_for_parent_id_fk') THEN
        ALTER TABLE "pages_blocks_location_cards_cards_best_for" ADD CONSTRAINT "pages_blocks_location_cards_cards_best_for_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_location_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_location_cards_cards_links_parent_id_fk') THEN
        ALTER TABLE "pages_blocks_location_cards_cards_links" ADD CONSTRAINT "pages_blocks_location_cards_cards_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_location_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_location_cards_cards_image_id_media_id_fk') THEN
        ALTER TABLE "pages_blocks_location_cards_cards" ADD CONSTRAINT "pages_blocks_location_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_location_cards_cards_parent_id_fk') THEN
        ALTER TABLE "pages_blocks_location_cards_cards" ADD CONSTRAINT "pages_blocks_location_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_location_cards"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_location_cards_parent_id_fk') THEN
        ALTER TABLE "pages_blocks_location_cards" ADD CONSTRAINT "pages_blocks_location_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_location_cards_cards_best_for_parent_id_fk') THEN
        ALTER TABLE "_pages_v_blocks_location_cards_cards_best_for" ADD CONSTRAINT "_pages_v_blocks_location_cards_cards_best_for_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_location_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_location_cards_cards_links_parent_id_fk') THEN
        ALTER TABLE "_pages_v_blocks_location_cards_cards_links" ADD CONSTRAINT "_pages_v_blocks_location_cards_cards_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_location_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_location_cards_cards_image_id_media_id_fk') THEN
        ALTER TABLE "_pages_v_blocks_location_cards_cards" ADD CONSTRAINT "_pages_v_blocks_location_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_location_cards_cards_parent_id_fk') THEN
        ALTER TABLE "_pages_v_blocks_location_cards_cards" ADD CONSTRAINT "_pages_v_blocks_location_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_location_cards"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_location_cards_parent_id_fk') THEN
        ALTER TABLE "_pages_v_blocks_location_cards" ADD CONSTRAINT "_pages_v_blocks_location_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;

    CREATE INDEX IF NOT EXISTS "pages_blocks_location_cards_cards_best_for_order_idx" ON "pages_blocks_location_cards_cards_best_for" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_location_cards_cards_best_for_parent_id_idx" ON "pages_blocks_location_cards_cards_best_for" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_location_cards_cards_links_order_idx" ON "pages_blocks_location_cards_cards_links" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_location_cards_cards_links_parent_id_idx" ON "pages_blocks_location_cards_cards_links" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_location_cards_cards_order_idx" ON "pages_blocks_location_cards_cards" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_location_cards_cards_parent_id_idx" ON "pages_blocks_location_cards_cards" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_location_cards_cards_image_idx" ON "pages_blocks_location_cards_cards" USING btree ("image_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_location_cards_order_idx" ON "pages_blocks_location_cards" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_location_cards_parent_id_idx" ON "pages_blocks_location_cards" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_location_cards_path_idx" ON "pages_blocks_location_cards" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_location_cards_cards_best_for_order_idx" ON "_pages_v_blocks_location_cards_cards_best_for" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_location_cards_cards_best_for_parent_id_idx" ON "_pages_v_blocks_location_cards_cards_best_for" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_location_cards_cards_links_order_idx" ON "_pages_v_blocks_location_cards_cards_links" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_location_cards_cards_links_parent_id_idx" ON "_pages_v_blocks_location_cards_cards_links" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_location_cards_cards_order_idx" ON "_pages_v_blocks_location_cards_cards" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_location_cards_cards_parent_id_idx" ON "_pages_v_blocks_location_cards_cards" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_location_cards_cards_image_idx" ON "_pages_v_blocks_location_cards_cards" USING btree ("image_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_location_cards_order_idx" ON "_pages_v_blocks_location_cards" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_location_cards_parent_id_idx" ON "_pages_v_blocks_location_cards" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_location_cards_path_idx" ON "_pages_v_blocks_location_cards" USING btree ("_path");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "pages_blocks_location_cards_cards_best_for" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_location_cards_cards_links" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_location_cards_cards" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_location_cards" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_location_cards_cards_best_for" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_location_cards_cards_links" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_location_cards_cards" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_location_cards" CASCADE;

    DROP TYPE IF EXISTS "public"."enum_pages_blocks_location_cards_cards_type";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_location_cards_cards_status";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_location_cards_columns";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_location_cards_cards_type";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_location_cards_cards_status";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_location_cards_columns";
  `)
}
