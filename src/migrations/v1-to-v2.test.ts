/* eslint-disable @typescript-eslint/camelcase */

import {
  dumpLocalStorageToObject,
  hydrateLocalStorageFromObject,
} from './utils';
import v1_to_v2 from './v1-to-v2';

import v1 from './mocks/v1';
import v1_withoutToken from './mocks/v1-without-token';
import v2 from './mocks/v2';

describe('v1 to v2 migrations', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should run if schemaVersion is 1', () => {
    hydrateLocalStorageFromObject(v1);
    expect(new v1_to_v2().shouldRun()).toEqual(true);
  });

  it('should not run if schemaVersion is not 1', () => {
    hydrateLocalStorageFromObject(v2);
    expect(new v1_to_v2().shouldRun()).toEqual(false);
  });

  it('should set all filters provider to "github" by default', () => {
    hydrateLocalStorageFromObject(v1);

    new v1_to_v2().run();

    const obj = dumpLocalStorageToObject();
    obj.filtersStore.data.map((filter: any) => {
      expect(filter.provider).toEqual('github');
    });
  });

  it('should not add a token if there is none yet', () => {
    hydrateLocalStorageFromObject(v1_withoutToken);
    expect(v1_withoutToken).not.toHaveProperty('settingsStore.token');

    new v1_to_v2().run();

    const obj = dumpLocalStorageToObject();
    expect(obj).not.toHaveProperty('githubProvider.settings.token');
    expect(obj).not.toHaveProperty('githubProvider');
  });

  it('should create a githubProvider.settings object containing the token', () => {
    hydrateLocalStorageFromObject(v1);
    expect(v1).toHaveProperty('settingsStore.token');

    new v1_to_v2().run();

    const obj = dumpLocalStorageToObject();
    expect(obj).toHaveProperty('githubProvider.settings.token');
  });

  it('should set schemaVersion to 2 upon completion', () => {
    hydrateLocalStorageFromObject(v1);

    new v1_to_v2().run();

    const obj = dumpLocalStorageToObject();
    expect(obj).toHaveProperty('settingsStore.schemaVersion', 2);
  });
});
