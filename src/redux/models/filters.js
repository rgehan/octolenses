import { filter, findIndex } from 'lodash';
import produce from 'immer';
import uuidv1 from 'uuid/v1';

import { fetchFilter } from '../../lib/github';

export const filters = {
  state: [],
  reducers: {
    saveFilter: (_state, filter) =>
      produce(_state, state => {
        const filterWithDefaults = formatFilter(filter);

        const index = findIndex(state, { id: filterWithDefaults.id });
        if (index === -1) {
          state.push(filterWithDefaults);
        } else {
          state[index] = filterWithDefaults;
        }

        return state;
      }),

    removeFilter: (state, { id }) => filter(state, filter => filter.id !== id),
  },
  effects: dispatch => ({
    async fetchFilter(filter, { settings }) {
      dispatch.filters.saveFilter({ ...filter, loading: true });

      let data = [];
      let error = null;
      try {
        data = await fetchFilter({ filter, token: settings.token });
      } catch (err) {
        error = err;
      }

      dispatch.filters.saveFilter({ ...filter, loading: false, data, error });
    },

    async fetchAllFilters(_, { filters }) {
      await Promise.all(
        filters.map(filter => dispatch.filters.fetchFilter(filter))
      );
    },

    async saveAndRefreshFilter(filter) {
      const filterWithDefaults = formatFilter(filter);
      await dispatch.filters.saveFilter(filterWithDefaults);
      await dispatch.filters.fetchFilter(filterWithDefaults);
    },
  }),
};

function formatFilter(filter) {
  return {
    data: [],
    error: null,
    loading: false,
    id: uuidv1(),
    ...filter,
  };
}

export const EMPTY_FILTER_PAYLOAD = {
  label: 'Unnamed filter',
  predicates: [],
};
