import { observable, action, computed } from 'mobx';
import { persist } from 'mobx-persist';
import { findIndex, defaults } from 'lodash';
import uuidv1 from 'uuid/v1';
import { arrayMove } from 'react-sortable-hoc';

import { fetchFilter } from '../lib/github';
import { settings } from './settings';
import { toast } from '../components/ToastManager';
import { RateLimitError } from '../errors';

class Filter {
  @persist
  @observable
  id;

  @persist
  @observable
  label = '';

  @persist('list')
  @observable
  predicates = [];

  @observable
  data = [];

  @observable
  loading = false;
}

class FiltersStore {
  @persist('list', Filter)
  @observable
  data = [];

  @computed
  get firstFilterId() {
    if (this.count === 0) {
      return null;
    }

    return this.data[0].id;
  }

  @computed
  get count() {
    return this.data.length;
  }

  @action.bound
  saveFilter(filter) {
    const filterWithDefaults = formatFilter(filter);

    const index = findIndex(this.data, { id: filterWithDefaults.id });
    if (index === -1) {
      this.data.push(filterWithDefaults);
    } else {
      this.data[index] = filterWithDefaults;
    }

    this.fetchFilter(filterWithDefaults);
  }

  @action.bound
  cloneFilter(id) {
    const index = findIndex(this.data, { id });
    const filter = this.data[index];

    const clonedFilter = formatFilter({
      ...filter,
      label: `${filter.label} (Copy)`,
      id: undefined,
    });

    this.data.splice(index + 1, 0, clonedFilter);

    return clonedFilter;
  }

  @action.bound
  removeFilter(id) {
    const index = findIndex(this.data, { id });
    this.data.splice(index, 1);
  }

  @action.bound
  swapFilters(oldIndex, newIndex) {
    this.data = arrayMove(this.data, oldIndex, newIndex);
  }

  @action.bound
  async fetchFilter(filter) {
    const index = findIndex(this.data, { id: filter.id });
    this.data[index].loading = true;

    try {
      const data = await fetchFilter({ filter, token: settings.token });
      this.data[index].data = data;
    } catch (error) {
      const message =
        error instanceof RateLimitError
          ? `You've just hit GitHub rate limiting. Please try again in ${
              error.remainingRateLimit
            } seconds.`
          : 'Something failed while fetching your filter.';

      toast(message, 'error');
    }

    this.data[index].loading = false;
  }

  async fetchAllFilters() {
    await Promise.all(this.data.map(this.fetchFilter));
  }
}

function formatFilter(filter) {
  return defaults({}, filter, {
    data: [],
    loading: false,
    id: uuidv1(),
  });
}

export const EMPTY_FILTER_PAYLOAD = {
  label: 'Unnamed filter',
  predicates: [{ type: 'status', value: 'open' }],
};

export const filters = new FiltersStore();
