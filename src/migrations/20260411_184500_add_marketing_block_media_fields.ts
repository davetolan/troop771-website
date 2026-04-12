import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_section_intro" ADD COLUMN "media_id" integer;
  ALTER TABLE "pages_blocks_photo_card_grid" ADD COLUMN "background_media_id" integer;
  ALTER TABLE "_pages_v_blocks_section_intro" ADD COLUMN "media_id" integer;
  ALTER TABLE "_pages_v_blocks_photo_card_grid" ADD COLUMN "background_media_id" integer;
  ALTER TABLE "pages_blocks_section_intro" ADD CONSTRAINT "pages_blocks_section_intro_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_photo_card_grid" ADD CONSTRAINT "pages_blocks_photo_card_grid_background_media_id_media_id_fk" FOREIGN KEY ("background_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_section_intro" ADD CONSTRAINT "_pages_v_blocks_section_intro_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_photo_card_grid" ADD CONSTRAINT "_pages_v_blocks_photo_card_grid_background_media_id_media_id_fk" FOREIGN KEY ("background_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_section_intro_media_idx" ON "pages_blocks_section_intro" USING btree ("media_id");
  CREATE INDEX "pages_blocks_photo_card_grid_background_media_idx" ON "pages_blocks_photo_card_grid" USING btree ("background_media_id");
  CREATE INDEX "_pages_v_blocks_section_intro_media_idx" ON "_pages_v_blocks_section_intro" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_photo_card_grid_background_media_idx" ON "_pages_v_blocks_photo_card_grid" USING btree ("background_media_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "pages_blocks_section_intro_media_idx";
  DROP INDEX "pages_blocks_photo_card_grid_background_media_idx";
  DROP INDEX "_pages_v_blocks_section_intro_media_idx";
  DROP INDEX "_pages_v_blocks_photo_card_grid_background_media_idx";
  ALTER TABLE "pages_blocks_section_intro" DROP CONSTRAINT "pages_blocks_section_intro_media_id_media_id_fk";
  ALTER TABLE "pages_blocks_photo_card_grid" DROP CONSTRAINT "pages_blocks_photo_card_grid_background_media_id_media_id_fk";
  ALTER TABLE "_pages_v_blocks_section_intro" DROP CONSTRAINT "_pages_v_blocks_section_intro_media_id_media_id_fk";
  ALTER TABLE "_pages_v_blocks_photo_card_grid" DROP CONSTRAINT "_pages_v_blocks_photo_card_grid_background_media_id_media_id_fk";
  ALTER TABLE "pages_blocks_section_intro" DROP COLUMN "media_id";
  ALTER TABLE "pages_blocks_photo_card_grid" DROP COLUMN "background_media_id";
  ALTER TABLE "_pages_v_blocks_section_intro" DROP COLUMN "media_id";
  ALTER TABLE "_pages_v_blocks_photo_card_grid" DROP COLUMN "background_media_id";`)
}
