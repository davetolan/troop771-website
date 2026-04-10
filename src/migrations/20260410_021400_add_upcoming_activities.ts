import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_upcoming_activities_month" AS ENUM('january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december');
  CREATE TABLE "upcoming_activities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"month" "enum_upcoming_activities_month" NOT NULL,
  	"year" numeric NOT NULL,
  	"activity" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "upcoming_activities_id" integer;
  CREATE INDEX "upcoming_activities_updated_at_idx" ON "upcoming_activities" USING btree ("updated_at");
  CREATE INDEX "upcoming_activities_created_at_idx" ON "upcoming_activities" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_upcoming_activities_fk" FOREIGN KEY ("upcoming_activities_id") REFERENCES "public"."upcoming_activities"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_upcoming_activities_id_idx" ON "payload_locked_documents_rels" USING btree ("upcoming_activities_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "upcoming_activities" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "upcoming_activities" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_upcoming_activities_fk";
  
  DROP INDEX "payload_locked_documents_rels_upcoming_activities_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "upcoming_activities_id";
  DROP TYPE "public"."enum_upcoming_activities_month";`)
}
