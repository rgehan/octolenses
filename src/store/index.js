import { filters } from './filters';
import { trends } from './trends';
import { settings } from './settings';

export const bootstrap = async () => {
  // Add demo filter if necessary
  if (!settings.wasOnboarded) {
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
  }

  // prettier-ignore
  await Promise.all([
    trends.fetchTrendingRepos(),
    filters.fetchAllFilters(),
  ]);
};

export { navigation } from './navigation';
export { filters };
export { trends };
export { settings };
