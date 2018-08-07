export const initialize = store => {
  store.dispatch.trends.fetchRepos();
};