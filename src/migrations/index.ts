import v0_to_v1 from './v0-to-v1';
import v1_to_v2 from './v1-to-v2';

export abstract class Migration {
  public abstract name: string;
  public abstract shouldRun(): boolean;
  public abstract run(): void;
}

class Migrator {
  private migrations: Migration[] = [];

  public migrate() {
    this.migrations.forEach(migration => {
      debugger;

      const shouldRun = migration.shouldRun();

      if (shouldRun) {
        console.log(`Migration ${migration.name} should run`);
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
