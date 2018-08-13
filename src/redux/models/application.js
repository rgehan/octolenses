export const application = {
  state: null,
  effects: dispatch => ({
    async performOnboardingIfNecessary(_, { settings }) {
      // Add a demo filter if it is the first time the extension is used.
      const needOnboarding = !settings.wasOnboarded;
      if (needOnboarding) {
        dispatch.filters.saveFilter({
          label: 'React PRs',
          data: [],
          loading: false,
          predicates: [
            { type: 'type', value: 'pr' },
            { type: 'repo', value: 'facebook/react' },
            { type: 'status', value: 'open' },
          ],
        });

        dispatch.settings.updateSettings({
          key: 'wasOnboarded',
          value: true,
        });
      }
    },

    async refreshAllData() {
      dispatch.trends.fetchTrendingRepos();
      dispatch.filters.fetchAllFilters();
    },

    async bootstrap() {
      await this.performOnboardingIfNecessary();
      await this.refreshAllData();
    },
  }),
};
