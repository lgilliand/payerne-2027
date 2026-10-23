import * as migration_20261022_060557_initial from './20261022_060557_initial';

export const migrations = [
  {
    up: migration_20261022_060557_initial.up,
    down: migration_20261022_060557_initial.down,
    name: '20261022_060557_initial'
  },
];
