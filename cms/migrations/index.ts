import * as migration_20261022_060557_initial from './20261022_060557_initial';
import * as migration_20261023_214852_pages_et_parametres from './20261023_214852_pages_et_parametres';
import * as migration_20261023_220305_actualites_ordre from './20261023_220305_actualites_ordre';
import * as migration_20261023_220400_actualites_accueil from './20261023_220400_actualites_accueil';

export const migrations = [
  {
    up: migration_20261022_060557_initial.up,
    down: migration_20261022_060557_initial.down,
    name: '20261022_060557_initial',
  },
  {
    up: migration_20261023_214852_pages_et_parametres.up,
    down: migration_20261023_214852_pages_et_parametres.down,
    name: '20261023_214852_pages_et_parametres',
  },
  {
    up: migration_20261023_220305_actualites_ordre.up,
    down: migration_20261023_220305_actualites_ordre.down,
    name: '20261023_220305_actualites_ordre',
  },
  {
    up: migration_20261023_220400_actualites_accueil.up,
    down: migration_20261023_220400_actualites_accueil.down,
    name: '20261023_220400_actualites_accueil',
  },
];
