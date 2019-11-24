/* eslint-disable @typescript-eslint/camelcase */

import {
  dumpLocalStorageToObject,
  hydrateLocalStorageFromObject,
} from './utils';
import v0_to_v1 from './v0-to-v1';

import v0 from './mocks/v0';
import v1 from './mocks/v1';

describe('v0 to v1 migrations', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should run if no schemaVersion is set', () => {
    hydrateLocalStorageFromObject(v0);
    expect(new v0_to_v1().shouldRun()).toEqual(true);
  });

  it('should not run if a schemaVersion is set', () => {
    hydrateLocalStorageFromObject(v1);
    expect(new v0_to_v1().shouldRun()).toEqual(false);
  });

  it('should add schemaVersion to the settings', () => {
    hydrateLocalStorageFromObject(v0);
    new v0_to_v1().run();
    const obj = dumpLocalStorageToObject();
    expect(obj).toHaveProperty('settingsStore.schemaVersion', 1);
  });
});
