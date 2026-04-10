import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_feature_grid_theme" AS ENUM('dark', 'light');
  CREATE TYPE "public"."enum_pages_blocks_section_intro_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_section_intro_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_section_intro_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_section_intro_theme" AS ENUM('light', 'stone', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_split_section_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_split_section_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_split_section_media_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_split_section_theme" AS ENUM('light', 'stone', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_photo_card_grid_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_photo_card_grid_columns" AS ENUM('two', 'three', 'four');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_theme" AS ENUM('dark', 'light');
  CREATE TYPE "public"."enum__pages_v_blocks_section_intro_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_section_intro_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_section_intro_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_section_intro_theme" AS ENUM('light', 'stone', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_split_section_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_split_section_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_split_section_media_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_split_section_theme" AS ENUM('light', 'stone', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_photo_card_grid_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_photo_card_grid_columns" AS ENUM('two', 'three', 'four');
  CREATE TABLE "pages_blocks_feature_grid_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"theme" "enum_pages_blocks_feature_grid_theme" DEFAULT 'dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_section_intro_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_section_intro_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_section_intro_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_section_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"alignment" "enum_pages_blocks_section_intro_alignment" DEFAULT 'left',
  	"theme" "enum_pages_blocks_section_intro_theme" DEFAULT 'light',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_split_section_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_split_section_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_split_section_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_split_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"body" jsonb,
  	"media_id" integer,
  	"media_position" "enum_pages_blocks_split_section_media_position" DEFAULT 'right',
  	"theme" "enum_pages_blocks_split_section_theme" DEFAULT 'light',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_photo_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"enable_link" boolean,
  	"link_type" "enum_pages_blocks_photo_card_grid_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "pages_blocks_photo_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"columns" "enum_pages_blocks_photo_card_grid_columns" DEFAULT 'three',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_grid_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"theme" "enum__pages_v_blocks_feature_grid_theme" DEFAULT 'dark',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_section_intro_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_section_intro_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_section_intro_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_section_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"alignment" "enum__pages_v_blocks_section_intro_alignment" DEFAULT 'left',
  	"theme" "enum__pages_v_blocks_section_intro_theme" DEFAULT 'light',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_split_section_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_split_section_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_split_section_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_split_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"body" jsonb,
  	"media_id" integer,
  	"media_position" "enum__pages_v_blocks_split_section_media_position" DEFAULT 'right',
  	"theme" "enum__pages_v_blocks_split_section_theme" DEFAULT 'light',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_photo_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"enable_link" boolean,
  	"link_type" "enum__pages_v_blocks_photo_card_grid_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_photo_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"columns" "enum__pages_v_blocks_photo_card_grid_columns" DEFAULT 'three',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_feature_grid_features" ADD CONSTRAINT "pages_blocks_feature_grid_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid" ADD CONSTRAINT "pages_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_section_intro_links" ADD CONSTRAINT "pages_blocks_section_intro_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_section_intro"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_section_intro" ADD CONSTRAINT "pages_blocks_section_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_section_links" ADD CONSTRAINT "pages_blocks_split_section_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_split_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_section" ADD CONSTRAINT "pages_blocks_split_section_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_section" ADD CONSTRAINT "pages_blocks_split_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_photo_card_grid_cards" ADD CONSTRAINT "pages_blocks_photo_card_grid_cards_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_photo_card_grid_cards" ADD CONSTRAINT "pages_blocks_photo_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_photo_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_photo_card_grid" ADD CONSTRAINT "pages_blocks_photo_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid_features" ADD CONSTRAINT "_pages_v_blocks_feature_grid_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid" ADD CONSTRAINT "_pages_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_section_intro_links" ADD CONSTRAINT "_pages_v_blocks_section_intro_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_section_intro"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_section_intro" ADD CONSTRAINT "_pages_v_blocks_section_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_section_links" ADD CONSTRAINT "_pages_v_blocks_split_section_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_split_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_section" ADD CONSTRAINT "_pages_v_blocks_split_section_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_section" ADD CONSTRAINT "_pages_v_blocks_split_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_photo_card_grid_cards" ADD CONSTRAINT "_pages_v_blocks_photo_card_grid_cards_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_photo_card_grid_cards" ADD CONSTRAINT "_pages_v_blocks_photo_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_photo_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_photo_card_grid" ADD CONSTRAINT "_pages_v_blocks_photo_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_feature_grid_features_order_idx" ON "pages_blocks_feature_grid_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_features_parent_id_idx" ON "pages_blocks_feature_grid_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_order_idx" ON "pages_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_parent_id_idx" ON "pages_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_path_idx" ON "pages_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_section_intro_links_order_idx" ON "pages_blocks_section_intro_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_section_intro_links_parent_id_idx" ON "pages_blocks_section_intro_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_section_intro_order_idx" ON "pages_blocks_section_intro" USING btree ("_order");
  CREATE INDEX "pages_blocks_section_intro_parent_id_idx" ON "pages_blocks_section_intro" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_section_intro_path_idx" ON "pages_blocks_section_intro" USING btree ("_path");
  CREATE INDEX "pages_blocks_split_section_links_order_idx" ON "pages_blocks_split_section_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_split_section_links_parent_id_idx" ON "pages_blocks_split_section_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_split_section_order_idx" ON "pages_blocks_split_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_split_section_parent_id_idx" ON "pages_blocks_split_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_split_section_path_idx" ON "pages_blocks_split_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_split_section_media_idx" ON "pages_blocks_split_section" USING btree ("media_id");
  CREATE INDEX "pages_blocks_photo_card_grid_cards_order_idx" ON "pages_blocks_photo_card_grid_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_photo_card_grid_cards_parent_id_idx" ON "pages_blocks_photo_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_photo_card_grid_cards_media_idx" ON "pages_blocks_photo_card_grid_cards" USING btree ("media_id");
  CREATE INDEX "pages_blocks_photo_card_grid_order_idx" ON "pages_blocks_photo_card_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_photo_card_grid_parent_id_idx" ON "pages_blocks_photo_card_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_photo_card_grid_path_idx" ON "pages_blocks_photo_card_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feature_grid_features_order_idx" ON "_pages_v_blocks_feature_grid_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_grid_features_parent_id_idx" ON "_pages_v_blocks_feature_grid_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_order_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_grid_parent_id_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_path_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_section_intro_links_order_idx" ON "_pages_v_blocks_section_intro_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_section_intro_links_parent_id_idx" ON "_pages_v_blocks_section_intro_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_section_intro_order_idx" ON "_pages_v_blocks_section_intro" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_section_intro_parent_id_idx" ON "_pages_v_blocks_section_intro" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_section_intro_path_idx" ON "_pages_v_blocks_section_intro" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_split_section_links_order_idx" ON "_pages_v_blocks_split_section_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_split_section_links_parent_id_idx" ON "_pages_v_blocks_split_section_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_split_section_order_idx" ON "_pages_v_blocks_split_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_split_section_parent_id_idx" ON "_pages_v_blocks_split_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_split_section_path_idx" ON "_pages_v_blocks_split_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_split_section_media_idx" ON "_pages_v_blocks_split_section" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_photo_card_grid_cards_order_idx" ON "_pages_v_blocks_photo_card_grid_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_photo_card_grid_cards_parent_id_idx" ON "_pages_v_blocks_photo_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_photo_card_grid_cards_media_idx" ON "_pages_v_blocks_photo_card_grid_cards" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_photo_card_grid_order_idx" ON "_pages_v_blocks_photo_card_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_photo_card_grid_parent_id_idx" ON "_pages_v_blocks_photo_card_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_photo_card_grid_path_idx" ON "_pages_v_blocks_photo_card_grid" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_feature_grid_features" CASCADE;
  DROP TABLE "pages_blocks_feature_grid" CASCADE;
  DROP TABLE "pages_blocks_section_intro_links" CASCADE;
  DROP TABLE "pages_blocks_section_intro" CASCADE;
  DROP TABLE "pages_blocks_split_section_links" CASCADE;
  DROP TABLE "pages_blocks_split_section" CASCADE;
  DROP TABLE "pages_blocks_photo_card_grid_cards" CASCADE;
  DROP TABLE "pages_blocks_photo_card_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid_features" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_section_intro_links" CASCADE;
  DROP TABLE "_pages_v_blocks_section_intro" CASCADE;
  DROP TABLE "_pages_v_blocks_split_section_links" CASCADE;
  DROP TABLE "_pages_v_blocks_split_section" CASCADE;
  DROP TABLE "_pages_v_blocks_photo_card_grid_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_photo_card_grid" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_feature_grid_theme";
  DROP TYPE "public"."enum_pages_blocks_section_intro_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_section_intro_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_section_intro_alignment";
  DROP TYPE "public"."enum_pages_blocks_section_intro_theme";
  DROP TYPE "public"."enum_pages_blocks_split_section_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_split_section_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_split_section_media_position";
  DROP TYPE "public"."enum_pages_blocks_split_section_theme";
  DROP TYPE "public"."enum_pages_blocks_photo_card_grid_cards_link_type";
  DROP TYPE "public"."enum_pages_blocks_photo_card_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_theme";
  DROP TYPE "public"."enum__pages_v_blocks_section_intro_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_section_intro_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_section_intro_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_section_intro_theme";
  DROP TYPE "public"."enum__pages_v_blocks_split_section_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_split_section_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_split_section_media_position";
  DROP TYPE "public"."enum__pages_v_blocks_split_section_theme";
  DROP TYPE "public"."enum__pages_v_blocks_photo_card_grid_cards_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_photo_card_grid_columns";`)
}
