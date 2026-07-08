import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE "troops" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      CONSTRAINT "troops_name_unique" UNIQUE("name")
    );

    INSERT INTO "troops" ("name")
    VALUES ('771B'), ('771G'), ('Both');

    ALTER TABLE "merit_badge_counselors"
      ADD COLUMN "troop_id" integer;

    ALTER TABLE "_merit_badge_counselors_v"
      ADD COLUMN "version_troop_id" integer;

    ALTER TABLE "payload_locked_documents_rels"
      ADD COLUMN "troops_id" integer;

    UPDATE "merit_badge_counselors"
    SET "troop_id" = (
      SELECT "id"
      FROM "troops"
      WHERE "name" = 'Both'
      LIMIT 1
    )
    WHERE "troop_id" IS NULL;

    UPDATE "_merit_badge_counselors_v"
    SET "version_troop_id" = (
      SELECT "id"
      FROM "troops"
      WHERE "name" = 'Both'
      LIMIT 1
    )
    WHERE "version_troop_id" IS NULL;

    ALTER TABLE "merit_badge_counselors"
      ADD CONSTRAINT "merit_badge_counselors_troop_id_troops_id_fk"
      FOREIGN KEY ("troop_id")
      REFERENCES "public"."troops"("id")
      ON DELETE set null
      ON UPDATE no action;

    ALTER TABLE "_merit_badge_counselors_v"
      ADD CONSTRAINT "_merit_badge_counselors_v_version_troop_id_troops_id_fk"
      FOREIGN KEY ("version_troop_id")
      REFERENCES "public"."troops"("id")
      ON DELETE set null
      ON UPDATE no action;

    ALTER TABLE "payload_locked_documents_rels"
      ADD CONSTRAINT "payload_locked_documents_rels_troops_fk"
      FOREIGN KEY ("troops_id")
      REFERENCES "public"."troops"("id")
      ON DELETE cascade
      ON UPDATE no action;

    CREATE INDEX "troops_name_idx" ON "troops" USING btree ("name");
    CREATE INDEX "troops_updated_at_idx" ON "troops" USING btree ("updated_at");
    CREATE INDEX "troops_created_at_idx" ON "troops" USING btree ("created_at");
    CREATE INDEX "merit_badge_counselors_troop_idx" ON "merit_badge_counselors" USING btree ("troop_id");
    CREATE INDEX "_merit_badge_counselors_v_version_version_troop_idx" ON "_merit_badge_counselors_v" USING btree ("version_troop_id");
    CREATE INDEX "payload_locked_documents_rels_troops_id_idx" ON "payload_locked_documents_rels" USING btree ("troops_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX "payload_locked_documents_rels_troops_id_idx";
    DROP INDEX "_merit_badge_counselors_v_version_version_troop_idx";
    DROP INDEX "merit_badge_counselors_troop_idx";
    DROP INDEX "troops_created_at_idx";
    DROP INDEX "troops_updated_at_idx";
    DROP INDEX "troops_name_idx";

    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_troops_fk";
    ALTER TABLE "_merit_badge_counselors_v" DROP CONSTRAINT "_merit_badge_counselors_v_version_troop_id_troops_id_fk";
    ALTER TABLE "merit_badge_counselors" DROP CONSTRAINT "merit_badge_counselors_troop_id_troops_id_fk";

    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "troops_id";
    ALTER TABLE "_merit_badge_counselors_v" DROP COLUMN "version_troop_id";
    ALTER TABLE "merit_badge_counselors" DROP COLUMN "troop_id";

    DROP TABLE "troops";
  `)
}
