/* tslint:disable no-console */

import { keys } from 'lodash';

import { migrator } from './index';
import mocks from './mocks';
import { hydrateLocalStorageFromObject } from './utils';

declare global {
  interface Window {
    loadTestLocalStorage(name: string): void;
    migrate(): void;
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
