export const initialize = store => {
  store.dispatch.trends.fetchTrendingRepos();
  store.dispatch.filters.fetchAllFilters();
};
