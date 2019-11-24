/* tslint:disable no-console */

import { forEach, keys, pick, reduce } from 'lodash';

import { migrator } from './index';
import mocks from './mocks';
import { hydrateLocalStorageFromObject } from './utils';

declare global {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  interface Window {
    loadTestLocalStorage(name: string): void;
    migrate(): void;
    exportConfiguration(): void;
    loadConfiguration(json: string): void;
  }
}

window.loadTestLocalStorage = (name: string) => {
  if (!mocks[name]) {
    console.log('No such test data. Available keys: ' + keys(mocks).join(', '));
    return;
  }

  console.log(`Loading test data: ${name}`);
  hydrateLocalStorageFromObject(mocks[name]);
};

window.migrate = () => {
  migrator.migrate();
};

/**
 * Serializes the relevant data stores in an exportable format
 */
window.exportConfiguration = () => {
  const data = pick(localStorage, [
    'settingsStore',
    'filtersStore',
    'githubProvider',
    'jiraProvider',
    'useNewTabPage',
  ]);

  const stringified = JSON.stringify(
    reduce(
      data,
      (acc: any, value, key) => {
        acc[key] = btoa(value);
        return acc;
      },
      {}
    )
  );

  console.log(
    `In order to import that configuration, run:\n` +
      `\twindow.loadConfiguration('${stringified}');`
  );
};

/**
 * Imports a previously serialized data store
 */
window.loadConfiguration = (json: string) => {
  forEach(JSON.parse(json), (v, k) => {
    localStorage.setItem(k, atob(v));
  });

  console.log('Import done.');
};
