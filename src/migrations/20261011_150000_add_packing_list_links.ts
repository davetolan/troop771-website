import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_packing_list_links_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_packing_list_links_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_packing_list_links_link_appearance" AS ENUM('default', 'outline');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_packing_list_links_link_appearance" AS ENUM('default', 'outline');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;

    CREATE TABLE IF NOT EXISTS "pages_blocks_packing_list_links" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" "enum_pages_blocks_packing_list_links_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" "enum_pages_blocks_packing_list_links_link_appearance" DEFAULT 'default'
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_packing_list_links" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "link_type" "enum__pages_v_blocks_packing_list_links_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" "enum__pages_v_blocks_packing_list_links_link_appearance" DEFAULT 'default',
      "_uuid" varchar
    );

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_packing_list_links_parent_id_fk') THEN
        ALTER TABLE "pages_blocks_packing_list_links" ADD CONSTRAINT "pages_blocks_packing_list_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_packing_list"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_packing_list_links_parent_id_fk') THEN
        ALTER TABLE "_pages_v_blocks_packing_list_links" ADD CONSTRAINT "_pages_v_blocks_packing_list_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_packing_list"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;

    CREATE INDEX IF NOT EXISTS "pages_blocks_packing_list_links_order_idx" ON "pages_blocks_packing_list_links" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_packing_list_links_parent_id_idx" ON "pages_blocks_packing_list_links" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_packing_list_links_order_idx" ON "_pages_v_blocks_packing_list_links" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_packing_list_links_parent_id_idx" ON "_pages_v_blocks_packing_list_links" USING btree ("_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "pages_blocks_packing_list_links" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_packing_list_links" CASCADE;

    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_packing_list_links_link_appearance";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_packing_list_links_link_appearance";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_packing_list_links_link_type";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_packing_list_links_link_type";
  `)
}
