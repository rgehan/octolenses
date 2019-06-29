import { find, findIndex, merge } from 'lodash';
import { action, computed, observable } from 'mobx';
import { persist } from 'mobx-persist';
import { arrayMove } from 'react-sortable-hoc';

import { toast } from '../components/ToastManager';
import { providers, ProviderType } from '../providers';
import { Filter, FilterIdentifier } from './models/filter';

export { Filter };

export class FiltersStore {
  @persist('list', Filter)
  @observable
  private data: Filter[] = [];

  @computed
  get count() {
    return this.data.length;
  }

  public findFilter(id: string) {
    return find(this.data, { id });
  }

  public findFilterIndex(id: string) {
    return findIndex(this.data, { id });
  }

  public getFilters() {
    return this.data;
  }

  public getFilterAt(index: number) {
    return this.data[index];
  }

  public getFirstFilter() {
    return this.data[0] || null;
  }

  // TODO Any
  @action.bound
  public saveFilter(filterPayload: any) {
    const index = findIndex(this.data, { id: filterPayload.id });

    // If we're saving a filter that already exists, we only need to update
    // some of its attributes
    if (index !== -1) {
      merge(this.data[index], filterPayload);
      return;
    }

    // Else create a new filter
    const filter = Filter.fromAttributes(filterPayload);
    this.data.push(filter);
    filter.fetchFilter();
  }

  @action.bound
  public cloneFilter(id: FilterIdentifier) {
    const index = findIndex(this.data, { id });
    const filter = this.data[index];

    const clonedFilter = filter.clone();

    this.data.splice(index + 1, 0, clonedFilter);

    return clonedFilter;
  }

  @action.bound
  public removeFilter(id: FilterIdentifier) {
    const index = findIndex(this.data, { id });
    this.data.splice(index, 1);
  }

  @action.bound
  public swapFilters(oldIndex: number, newIndex: number) {
    this.data = arrayMove(this.data, oldIndex, newIndex);
  }

  public async fetchAllFilters() {
    await Promise.all(this.data.map(filter => filter.invalidateCache()));
  }
}

export const EMPTY_FILTER_PAYLOAD = {
  provider: ProviderType.GITHUB,
  label: 'Unnamed filter',
  predicates: [{ type: 'status', value: 'open' }],
};

export const filtersStore = new FiltersStore();
