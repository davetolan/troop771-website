import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "recipes_id" integer;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "recipe_categories_id" integer;

    DO $$
    BEGIN
      IF to_regclass('public.recipes') IS NOT NULL
        AND NOT EXISTS (
          SELECT 1
          FROM pg_constraint
          WHERE conname = 'payload_locked_documents_rels_recipes_fk'
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
          SELECT 1
          FROM pg_constraint
          WHERE conname = 'payload_locked_documents_rels_recipe_categories_fk'
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

    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_recipes_id_idx"
      ON "payload_locked_documents_rels" USING btree ("recipes_id");

    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_recipe_categories_id_idx"
      ON "payload_locked_documents_rels" USING btree ("recipe_categories_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "payload_locked_documents_rels_recipe_categories_id_idx";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_recipes_id_idx";

    ALTER TABLE "payload_locked_documents_rels"
      DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_recipe_categories_fk";
    ALTER TABLE "payload_locked_documents_rels"
      DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_recipes_fk";

    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "recipe_categories_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "recipes_id";
  `)
}
