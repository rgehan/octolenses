import { create } from 'mobx-persist';
import { chain } from 'lodash';

import { navigation } from './navigation';
import { filters } from './filters';
import { trends } from './trends';
import { settings } from './settings';
import { providers, ProviderType } from '../providers';

import { migrateData } from './migrations';

const hydrateStores = async () => {
  const hydrate = create({});

  // Re-hydrate the stores
  await Promise.all([
    hydrate('navigationStore', navigation),
    hydrate('settingsStore', settings),
    hydrate('filtersStore', filters),
  ]);

  // Re-hydrate the providers
  await Promise.all(
    chain(providers)
      .values()
      .map(provider => {
        hydrate(`${provider.id}Provider`, provider);
      })
      .value()
  );
};

const performOnboarding = async () => {
  if (settings.wasOnboarded) {
    return;
  }

  filters.saveFilter({
    label: 'OctoLenses Issues',
    provider: ProviderType.GITHUB,
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
  await migrateData();
  await hydrateStores();
  await performOnboarding();
  await refreshAllData();
};

export { navigation, filters, trends, settings };
