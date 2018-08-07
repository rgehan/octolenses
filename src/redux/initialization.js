export const initialize = store => {
  store.dispatch.trends.fetchTrendingRepos();
};