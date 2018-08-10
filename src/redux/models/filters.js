import { filter, defaults, findIndex, maxBy, chain } from 'lodash';

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
    saveFilter(state, filter) {
      const index = findIndex(state, { id: filter.id });

      // If it's a new filter
      if (index === -1) {
        return chain(state)
          .clone()
          .concat(filter)
          .value();
      }

      return chain(state)
        .clone()
        .set(index, filter)
        .value();
    },

    removeFilter(state, { id }) {
      return filter(state, filter => filter.id !== id);
    },
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
