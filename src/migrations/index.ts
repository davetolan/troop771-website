import * as migration_20260410_011720_initial_schema from './20260410_011720_initial_schema';
import * as migration_20260410_013514_add_marketing_blocks from './20260410_013514_add_marketing_blocks';
import * as migration_20260410_021400_add_upcoming_activities from './20260410_021400_add_upcoming_activities';
import * as migration_20260410_022300_rename_upcoming_activities_to_activities from './20260410_022300_rename_upcoming_activities_to_activities';

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
];
