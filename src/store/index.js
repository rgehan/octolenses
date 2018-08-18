import { create } from 'mobx-persist';

import { navigation } from './navigation';
import { filters } from './filters';
import { trends } from './trends';
import { settings } from './settings';

const hydrateStores = async () => {
  const hydrate = create({});
  await Promise.all([
    hydrate('navigationStore', navigation),
    hydrate('settingsStore', settings),
  ]);
};

const performOnboarding = async () => {
  if (settings.wasOnboarded) {
    return;
  }

  filters.saveFilter({
    label: 'React PRs',
    data: [],
    loading: false,
    predicates: [
      { type: 'type', value: 'pr' },
      { type: 'repo', value: 'facebook/react' },
      { type: 'status', value: 'open' },
    ],
  });

  settings.updateSettings('wasOnboarded', true);
};

export const bootstrap = async () => {
  await hydrateStores();

  await performOnboarding();

  // prettier-ignore
  await Promise.all([
    trends.fetchTrendingRepos(),
    filters.fetchAllFilters(),
  ]);
};

export { navigation };
export { filters };
export { trends };
export { settings };
