/* eslint-disable @typescript-eslint/camelcase */

import { IMigration } from './types';
import v0_to_v1 from './v0-to-v1';
import v1_to_v2 from './v1-to-v2';
import v2_to_v3 from './v2-to-v3';

import './testing-utils';

class Migrator {
  private migrations: IMigration[] = [];

  public migrate() {
    console.log('[migration] Running necessary migrations...');

    this.migrations.forEach(migration => {
      if (migration.shouldRun()) {
        console.log(`[migration] Running migration ${migration.name}`);
        migration.run();
      }
    });
  }

  public registerMigration(migration: IMigration): Migrator {
    this.migrations.push(migration);
    return this;
  }
}

export const migrator = new Migrator()
  .registerMigration(new v0_to_v1())
  .registerMigration(new v1_to_v2())
  .registerMigration(new v2_to_v3());
