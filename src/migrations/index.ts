/* tslint:disable no-console */

import v0_to_v1 from './v0-to-v1';
import v1_to_v2 from './v1-to-v2';

import './testing-utils';

export interface Migration {
  name: string;
  shouldRun(): boolean;
  run(): void;
}

class Migrator {
  private migrations: Migration[] = [];

  public migrate() {
    console.log('[migration] Running necessary migrations...');

    this.migrations.forEach(migration => {
      if (migration.shouldRun()) {
        console.log(`[migration] Running migration ${migration.name}`);
        migration.run();
      }
    });
  }

  public registerMigration(migration: Migration): Migrator {
    this.migrations.push(migration);
    return this;
  }
}

export const migrator = new Migrator()
  .registerMigration(new v0_to_v1())
  .registerMigration(new v1_to_v2());
