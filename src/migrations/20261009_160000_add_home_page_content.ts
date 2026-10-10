import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_hero_highlights_icon" AS ENUM('none', 'mountain', 'tentTree', 'compass', 'heartHandshake', 'fish', 'trees', 'waves', 'wavesLadder', 'shipWheel', 'anchor', 'shieldCheck');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_version_hero_highlights_icon" AS ENUM('none', 'mountain', 'tentTree', 'compass', 'heartHandshake', 'fish', 'trees', 'waves', 'wavesLadder', 'shipWheel', 'anchor', 'shieldCheck');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_photo_card_grid_cards_icon" AS ENUM('none', 'mountain', 'tentTree', 'compass', 'heartHandshake', 'fish', 'trees', 'waves', 'wavesLadder', 'shipWheel', 'anchor', 'shieldCheck');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_photo_card_grid_cards_icon" AS ENUM('none', 'mountain', 'tentTree', 'compass', 'heartHandshake', 'fish', 'trees', 'waves', 'wavesLadder', 'shipWheel', 'anchor', 'shieldCheck');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_photo_card_grid_layout" AS ENUM('grid', 'carousel');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_photo_card_grid_layout" AS ENUM('grid', 'carousel');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_promo_layout" AS ENUM('imageLeft', 'imageRight', 'fullWidthBanner');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_promo_layout" AS ENUM('imageLeft', 'imageRight', 'fullWidthBanner');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_promo_links_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_promo_links_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_promo_links_link_appearance" AS ENUM('default', 'outline');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_promo_links_link_appearance" AS ENUM('default', 'outline');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_upcoming_events_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_upcoming_events_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_events_type" AS ENUM('meeting', 'campout', 'activity', 'service', 'other');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_events_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_events_status" AS ENUM('draft', 'published');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__events_v_version_type" AS ENUM('meeting', 'campout', 'activity', 'service', 'other');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__events_v_version_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__events_v_version_status" AS ENUM('draft', 'published');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;

    ALTER TYPE "public"."enum_pages_hero_type" ADD VALUE IF NOT EXISTS 'home';
    ALTER TYPE "public"."enum__pages_v_version_hero_type" ADD VALUE IF NOT EXISTS 'home';
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_hero_highlights" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "icon" "enum_pages_hero_highlights_icon" DEFAULT 'none',
      "label" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_highlights" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "icon" "enum__pages_v_version_hero_highlights_icon" DEFAULT 'none',
      "label" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_hero_photo_panel_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "image_id" integer,
      "caption" varchar,
      "description" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_photo_panel_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "image_id" integer,
      "caption" varchar,
      "description" varchar,
      "_uuid" varchar
    );

    ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "hero_secondary_media_id" integer;
    ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "hero_photo_panel_kicker" varchar DEFAULT 'Life in the troop';
    ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "hero_photo_panel_tagline" varchar DEFAULT 'Boy-led. Active. Prepared.';
    ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "hero_photo_panel_note" varchar;

    ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_secondary_media_id" integer;
    ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_photo_panel_kicker" varchar DEFAULT 'Life in the troop';
    ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_photo_panel_tagline" varchar DEFAULT 'Boy-led. Active. Prepared.';
    ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_photo_panel_note" varchar;

    ALTER TABLE "pages_blocks_photo_card_grid" ADD COLUMN IF NOT EXISTS "layout" "enum_pages_blocks_photo_card_grid_layout" DEFAULT 'grid';
    ALTER TABLE "pages_blocks_photo_card_grid_cards" ADD COLUMN IF NOT EXISTS "icon" "enum_pages_blocks_photo_card_grid_cards_icon" DEFAULT 'none';
    ALTER TABLE "_pages_v_blocks_photo_card_grid" ADD COLUMN IF NOT EXISTS "layout" "enum__pages_v_blocks_photo_card_grid_layout" DEFAULT 'grid';
    ALTER TABLE "_pages_v_blocks_photo_card_grid_cards" ADD COLUMN IF NOT EXISTS "icon" "enum__pages_v_blocks_photo_card_grid_cards_icon" DEFAULT 'none';

    CREATE TABLE IF NOT EXISTS "pages_blocks_promo_links" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" "enum_pages_blocks_promo_links_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" "enum_pages_blocks_promo_links_link_appearance" DEFAULT 'default'
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_promo" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "text" varchar,
      "image_id" integer,
      "layout" "enum_pages_blocks_promo_layout" DEFAULT 'imageRight',
      "show_from" timestamp(3) with time zone,
      "show_until" timestamp(3) with time zone,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_promo_links" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "link_type" "enum__pages_v_blocks_promo_links_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" "enum__pages_v_blocks_promo_links_link_appearance" DEFAULT 'default',
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_promo" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "text" varchar,
      "image_id" integer,
      "layout" "enum__pages_v_blocks_promo_layout" DEFAULT 'imageRight',
      "show_from" timestamp(3) with time zone,
      "show_until" timestamp(3) with time zone,
      "_uuid" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_upcoming_events" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "heading" varchar DEFAULT 'Upcoming',
      "intro" varchar,
      "count" numeric DEFAULT 4,
      "only_homepage_events" boolean DEFAULT true,
      "empty_message" varchar DEFAULT 'Upcoming events will appear here as they are added in Payload.',
      "enable_link" boolean DEFAULT false,
      "link_type" "enum_pages_blocks_upcoming_events_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_upcoming_events" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "heading" varchar DEFAULT 'Upcoming',
      "intro" varchar,
      "count" numeric DEFAULT 4,
      "only_homepage_events" boolean DEFAULT true,
      "empty_message" varchar DEFAULT 'Upcoming events will appear here as they are added in Payload.',
      "enable_link" boolean DEFAULT false,
      "link_type" "enum__pages_v_blocks_upcoming_events_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "events" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "start" timestamp(3) with time zone,
      "end" timestamp(3) with time zone,
      "location" varchar,
      "type" "enum_events_type" DEFAULT 'activity',
      "summary" varchar,
      "image_id" integer,
      "enable_link" boolean DEFAULT false,
      "link_type" "enum_events_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "show_on_homepage" boolean DEFAULT false,
      "published_at" timestamp(3) with time zone,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "_status" "enum_events_status" DEFAULT 'draft'
    );

    CREATE TABLE IF NOT EXISTS "events_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "pages_id" integer,
      "posts_id" integer,
      "gear_pages_id" integer
    );

    CREATE TABLE IF NOT EXISTS "_events_v" (
      "id" serial PRIMARY KEY NOT NULL,
      "parent_id" integer,
      "version_title" varchar,
      "version_start" timestamp(3) with time zone,
      "version_end" timestamp(3) with time zone,
      "version_location" varchar,
      "version_type" "enum__events_v_version_type" DEFAULT 'activity',
      "version_summary" varchar,
      "version_image_id" integer,
      "version_enable_link" boolean DEFAULT false,
      "version_link_type" "enum__events_v_version_link_type" DEFAULT 'reference',
      "version_link_new_tab" boolean,
      "version_link_url" varchar,
      "version_link_label" varchar,
      "version_show_on_homepage" boolean DEFAULT false,
      "version_published_at" timestamp(3) with time zone,
      "version_updated_at" timestamp(3) with time zone,
      "version_created_at" timestamp(3) with time zone,
      "version__status" "enum__events_v_version_status" DEFAULT 'draft',
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "latest" boolean,
      "autosave" boolean
    );

    CREATE TABLE IF NOT EXISTS "_events_v_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "pages_id" integer,
      "posts_id" integer,
      "gear_pages_id" integer
    );
  `)

  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_hero_highlights_parent_id_fk') THEN
        ALTER TABLE "pages_hero_highlights" ADD CONSTRAINT "pages_hero_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_version_hero_highlights_parent_id_fk') THEN
        ALTER TABLE "_pages_v_version_hero_highlights" ADD CONSTRAINT "_pages_v_version_hero_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_hero_photo_panel_items_parent_id_fk') THEN
        ALTER TABLE "pages_hero_photo_panel_items" ADD CONSTRAINT "pages_hero_photo_panel_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_hero_photo_panel_items_image_id_media_id_fk') THEN
        ALTER TABLE "pages_hero_photo_panel_items" ADD CONSTRAINT "pages_hero_photo_panel_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_version_hero_photo_panel_items_parent_id_fk') THEN
        ALTER TABLE "_pages_v_version_hero_photo_panel_items" ADD CONSTRAINT "_pages_v_version_hero_photo_panel_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_version_hero_photo_panel_items_image_id_media_id_fk') THEN
        ALTER TABLE "_pages_v_version_hero_photo_panel_items" ADD CONSTRAINT "_pages_v_version_hero_photo_panel_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_hero_secondary_media_id_media_id_fk') THEN
        ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_secondary_media_id_media_id_fk" FOREIGN KEY ("hero_secondary_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_version_hero_secondary_media_id_media_id_fk') THEN
        ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_secondary_media_id_media_id_fk" FOREIGN KEY ("version_hero_secondary_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_promo_links_parent_id_fk') THEN
        ALTER TABLE "pages_blocks_promo_links" ADD CONSTRAINT "pages_blocks_promo_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_promo"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_promo_image_id_media_id_fk') THEN
        ALTER TABLE "pages_blocks_promo" ADD CONSTRAINT "pages_blocks_promo_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_promo_parent_id_fk') THEN
        ALTER TABLE "pages_blocks_promo" ADD CONSTRAINT "pages_blocks_promo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_promo_links_parent_id_fk') THEN
        ALTER TABLE "_pages_v_blocks_promo_links" ADD CONSTRAINT "_pages_v_blocks_promo_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_promo"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_promo_image_id_media_id_fk') THEN
        ALTER TABLE "_pages_v_blocks_promo" ADD CONSTRAINT "_pages_v_blocks_promo_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_promo_parent_id_fk') THEN
        ALTER TABLE "_pages_v_blocks_promo" ADD CONSTRAINT "_pages_v_blocks_promo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_upcoming_events_parent_id_fk') THEN
        ALTER TABLE "pages_blocks_upcoming_events" ADD CONSTRAINT "pages_blocks_upcoming_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_upcoming_events_parent_id_fk') THEN
        ALTER TABLE "_pages_v_blocks_upcoming_events" ADD CONSTRAINT "_pages_v_blocks_upcoming_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'events_image_id_media_id_fk') THEN
        ALTER TABLE "events" ADD CONSTRAINT "events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'events_rels_parent_fk') THEN
        ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'events_rels_pages_fk') THEN
        ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'events_rels_posts_fk') THEN
        ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'events_rels_gear_pages_fk') THEN
        ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_gear_pages_fk" FOREIGN KEY ("gear_pages_id") REFERENCES "public"."gear_pages"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_events_v_parent_id_events_id_fk') THEN
        ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_parent_id_events_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_events_v_version_image_id_media_id_fk') THEN
        ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_events_v_rels_parent_fk') THEN
        ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_events_v_rels_pages_fk') THEN
        ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_events_v_rels_posts_fk') THEN
        ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_events_v_rels_gear_pages_fk') THEN
        ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_gear_pages_fk" FOREIGN KEY ("gear_pages_id") REFERENCES "public"."gear_pages"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "pages_hero_highlights_order_idx" ON "pages_hero_highlights" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_hero_highlights_parent_id_idx" ON "pages_hero_highlights" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_highlights_order_idx" ON "_pages_v_version_hero_highlights" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_highlights_parent_id_idx" ON "_pages_v_version_hero_highlights" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_hero_photo_panel_items_order_idx" ON "pages_hero_photo_panel_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_hero_photo_panel_items_parent_id_idx" ON "pages_hero_photo_panel_items" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_hero_photo_panel_items_image_idx" ON "pages_hero_photo_panel_items" USING btree ("image_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_photo_panel_items_order_idx" ON "_pages_v_version_hero_photo_panel_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_photo_panel_items_parent_id_idx" ON "_pages_v_version_hero_photo_panel_items" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_photo_panel_items_image_idx" ON "_pages_v_version_hero_photo_panel_items" USING btree ("image_id");
    CREATE INDEX IF NOT EXISTS "pages_hero_secondary_media_idx" ON "pages" USING btree ("hero_secondary_media_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_secondary_media_idx" ON "_pages_v" USING btree ("version_hero_secondary_media_id");

    CREATE INDEX IF NOT EXISTS "pages_blocks_promo_links_order_idx" ON "pages_blocks_promo_links" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_promo_links_parent_id_idx" ON "pages_blocks_promo_links" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_promo_order_idx" ON "pages_blocks_promo" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_promo_parent_id_idx" ON "pages_blocks_promo" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_promo_path_idx" ON "pages_blocks_promo" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_promo_image_idx" ON "pages_blocks_promo" USING btree ("image_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_promo_links_order_idx" ON "_pages_v_blocks_promo_links" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_promo_links_parent_id_idx" ON "_pages_v_blocks_promo_links" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_promo_order_idx" ON "_pages_v_blocks_promo" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_promo_parent_id_idx" ON "_pages_v_blocks_promo" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_promo_path_idx" ON "_pages_v_blocks_promo" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_promo_image_idx" ON "_pages_v_blocks_promo" USING btree ("image_id");

    CREATE INDEX IF NOT EXISTS "pages_blocks_upcoming_events_order_idx" ON "pages_blocks_upcoming_events" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_upcoming_events_parent_id_idx" ON "pages_blocks_upcoming_events" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_upcoming_events_path_idx" ON "pages_blocks_upcoming_events" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_upcoming_events_order_idx" ON "_pages_v_blocks_upcoming_events" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_upcoming_events_parent_id_idx" ON "_pages_v_blocks_upcoming_events" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_upcoming_events_path_idx" ON "_pages_v_blocks_upcoming_events" USING btree ("_path");

    CREATE INDEX IF NOT EXISTS "events_image_idx" ON "events" USING btree ("image_id");
    CREATE INDEX IF NOT EXISTS "events_updated_at_idx" ON "events" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "events_created_at_idx" ON "events" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "events__status_idx" ON "events" USING btree ("_status");
    CREATE INDEX IF NOT EXISTS "events_rels_order_idx" ON "events_rels" USING btree ("order");
    CREATE INDEX IF NOT EXISTS "events_rels_parent_idx" ON "events_rels" USING btree ("parent_id");
    CREATE INDEX IF NOT EXISTS "events_rels_path_idx" ON "events_rels" USING btree ("path");
    CREATE INDEX IF NOT EXISTS "events_rels_pages_id_idx" ON "events_rels" USING btree ("pages_id");
    CREATE INDEX IF NOT EXISTS "events_rels_posts_id_idx" ON "events_rels" USING btree ("posts_id");
    CREATE INDEX IF NOT EXISTS "events_rels_gear_pages_id_idx" ON "events_rels" USING btree ("gear_pages_id");
    CREATE INDEX IF NOT EXISTS "_events_v_parent_idx" ON "_events_v" USING btree ("parent_id");
    CREATE INDEX IF NOT EXISTS "_events_v_version_version_image_idx" ON "_events_v" USING btree ("version_image_id");
    CREATE INDEX IF NOT EXISTS "_events_v_version_version_updated_at_idx" ON "_events_v" USING btree ("version_updated_at");
    CREATE INDEX IF NOT EXISTS "_events_v_version_version_created_at_idx" ON "_events_v" USING btree ("version_created_at");
    CREATE INDEX IF NOT EXISTS "_events_v_version_version__status_idx" ON "_events_v" USING btree ("version__status");
    CREATE INDEX IF NOT EXISTS "_events_v_created_at_idx" ON "_events_v" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "_events_v_updated_at_idx" ON "_events_v" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "_events_v_latest_idx" ON "_events_v" USING btree ("latest");
    CREATE INDEX IF NOT EXISTS "_events_v_autosave_idx" ON "_events_v" USING btree ("autosave");
    CREATE INDEX IF NOT EXISTS "_events_v_rels_order_idx" ON "_events_v_rels" USING btree ("order");
    CREATE INDEX IF NOT EXISTS "_events_v_rels_parent_idx" ON "_events_v_rels" USING btree ("parent_id");
    CREATE INDEX IF NOT EXISTS "_events_v_rels_path_idx" ON "_events_v_rels" USING btree ("path");
    CREATE INDEX IF NOT EXISTS "_events_v_rels_pages_id_idx" ON "_events_v_rels" USING btree ("pages_id");
    CREATE INDEX IF NOT EXISTS "_events_v_rels_posts_id_idx" ON "_events_v_rels" USING btree ("posts_id");
    CREATE INDEX IF NOT EXISTS "_events_v_rels_gear_pages_id_idx" ON "_events_v_rels" USING btree ("gear_pages_id");
  `)

  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "events_id" integer;

    DO $$
    BEGIN
      IF to_regclass('public.events') IS NOT NULL
        AND NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'payload_locked_documents_rels_events_fk'
        )
      THEN
        ALTER TABLE "payload_locked_documents_rels"
          ADD CONSTRAINT "payload_locked_documents_rels_events_fk"
          FOREIGN KEY ("events_id")
          REFERENCES "public"."events"("id")
          ON DELETE cascade
          ON UPDATE no action;
      END IF;
    END
    $$;

    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_events_fk";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "events_id";

    DROP TABLE IF EXISTS "_events_v_rels" CASCADE;
    DROP TABLE IF EXISTS "_events_v" CASCADE;
    DROP TABLE IF EXISTS "events_rels" CASCADE;
    DROP TABLE IF EXISTS "events" CASCADE;

    DROP TABLE IF EXISTS "_pages_v_blocks_upcoming_events" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_upcoming_events" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_promo_links" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_promo" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_promo_links" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_promo" CASCADE;

    ALTER TABLE "_pages_v_blocks_photo_card_grid_cards" DROP COLUMN IF EXISTS "icon";
    ALTER TABLE "_pages_v_blocks_photo_card_grid" DROP COLUMN IF EXISTS "layout";
    ALTER TABLE "pages_blocks_photo_card_grid_cards" DROP COLUMN IF EXISTS "icon";
    ALTER TABLE "pages_blocks_photo_card_grid" DROP COLUMN IF EXISTS "layout";

    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_photo_panel_note";
    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_photo_panel_tagline";
    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_photo_panel_kicker";
    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_secondary_media_id";
    ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_photo_panel_note";
    ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_photo_panel_tagline";
    ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_photo_panel_kicker";
    ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_secondary_media_id";

    DROP TABLE IF EXISTS "_pages_v_version_hero_photo_panel_items" CASCADE;
    DROP TABLE IF EXISTS "pages_hero_photo_panel_items" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_version_hero_highlights" CASCADE;
    DROP TABLE IF EXISTS "pages_hero_highlights" CASCADE;

    DROP TYPE IF EXISTS "public"."enum__events_v_version_status";
    DROP TYPE IF EXISTS "public"."enum__events_v_version_link_type";
    DROP TYPE IF EXISTS "public"."enum__events_v_version_type";
    DROP TYPE IF EXISTS "public"."enum_events_status";
    DROP TYPE IF EXISTS "public"."enum_events_link_type";
    DROP TYPE IF EXISTS "public"."enum_events_type";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_upcoming_events_link_type";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_upcoming_events_link_type";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_promo_links_link_appearance";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_promo_links_link_appearance";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_promo_links_link_type";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_promo_links_link_type";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_promo_layout";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_promo_layout";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_photo_card_grid_layout";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_photo_card_grid_layout";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_photo_card_grid_cards_icon";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_photo_card_grid_cards_icon";
    DROP TYPE IF EXISTS "public"."enum__pages_v_version_hero_highlights_icon";
    DROP TYPE IF EXISTS "public"."enum_pages_hero_highlights_icon";

    -- Note: Postgres cannot remove a value from an enum type once added
    -- (enum_pages_hero_type / enum__pages_v_version_hero_type keep 'home').
  `)
}
