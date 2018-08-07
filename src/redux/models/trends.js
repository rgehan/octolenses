import { set } from 'lodash/fp';

import { fetchRepos } from '../../lib/github';
import { getDateFromValue } from '../../constants/dates';

export const trends = {
  state: {
    repos: { data: [], loading: false },
  },
  reducers: {
    updateData(state, { type, data }) {
      return set([type, 'data'], data, state);
    },
    updateLoadingState(state, { type, loading }) {
      return set([type, 'loading'], loading, state);
    },
  },
  effects: dispatch => ({
    async fetchRepos(_, rootState) {
      const { updateLoadingState, updateData } = dispatch.trends;
      const { language, dateRange } = rootState.settings;
      const date = getDateFromValue(dateRange);

      updateLoadingState({ type: 'repos', loading: true });

      const repos = await fetchRepos(language, date);
      updateData({ type: 'repos', data: repos });

      updateLoadingState({ type: 'repos', loading: false });
    },
  })
};
