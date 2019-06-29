import { chain } from 'lodash';
import { create } from 'mobx-persist';

import { Cache } from '../lib/cache';
import { migrator } from '../migrations';
import { providers, ProviderType } from '../providers';

import { filtersStore } from './filters';
import { navigationStore } from './navigation';
import { settingsStore } from './settings';
import { trendsStore } from './trends';

const hydrateStores = async () => {
  const hydrate = create({});

  // Re-hydrate the stores
  await Promise.all([
    hydrate('navigationStore', navigationStore),
    hydrate('settingsStore', settingsStore),
    hydrate('filtersStore', filtersStore),
  ]);

  // Re-hydrate the providers
  await Promise.all(
    chain(providers)
      .values()
      .map(provider => hydrate(`${provider.id}Provider`, provider))
      .value()
  );
};

const initializeProviders = async () => {
  await Promise.all(
    chain(providers)
      .values()
      .map(provider => provider.initialize())
      .value()
  );
};

const performOnboarding = async () => {
  if (settingsStore.wasOnboarded) {
    return;
  }

  filtersStore.saveFilter({
    label: 'OctoLenses Issues',
    provider: ProviderType.GITHUB,
    data: [],
    loading: false,
    predicates: [
      { type: 'type', value: 'issue' },
      { type: 'repo', value: 'rgehan/octolenses' },
      { type: 'status', value: 'open' },
    ],
  });

  settingsStore.updateSettings('wasOnboarded', true);
};

export const refreshAllData = async () => {
  // prettier-ignore
  await Promise.all([
    trendsStore.fetchTrendingRepos(),
    filtersStore.fetchAllFilters(),
  ]);
};

export const bootstrap = async () => {
  await migrator.migrate();
  await hydrateStores();
  await initializeProviders();
  await performOnboarding();
  await refreshAllData();
  Cache.flushExpired();
};

export { navigationStore, filtersStore, trendsStore, settingsStore };
