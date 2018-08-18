import { observable, action, computed } from 'mobx';
import { persist } from 'mobx-persist';
import { findIndex } from 'lodash';
import uuidv1 from 'uuid/v1';

import { fetchFilter } from '../lib/github';
import { settings } from './settings';

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
  error = null;

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
  removeFilter(id) {
    const index = findIndex(this.data, { id });
    this.data.splice(index, 1);
  }

  @action.bound
  async fetchFilter(filter) {
    const index = findIndex(this.data, { id: filter.id });
    this.data[index].loading = true;

    try {
      const data = await fetchFilter({ filter, token: settings.token });
      this.data[index].data = data;
    } catch (error) {
      this.data[index].error = error;
    }

    this.data[index].loading = false;
  }

  async fetchAllFilters() {
    await Promise.all(this.data.map(this.fetchFilter));
  }
}

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

export const filters = new FiltersStore();
