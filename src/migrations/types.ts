export interface IMigration {
  name: string;
  shouldRun(): boolean;
  run(): void;
}
