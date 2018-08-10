import { filter, defaults, findIndex, maxBy } from 'lodash';
import produce from 'immer';

import { fetchFilter } from '../../lib/github';

export const filters = {
  state: [
    {
      id: 0,
      label: 'Botify PR - Mine',
      data: [],
      loading: false,
      fields: {
        type: 'pr',
        repo: 'botify-hq/botify-report',
        author: 'rgehan',
        archived: 'false',
        is: 'open',
      },
    },
    {
      id: 1,
      label: 'Botify PR - To Review',
      data: [],
      loading: false,
      fields: {
        type: 'pr',
        repo: 'botify-hq/botify-report',
        '-author': 'rgehan',
        archived: 'false',
        is: 'open',
        label: ['PR: Review Todo'],
      },
    },
    {
      id: 2,
      label: 'Laravel issues',
      data: [],
      loading: false,
      fields: {
        type: 'issue',
        repo: 'laravel/framework',
        is: 'open',
        archived: 'false',
      },
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
      const data = await fetchFilter(filter.fields);
      dispatch.filters.saveFilter({ ...filter, loading: false, data });
    },

    async fetchAllFilters(_, { filters }) {
      await Promise.all(
        filters.map(filter => dispatch.filters.fetchFilter(filter))
      );
    },

    async saveAndRefreshFilter(filter, { filters }) {
      const formattedFilter = defaults(filter, {
        id: maxBy(filters, 'id') + 1,
        data: [],
        loading: false,
      });

      await dispatch.filters.saveFilter(formattedFilter);
      await dispatch.filters.fetchFilter(formattedFilter);
    },
  }),
};

export const EMPTY_FILTER_PAYLOAD = {
  label: 'My Super Filter',
  fields: {
    type: 'pr',
    repo: 'username/repo',
    author: 'username',
    archived: 'false',
    is: 'open',
  },
};
