import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'scout_change_reports'
          AND column_name = 'target_id'
      ) AND NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'scout_change_reports'
          AND column_name = 'target_i_d'
      ) THEN
        ALTER TABLE "scout_change_reports" RENAME COLUMN "target_id" TO "target_i_d";
      END IF;
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'scout_change_reports'
          AND column_name = 'target_i_d'
      ) AND NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'scout_change_reports'
          AND column_name = 'target_id'
      ) THEN
        ALTER TABLE "scout_change_reports" RENAME COLUMN "target_i_d" TO "target_id";
      END IF;
    END $$;
  `)
}
