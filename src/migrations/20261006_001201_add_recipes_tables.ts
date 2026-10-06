import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_recipes_meal_type" AS ENUM('breakfast', 'lunch', 'dinner', 'snack', 'dessert');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_recipes_cook_method" AS ENUM('no-cook', 'dutch-oven', 'griddle', 'camp-stove', 'backpacking-stove', 'campfire');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_recipes_difficulty" AS ENUM('easy', 'moderate', 'advanced');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_recipes_status" AS ENUM('draft', 'published');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__recipes_v_version_meal_type" AS ENUM('breakfast', 'lunch', 'dinner', 'snack', 'dessert');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__recipes_v_version_cook_method" AS ENUM('no-cook', 'dutch-oven', 'griddle', 'camp-stove', 'backpacking-stove', 'campfire');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__recipes_v_version_difficulty" AS ENUM('easy', 'moderate', 'advanced');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__recipes_v_version_status" AS ENUM('draft', 'published');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;

    CREATE TABLE IF NOT EXISTS "recipes_ingredients" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "item" varchar,
      "amount" varchar,
      "optional" boolean DEFAULT false
    );

    CREATE TABLE IF NOT EXISTS "recipes_instructions" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "step" varchar
    );

    CREATE TABLE IF NOT EXISTS "recipes" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "summary" varchar,
      "featured_image_id" integer,
      "meal_type" "enum_recipes_meal_type" DEFAULT 'dinner',
      "cook_method" "enum_recipes_cook_method" DEFAULT 'camp-stove',
      "difficulty" "enum_recipes_difficulty" DEFAULT 'easy',
      "prep_minutes" numeric DEFAULT 10,
      "cook_minutes" numeric DEFAULT 20,
      "servings" numeric DEFAULT 4,
      "notes" jsonb,
      "generate_slug" boolean DEFAULT true,
      "slug" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "_status" "enum_recipes_status" DEFAULT 'draft'
    );

    CREATE TABLE IF NOT EXISTS "recipes_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "recipe_categories_id" integer
    );

    CREATE TABLE IF NOT EXISTS "_recipes_v_version_ingredients" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "item" varchar,
      "amount" varchar,
      "optional" boolean DEFAULT false,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "_recipes_v_version_instructions" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "step" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "_recipes_v" (
      "id" serial PRIMARY KEY NOT NULL,
      "parent_id" integer,
      "version_title" varchar,
      "version_summary" varchar,
      "version_featured_image_id" integer,
      "version_meal_type" "enum__recipes_v_version_meal_type" DEFAULT 'dinner',
      "version_cook_method" "enum__recipes_v_version_cook_method" DEFAULT 'camp-stove',
      "version_difficulty" "enum__recipes_v_version_difficulty" DEFAULT 'easy',
      "version_prep_minutes" numeric DEFAULT 10,
      "version_cook_minutes" numeric DEFAULT 20,
      "version_servings" numeric DEFAULT 4,
      "version_notes" jsonb,
      "version_generate_slug" boolean DEFAULT true,
      "version_slug" varchar,
      "version_updated_at" timestamp(3) with time zone,
      "version_created_at" timestamp(3) with time zone,
      "version__status" "enum__recipes_v_version_status" DEFAULT 'draft',
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "latest" boolean,
      "autosave" boolean
    );

    CREATE TABLE IF NOT EXISTS "_recipes_v_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "recipe_categories_id" integer
    );

    CREATE TABLE IF NOT EXISTS "recipe_categories" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar,
      "generate_slug" boolean DEFAULT true,
      "slug" varchar NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'recipes_ingredients_parent_id_fk') THEN
        ALTER TABLE "recipes_ingredients" ADD CONSTRAINT "recipes_ingredients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'recipes_instructions_parent_id_fk') THEN
        ALTER TABLE "recipes_instructions" ADD CONSTRAINT "recipes_instructions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'recipes_featured_image_id_media_id_fk') THEN
        ALTER TABLE "recipes" ADD CONSTRAINT "recipes_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'recipes_rels_parent_fk') THEN
        ALTER TABLE "recipes_rels" ADD CONSTRAINT "recipes_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'recipes_rels_recipe_categories_fk') THEN
        ALTER TABLE "recipes_rels" ADD CONSTRAINT "recipes_rels_recipe_categories_fk" FOREIGN KEY ("recipe_categories_id") REFERENCES "public"."recipe_categories"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_recipes_v_version_ingredients_parent_id_fk') THEN
        ALTER TABLE "_recipes_v_version_ingredients" ADD CONSTRAINT "_recipes_v_version_ingredients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_recipes_v"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_recipes_v_version_instructions_parent_id_fk') THEN
        ALTER TABLE "_recipes_v_version_instructions" ADD CONSTRAINT "_recipes_v_version_instructions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_recipes_v"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_recipes_v_parent_id_recipes_id_fk') THEN
        ALTER TABLE "_recipes_v" ADD CONSTRAINT "_recipes_v_parent_id_recipes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."recipes"("id") ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_recipes_v_version_featured_image_id_media_id_fk') THEN
        ALTER TABLE "_recipes_v" ADD CONSTRAINT "_recipes_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_recipes_v_rels_parent_fk') THEN
        ALTER TABLE "_recipes_v_rels" ADD CONSTRAINT "_recipes_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_recipes_v"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_recipes_v_rels_recipe_categories_fk') THEN
        ALTER TABLE "_recipes_v_rels" ADD CONSTRAINT "_recipes_v_rels_recipe_categories_fk" FOREIGN KEY ("recipe_categories_id") REFERENCES "public"."recipe_categories"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;

    CREATE INDEX IF NOT EXISTS "recipes_ingredients_order_idx" ON "recipes_ingredients" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "recipes_ingredients_parent_id_idx" ON "recipes_ingredients" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "recipes_instructions_order_idx" ON "recipes_instructions" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "recipes_instructions_parent_id_idx" ON "recipes_instructions" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "recipes_featured_image_idx" ON "recipes" USING btree ("featured_image_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "recipes_slug_idx" ON "recipes" USING btree ("slug");
    CREATE INDEX IF NOT EXISTS "recipes_updated_at_idx" ON "recipes" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "recipes_created_at_idx" ON "recipes" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "recipes__status_idx" ON "recipes" USING btree ("_status");
    CREATE INDEX IF NOT EXISTS "recipes_rels_order_idx" ON "recipes_rels" USING btree ("order");
    CREATE INDEX IF NOT EXISTS "recipes_rels_parent_idx" ON "recipes_rels" USING btree ("parent_id");
    CREATE INDEX IF NOT EXISTS "recipes_rels_path_idx" ON "recipes_rels" USING btree ("path");
    CREATE INDEX IF NOT EXISTS "recipes_rels_recipe_categories_id_idx" ON "recipes_rels" USING btree ("recipe_categories_id");
    CREATE INDEX IF NOT EXISTS "_recipes_v_version_ingredients_order_idx" ON "_recipes_v_version_ingredients" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_recipes_v_version_ingredients_parent_id_idx" ON "_recipes_v_version_ingredients" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_recipes_v_version_instructions_order_idx" ON "_recipes_v_version_instructions" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_recipes_v_version_instructions_parent_id_idx" ON "_recipes_v_version_instructions" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_recipes_v_parent_idx" ON "_recipes_v" USING btree ("parent_id");
    CREATE INDEX IF NOT EXISTS "_recipes_v_version_version_featured_image_idx" ON "_recipes_v" USING btree ("version_featured_image_id");
    CREATE INDEX IF NOT EXISTS "_recipes_v_version_version_slug_idx" ON "_recipes_v" USING btree ("version_slug");
    CREATE INDEX IF NOT EXISTS "_recipes_v_version_version_updated_at_idx" ON "_recipes_v" USING btree ("version_updated_at");
    CREATE INDEX IF NOT EXISTS "_recipes_v_version_version_created_at_idx" ON "_recipes_v" USING btree ("version_created_at");
    CREATE INDEX IF NOT EXISTS "_recipes_v_version_version__status_idx" ON "_recipes_v" USING btree ("version__status");
    CREATE INDEX IF NOT EXISTS "_recipes_v_created_at_idx" ON "_recipes_v" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "_recipes_v_updated_at_idx" ON "_recipes_v" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "_recipes_v_latest_idx" ON "_recipes_v" USING btree ("latest");
    CREATE INDEX IF NOT EXISTS "_recipes_v_autosave_idx" ON "_recipes_v" USING btree ("autosave");
    CREATE INDEX IF NOT EXISTS "_recipes_v_rels_order_idx" ON "_recipes_v_rels" USING btree ("order");
    CREATE INDEX IF NOT EXISTS "_recipes_v_rels_parent_idx" ON "_recipes_v_rels" USING btree ("parent_id");
    CREATE INDEX IF NOT EXISTS "_recipes_v_rels_path_idx" ON "_recipes_v_rels" USING btree ("path");
    CREATE INDEX IF NOT EXISTS "_recipes_v_rels_recipe_categories_id_idx" ON "_recipes_v_rels" USING btree ("recipe_categories_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "recipe_categories_title_idx" ON "recipe_categories" USING btree ("title");
    CREATE UNIQUE INDEX IF NOT EXISTS "recipe_categories_slug_idx" ON "recipe_categories" USING btree ("slug");
    CREATE INDEX IF NOT EXISTS "recipe_categories_updated_at_idx" ON "recipe_categories" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "recipe_categories_created_at_idx" ON "recipe_categories" USING btree ("created_at");

    DO $$
    BEGIN
      IF to_regclass('public.recipes') IS NOT NULL
        AND NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'payload_locked_documents_rels_recipes_fk'
        )
      THEN
        ALTER TABLE "payload_locked_documents_rels"
          ADD CONSTRAINT "payload_locked_documents_rels_recipes_fk"
          FOREIGN KEY ("recipes_id")
          REFERENCES "public"."recipes"("id")
          ON DELETE cascade
          ON UPDATE no action;
      END IF;
    END
    $$;

    DO $$
    BEGIN
      IF to_regclass('public.recipe_categories') IS NOT NULL
        AND NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'payload_locked_documents_rels_recipe_categories_fk'
        )
      THEN
        ALTER TABLE "payload_locked_documents_rels"
          ADD CONSTRAINT "payload_locked_documents_rels_recipe_categories_fk"
          FOREIGN KEY ("recipe_categories_id")
          REFERENCES "public"."recipe_categories"("id")
          ON DELETE cascade
          ON UPDATE no action;
      END IF;
    END
    $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_recipe_categories_fk";
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_recipes_fk";

    DROP TABLE IF EXISTS "recipes_ingredients" CASCADE;
    DROP TABLE IF EXISTS "recipes_instructions" CASCADE;
    DROP TABLE IF EXISTS "recipes_rels" CASCADE;
    DROP TABLE IF EXISTS "_recipes_v_version_ingredients" CASCADE;
    DROP TABLE IF EXISTS "_recipes_v_version_instructions" CASCADE;
    DROP TABLE IF EXISTS "_recipes_v_rels" CASCADE;
    DROP TABLE IF EXISTS "_recipes_v" CASCADE;
    DROP TABLE IF EXISTS "recipes" CASCADE;
    DROP TABLE IF EXISTS "recipe_categories" CASCADE;

    DROP TYPE IF EXISTS "public"."enum_recipes_meal_type";
    DROP TYPE IF EXISTS "public"."enum_recipes_cook_method";
    DROP TYPE IF EXISTS "public"."enum_recipes_difficulty";
    DROP TYPE IF EXISTS "public"."enum_recipes_status";
    DROP TYPE IF EXISTS "public"."enum__recipes_v_version_meal_type";
    DROP TYPE IF EXISTS "public"."enum__recipes_v_version_cook_method";
    DROP TYPE IF EXISTS "public"."enum__recipes_v_version_difficulty";
    DROP TYPE IF EXISTS "public"."enum__recipes_v_version_status";
  `)
}
