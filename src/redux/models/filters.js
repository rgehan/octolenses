import { filter, findIndex, chain } from 'lodash';
import produce from 'immer';

import { fetchFilter } from '../../lib/github';

export const filters = {
  state: [
    {
      id: 0,
      label: 'Botify PR - Mine',
      data: [],
      loading: false,
      predicates: [
        { type: 'type', value: 'pr' },
        { type: 'author', value: 'rgehan' },
        { type: 'repository', value: 'botify-hq/botify-report' },
        { type: 'status', value: 'open' },
      ],
    },
  ],
  reducers: {
    saveFilter: (_state, filter) =>
      produce(_state, state => {
        const index = findIndex(state, { id: filter.id });

        if (index === -1) {
          state.push(filter);
        } else {
          state[index] = filter;
        }
      }),

    removeFilter: (state, { id }) => filter(state, filter => filter.id !== id),
  },
  effects: dispatch => ({
    async fetchFilter(filter) {
      dispatch.filters.saveFilter({ ...filter, loading: true });
      const data = await fetchFilter(filter);
      dispatch.filters.saveFilter({ ...filter, loading: false, data });
    },

    async fetchAllFilters(_, { filters }) {
      await Promise.all(
        filters.map(filter => dispatch.filters.fetchFilter(filter))
      );
    },

    async saveAndRefreshFilter(filter, { filters }) {
      const id =
        chain(filters)
          .map('id')
          .max() + 1;

      // Default some keys that might be missing because the filter
      // is brand new
      const validFilter = {
        id,
        data: [],
        loading: false,
        ...filter,
      };

      await dispatch.filters.saveFilter(validFilter);
      await dispatch.filters.fetchFilter(validFilter);
    },
  }),
};

export const EMPTY_FILTER_PAYLOAD = {
  label: 'Unnamed filter',
  predicates: [],
};
