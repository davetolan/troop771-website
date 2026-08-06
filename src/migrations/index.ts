import * as migration_20260410_011720_initial_schema from './20260410_011720_initial_schema'
import * as migration_20260410_013514_add_marketing_blocks from './20260410_013514_add_marketing_blocks'
import * as migration_20260410_021400_add_upcoming_activities from './20260410_021400_add_upcoming_activities'
import * as migration_20260410_022300_rename_upcoming_activities_to_activities from './20260410_022300_rename_upcoming_activities_to_activities'
import * as migration_20260410_223800_add_activities_layout_block from './20260410_223800_add_activities_layout_block'
import * as migration_20260410_123500_add_user_role from './20260410_123500_add_user_role'
import * as migration_20260410_180500_relax_activities_layout_dates from './20260410_180500_relax_activities_layout_dates'
import * as migration_20260411_180624_add_feature_grid_media from './20260411_180624_add_feature_grid_media'
import * as migration_20260411_184500_add_marketing_block_media_fields from './20260411_184500_add_marketing_block_media_fields'
import * as migration_20260413_010000_add_scout_change_reports from './20260413_010000_add_scout_change_reports'
import * as migration_20260413_020000_backfill_scout_change_reports_locked_rels from './20260413_020000_backfill_scout_change_reports_locked_rels'
import * as migration_20260415_211859_add_activity_drafts_and_scout_report_snapshots from './20260415_211859_add_activity_drafts_and_scout_report_snapshots'
import * as migration_20260423_022500_fix_scout_change_reports_target_id_column from './20260423_022500_fix_scout_change_reports_target_id_column'
import * as migration_20260423_120000_add_header_nav_sub_items from './20260423_120000_add_header_nav_sub_items'
import * as migration_20260426_140000_backfill_recipe_locked_rels from './20260426_140000_backfill_recipe_locked_rels'
import * as migration_20260426_151500_upsert_why_eagle_scout_matters_page from './20260426_151500_upsert_why_eagle_scout_matters_page'
import * as migration_20260707_171600_add_merit_badge_counselors from './20260707_171600_add_merit_badge_counselors'
import * as migration_20260707_192300_add_troops_to_merit_badge_counselors from './20260707_192300_add_troops_to_merit_badge_counselors'
import * as migration_20260805_210500_add_troop_meeting_settings from './20260805_210500_add_troop_meeting_settings'
import * as migration_20260805_220000_add_troop_meeting_summer_message from './20260805_220000_add_troop_meeting_summer_message'
import * as migration_20260806_010000_update_activities_layout_show_inactive from './20260806_010000_update_activities_layout_show_inactive'

export const migrations = [
  {
    up: migration_20260410_011720_initial_schema.up,
    down: migration_20260410_011720_initial_schema.down,
    name: '20260410_011720_initial_schema',
  },
  {
    up: migration_20260410_013514_add_marketing_blocks.up,
    down: migration_20260410_013514_add_marketing_blocks.down,
    name: '20260410_013514_add_marketing_blocks',
  },
  {
    up: migration_20260410_021400_add_upcoming_activities.up,
    down: migration_20260410_021400_add_upcoming_activities.down,
    name: '20260410_021400_add_upcoming_activities',
  },
  {
    up: migration_20260410_022300_rename_upcoming_activities_to_activities.up,
    down: migration_20260410_022300_rename_upcoming_activities_to_activities.down,
    name: '20260410_022300_rename_upcoming_activities_to_activities',
  },
  {
    up: migration_20260410_223800_add_activities_layout_block.up,
    down: migration_20260410_223800_add_activities_layout_block.down,
    name: '20260410_223800_add_activities_layout_block',
  },
  {
    up: migration_20260410_123500_add_user_role.up,
    down: migration_20260410_123500_add_user_role.down,
    name: '20260410_123500_add_user_role',
  },
  {
    up: migration_20260410_180500_relax_activities_layout_dates.up,
    down: migration_20260410_180500_relax_activities_layout_dates.down,
    name: '20260410_180500_relax_activities_layout_dates',
  },
  {
    up: migration_20260411_180624_add_feature_grid_media.up,
    down: migration_20260411_180624_add_feature_grid_media.down,
    name: '20260411_180624_add_feature_grid_media',
  },
  {
    up: migration_20260411_184500_add_marketing_block_media_fields.up,
    down: migration_20260411_184500_add_marketing_block_media_fields.down,
    name: '20260411_184500_add_marketing_block_media_fields',
  },
  {
    up: migration_20260413_010000_add_scout_change_reports.up,
    down: migration_20260413_010000_add_scout_change_reports.down,
    name: '20260413_010000_add_scout_change_reports',
  },
  {
    up: migration_20260413_020000_backfill_scout_change_reports_locked_rels.up,
    down: migration_20260413_020000_backfill_scout_change_reports_locked_rels.down,
    name: '20260413_020000_backfill_scout_change_reports_locked_rels',
  },
  {
    up: migration_20260415_211859_add_activity_drafts_and_scout_report_snapshots.up,
    down: migration_20260415_211859_add_activity_drafts_and_scout_report_snapshots.down,
    name: '20260415_211859_add_activity_drafts_and_scout_report_snapshots',
  },
  {
    up: migration_20260423_022500_fix_scout_change_reports_target_id_column.up,
    down: migration_20260423_022500_fix_scout_change_reports_target_id_column.down,
    name: '20260423_022500_fix_scout_change_reports_target_id_column',
  },
  {
    up: migration_20260423_120000_add_header_nav_sub_items.up,
    down: migration_20260423_120000_add_header_nav_sub_items.down,
    name: '20260423_120000_add_header_nav_sub_items',
  },
  {
    up: migration_20260426_140000_backfill_recipe_locked_rels.up,
    down: migration_20260426_140000_backfill_recipe_locked_rels.down,
    name: '20260426_140000_backfill_recipe_locked_rels',
  },
  {
    up: migration_20260426_151500_upsert_why_eagle_scout_matters_page.up,
    down: migration_20260426_151500_upsert_why_eagle_scout_matters_page.down,
    name: '20260426_151500_upsert_why_eagle_scout_matters_page',
  },
  {
    up: migration_20260707_171600_add_merit_badge_counselors.up,
    down: migration_20260707_171600_add_merit_badge_counselors.down,
    name: '20260707_171600_add_merit_badge_counselors',
  },
  {
    up: migration_20260707_192300_add_troops_to_merit_badge_counselors.up,
    down: migration_20260707_192300_add_troops_to_merit_badge_counselors.down,
    name: '20260707_192300_add_troops_to_merit_badge_counselors',
  },
  {
    up: migration_20260805_210500_add_troop_meeting_settings.up,
    down: migration_20260805_210500_add_troop_meeting_settings.down,
    name: '20260805_210500_add_troop_meeting_settings',
  },
  {
    up: migration_20260805_220000_add_troop_meeting_summer_message.up,
    down: migration_20260805_220000_add_troop_meeting_summer_message.down,
    name: '20260805_220000_add_troop_meeting_summer_message',
  },
  {
    up: migration_20260806_010000_update_activities_layout_show_inactive.up,
    down: migration_20260806_010000_update_activities_layout_show_inactive.down,
    name: '20260806_010000_update_activities_layout_show_inactive',
  },
]
