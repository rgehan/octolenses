import { difference, map } from 'lodash';
import { action, computed, observable } from 'mobx';
import { persist } from 'mobx-persist';
import hash from 'object-hash';
import uuidv1 from 'uuid/v1';

import { providers, ProviderType, StoredPredicate } from '../../providers';

export type FilterIdentifier = string;

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
  public error: Error = null;

  @persist
  @observable
  public lastModified: number = 0;

  @persist('list')
  @observable
  private previousItemsIdentifiers: string[] = [];

  @observable
  private newItemsIdentifiers: string[] = [];

  /*
     * Public API
     */

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

  public isItemNew(item: any) {
    const identifier = this.getItemIdentifier(item);
    return this.newItemsIdentifiers.includes(identifier);
  }

  /*
     * Computed
     */

  @computed
  public get hash(): string {
    return hash({
      id: this.id,
      lastModified: this.lastModified,
      predicates: this.predicates,
    });
  }

  @computed
  public get newItemsCount() {
    return this.newItemsIdentifiers.length;
  }

  /*
     * Actions
     */

  @action.bound
  public invalidateCache() {
    this.lastModified = Date.now();
  }

  @action.bound
  public setLoading(loading: boolean) {
    this.loading = loading;
  }

  @action.bound
  public setError(error: Error) {
    this.error = error;
  }

  @action.bound
  public setData(data: any) {
    const currentItemsIdentifiers = this.getItemsIdentifiers(data);

    // Update the data
    this.data = data;

    // Store the IDs of the items that weren't previously known
    this.newItemsIdentifiers = difference(
      currentItemsIdentifiers,
      this.previousItemsIdentifiers
    );

    // Store the IDs of the current items, for later comparison
    this.previousItemsIdentifiers = currentItemsIdentifiers;
  }

  private getItemsIdentifiers(items: any[]) {
    return map(items, this.getItemIdentifier);
  }

  private getItemIdentifier = (item: any) => {
    const provider = providers[this.provider];
    return provider.resolveFilterItemIdentifier(item);
  };
}
