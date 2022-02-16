import { difference, map, merge } from 'lodash';
import { action, computed, observable, reaction } from 'mobx';
import { persist } from 'mobx-persist';
import hash from 'object-hash';
import uuidv1 from 'uuid/v1';

import { toast } from '../../components/ToastManager';
import { providers, ProviderType, IStoredPredicate } from '../../providers';

export type FilterIdentifier = string;

export class Filter {
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
  public predicates: IStoredPredicate[] = [];

  @observable
  public data: any[] = []; // TODO

  @observable
  public loading = true;

  @observable
  public error: Error = null;

  @persist
  @observable
  public lastModified = 0;

  @persist('list')
  @observable
  private previousItemsIdentifiers: string[] = [];

  @observable
  private newItemsIdentifiers: string[] = [];

  @observable
  private disableNotificationsOnNextFetch: false;

  constructor() {
    // When the hash of the filter changes, re-fetch it
    reaction(
      () => this.hash,
      () => {
        this.fetchFilter();
      }
    );
  }

  /*
   * Static
   */

  public static fromAttributes({ id, ...otherAttributes }: any) {
    const filter = new Filter();
    filter.id = id || uuidv1();
    merge(filter, otherAttributes);
    return filter;
  }

  /*
   * Public API
   */

  public serializePredicate(payload: IStoredPredicate): string {
    const provider = providers[this.provider];
    const predicate = provider.findPredicate(payload.type);
    return predicate.serialize(payload);
  }

  public clone(): Filter {
    return Filter.fromAttributes({
      provider: this.provider,
      label: `${this.label} (Copy)`,
      predicates: this.predicates,
      data: this.data,
      loading: this.loading,
      error: this.error,
      lastModified: this.lastModified,
      previousItemsIdentifiers: this.previousItemsIdentifiers,
      newItemsIdentifiers: this.newItemsIdentifiers,
    });
  }

  public isItemNew(item: any) {
    const identifier = this.getItemIdentifier(item);
    return this.newItemsIdentifiers.includes(identifier);
  }

  public clearNewItemsNotifications() {
    this.newItemsIdentifiers = [];
  }

  public update(payload: any) {
    Object.assign(this, {
      disableNotificationsOnNextFetch: true,
      ...payload,
    });
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
  public async fetchFilter() {
    this.loading = true;
    this.error = null;

    try {
      const result = await providers[this.provider].fetchFilter(this);
      this.setData(result);
    } catch (error) {
      toast('Oops, something failed with your filter!', 'error');
      this.error = error;
    }

    this.loading = false;
  }

  @action.bound
  public invalidateCache() {
    this.lastModified = Date.now();
  }

  @action.bound
  public setData(data: any) {
    const currentItemsIdentifiers = this.getItemsIdentifiers(data);

    // Update the data
    this.data = data;

    if (!this.disableNotificationsOnNextFetch) {
      // Store the IDs of the items that weren't previously known
      this.newItemsIdentifiers = difference(
        currentItemsIdentifiers,
        this.previousItemsIdentifiers
      );
    } else {
      this.newItemsIdentifiers = [];
      this.disableNotificationsOnNextFetch = false;
    }

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
