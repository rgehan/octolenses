export function assertUnreachable<T>(_: never, defaultValue: T): T {
  return defaultValue;
}
