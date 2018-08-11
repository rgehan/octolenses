import { init } from '@rematch/core';
import createRematchPersist from '@rematch/persist';

import * as models from './models';

const persistPlugin = createRematchPersist({
  whitelist: ['settings'],
  throttle: 1000,
  version: 1,
});

export const store = init({
  models,
  plugins: [persistPlugin],
});

export const initialize = async () => {
  // Add a demo filter if it is the first time the extension is used.
  const needOnboarding = !store.getState().settings.wasOnboarded;
  if (needOnboarding) {
    store.dispatch.filters.saveFilter({
      id: 0,
      label: 'React PRs',
      data: [],
      loading: false,
      predicates: [
        { type: 'type', value: 'pr' },
        { type: 'repository', value: 'facebook/react' },
        { type: 'status', value: 'open' },
      ],
    });

    store.dispatch.settings.updateSettings({
      key: 'wasOnboarded',
      value: true,
    });
  }

  store.dispatch.trends.fetchTrendingRepos();
  store.dispatch.filters.fetchAllFilters();
};
