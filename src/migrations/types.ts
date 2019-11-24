export interface Migration {
  name: string;
  shouldRun(): boolean;
  run(): void;
}
