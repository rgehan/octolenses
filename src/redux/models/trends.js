import produce from 'immer';

import { fetchTrendingRepos } from '../../lib/github';
import { getDateFromValue } from '../../constants/dates';

export const trends = {
  state: {
    repos: { data: [], loading: false },
  },
  reducers: {
    updateData: (_state, { type, data }) =>
      produce(_state, state => {
        state[type].data = data;
      }),

    updateLoadingState: (_state, { type, loading }) =>
      produce(_state, state => {
        state[type].loading = loading;
      }),
  },
  effects: dispatch => ({
    async fetchTrendingRepos(_, rootState) {
      const { updateLoadingState, updateData } = dispatch.trends;
      const { language, dateRange, token } = rootState.settings;
      const date = getDateFromValue(dateRange);

      updateLoadingState({ type: 'repos', loading: true });

      const repos = await fetchTrendingRepos({ language, date, token });
      updateData({ type: 'repos', data: repos });

      updateLoadingState({ type: 'repos', loading: false });
    },
  }),
};
