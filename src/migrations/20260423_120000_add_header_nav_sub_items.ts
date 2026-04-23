import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "header_nav_items_sub_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "header_nav_items_sub_items_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" varchar NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  ALTER TABLE "header_nav_items_sub_items" ADD CONSTRAINT "header_nav_items_sub_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_sub_items_rels" ADD CONSTRAINT "header_nav_items_sub_items_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header_nav_items_sub_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_sub_items_rels" ADD CONSTRAINT "header_nav_items_sub_items_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_sub_items_rels" ADD CONSTRAINT "header_nav_items_sub_items_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "header_nav_items_sub_items_order_idx" ON "header_nav_items_sub_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_sub_items_parent_id_idx" ON "header_nav_items_sub_items" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_sub_items_rels_order_idx" ON "header_nav_items_sub_items_rels" USING btree ("order");
  CREATE INDEX "header_nav_items_sub_items_rels_parent_idx" ON "header_nav_items_sub_items_rels" USING btree ("parent_id");
  CREATE INDEX "header_nav_items_sub_items_rels_path_idx" ON "header_nav_items_sub_items_rels" USING btree ("path");
  CREATE INDEX "header_nav_items_sub_items_rels_pages_id_idx" ON "header_nav_items_sub_items_rels" USING btree ("pages_id");
  CREATE INDEX "header_nav_items_sub_items_rels_posts_id_idx" ON "header_nav_items_sub_items_rels" USING btree ("posts_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "header_nav_items_sub_items" CASCADE;
  DROP TABLE "header_nav_items_sub_items_rels" CASCADE;`)
}
