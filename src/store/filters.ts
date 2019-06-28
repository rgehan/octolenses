import { chain, findIndex, map } from 'lodash';
import { action, computed, observable } from 'mobx';
import { persist } from 'mobx-persist';
import hash from 'object-hash';
import { arrayMove } from 'react-sortable-hoc';
import uuidv1 from 'uuid/v1';

import { toast } from '../components/ToastManager';
import { providers, ProviderType, StoredPredicate } from '../providers';

type FilterIdentifier = string;

export class Filter {
  public static fromAttributes({ provider, label, predicates, id }: any) {
    const filter = new Filter();
    filter.provider = provider;
    filter.label = label;
    filter.predicates = predicates;
    filter.id = id || uuidv1();
    filter.data = [];
    filter.loading = true;
    return filter;
  }

  @persist
  public provider: ProviderType;

  @persist
  @observable
  public id: FilterIdentifier;

  @persist
  @observable
  public label = '';

  @persist('list')
  @observable
  public predicates: StoredPredicate[] = [];

  @observable
  public data: any[] = []; // TODO

  @observable
  public loading = true;

  @observable
  public lastModified: number = 0;

  @persist('list')
  @observable
  private previousItemsIdentifiers: string[] = [];

  @observable
  public newItemsCount = 0;

  public serializePredicate(payload: StoredPredicate): string {
    const provider = providers[this.provider];
    const predicate = provider.findPredicate(payload.type);
    return predicate.serialize(payload);
  }

  public clone(): Filter {
    return Filter.fromAttributes({
      provider: this.provider,
      label: `${this.label} (Copy)`,
      predicates: this.predicates,
    });
  }

  public invalidateCache() {
    this.lastModified = Date.now();
  }

  @computed
  public get hash(): string {
    return hash({
      id: this.id,
      lastModified: this.lastModified,
      predicates: this.predicates,
    });
  }

  @action.bound
  public setLoading(loading: boolean) {
    this.loading = loading;
  }

  @action.bound
  public setData(data: any) {
    const newItemsIdentifiers = this.getItemsIdentifiers(data);

    // Update the data
    this.data = data;

    // Compute the number of new items
    this.newItemsCount = chain(newItemsIdentifiers)
      .difference(this.previousItemsIdentifiers)
      .size()
      .value();

    // Store the IDs of these items, for comparison next time we update the data
    this.previousItemsIdentifiers = newItemsIdentifiers;
  }

  private getItemsIdentifiers(items: any[]) {
    const provider = providers[this.provider];
    return map(items, item => provider.resolveFilterItemIdentifier(item));
  }
}

export class FiltersStore {
  @persist('list', Filter)
  @observable
  private data: Filter[] = [];

  @computed
  get firstFilterId(): FilterIdentifier {
    if (this.count === 0) {
      return null;
    }

    return this.data[0].id;
  }

  @computed
  get count() {
    return this.data.length;
  }

  // TODO Any
  @action.bound
  public saveFilter(filterPayload: any) {
    const filter = Filter.fromAttributes(filterPayload);

    const index = findIndex(this.data, { id: filter.id });
    if (index === -1) {
      this.data.push(filter);
    } else {
      this.data[index] = filter;
    }

    this.fetchFilter(filter);
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

  @action.bound
  public async fetchFilter(filter: Filter) {
    filter.setLoading(true);

    try {
      const result = await providers[filter.provider].fetchFilter(filter);
      filter.setData(result);
    } catch (error) {
      // TODO Handle various errors (RateLimitError for now)
      toast('Oops, something failed with your filter!', 'error');
      console.log(error);
    }

    filter.loading = false;
  }

  public async fetchAllFilters() {
    await Promise.all(this.data.map(this.fetchFilter));
  }
}

export const EMPTY_FILTER_PAYLOAD = {
  provider: ProviderType.GITHUB,
  label: 'Unnamed filter',
  predicates: [{ type: 'status', value: 'open' }],
};

export const filters = new FiltersStore();
