/* eslint-disable @typescript-eslint/camelcase */

import {
  dumpLocalStorageToObject,
  hydrateLocalStorageFromObject,
} from './utils';
import v2_to_v3 from './v2-to-v3';

import v2 from './mocks/v2-with-negated-predicates';
import v3 from './mocks/v3-with-defaulted-operators';

describe('v2 to v3 migrations', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should run if schemaVersion is 2', () => {
    hydrateLocalStorageFromObject(v2);
    expect(new v2_to_v3().shouldRun()).toEqual(true);
  });

  it('should properly default operators', () => {
    hydrateLocalStorageFromObject(v2);

    new v2_to_v3().run();

    const obj = dumpLocalStorageToObject();
    expect(obj).toEqual(v3);
  });

  it('should set schemaVersion to 3 upon completion', () => {
    hydrateLocalStorageFromObject(v2);

    new v2_to_v3().run();

    const obj = dumpLocalStorageToObject();
    expect(obj).toHaveProperty('settingsStore.schemaVersion', 3);
  });
});
