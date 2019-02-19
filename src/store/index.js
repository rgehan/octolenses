import { create } from 'mobx-persist';
import { isUndefined } from 'lodash';

import { navigation } from './navigation';
import { filters } from './filters';
import { trends } from './trends';
import { settings } from './settings';
import { getStorage } from '../lib/storage';

const hydrateStores = async () => {
  const hydrate = create({
    storage: getStorage(),
  });

  await Promise.all([
    hydrate('navigationStore', navigation),
    hydrate('settingsStore', settings),
    hydrate('filtersStore', filters),
  ]);
};

const migrateData = async () => {
  // If there was no notion of schemaVersion, start at 1
  if (isUndefined(settings.schemaVersion)) {
    console.log('Migrating schema to v1');
    settings.updateSettings('schemaVersion', 1);
  }

  // Example for migrating from v1 to v2
  // if (settings.schemaVersion === 1) {
  //   doSomethingOnTheStoredData();
  //   settings.updateSettings('schemaVersion', 2);
  // }
};

const performOnboarding = async () => {
  if (settings.wasOnboarded) {
    return;
  }

  filters.saveFilter({
    label: 'OctoLenses Issues',
    data: [],
    loading: false,
    predicates: [
      { type: 'type', value: 'issues' },
      { type: 'repo', value: 'rgehan/octolenses-browser-extension' },
      { type: 'status', value: 'open' },
    ],
  });

  settings.updateSettings('wasOnboarded', true);
};

export const refreshAllData = async () => {
  // prettier-ignore
  await Promise.all([
    trends.fetchTrendingRepos(),
    filters.fetchAllFilters(),
  ]);
};

export const bootstrap = async () => {
  await hydrateStores();
  await migrateData();
  await performOnboarding();
  await refreshAllData();
};

export { navigation, filters, trends, settings };
