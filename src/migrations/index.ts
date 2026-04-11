import * as migration_20260410_011720_initial_schema from './20260410_011720_initial_schema';
import * as migration_20260410_013514_add_marketing_blocks from './20260410_013514_add_marketing_blocks';
import * as migration_20260410_021400_add_upcoming_activities from './20260410_021400_add_upcoming_activities';
import * as migration_20260410_022300_rename_upcoming_activities_to_activities from './20260410_022300_rename_upcoming_activities_to_activities';
import * as migration_20260410_223800_add_activities_layout_block from './20260410_223800_add_activities_layout_block';
import * as migration_20260410_123500_add_user_role from './20260410_123500_add_user_role';
import * as migration_20260410_180500_relax_activities_layout_dates from './20260410_180500_relax_activities_layout_dates';
import * as migration_20260411_180624_add_feature_grid_media from './20260411_180624_add_feature_grid_media';

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
    name: '20260410_021400_add_upcoming_activities'
  },
  {
    up: migration_20260410_022300_rename_upcoming_activities_to_activities.up,
    down: migration_20260410_022300_rename_upcoming_activities_to_activities.down,
    name: '20260410_022300_rename_upcoming_activities_to_activities'
  },
  {
    up: migration_20260410_223800_add_activities_layout_block.up,
    down: migration_20260410_223800_add_activities_layout_block.down,
    name: '20260410_223800_add_activities_layout_block'
  },
  {
    up: migration_20260410_123500_add_user_role.up,
    down: migration_20260410_123500_add_user_role.down,
    name: '20260410_123500_add_user_role'
  },
  {
    up: migration_20260410_180500_relax_activities_layout_dates.up,
    down: migration_20260410_180500_relax_activities_layout_dates.down,
    name: '20260410_180500_relax_activities_layout_dates'
  },
  {
    up: migration_20260411_180624_add_feature_grid_media.up,
    down: migration_20260411_180624_add_feature_grid_media.down,
    name: '20260411_180624_add_feature_grid_media'
  },
];
