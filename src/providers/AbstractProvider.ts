import { observable } from 'mobx';
import { persist } from 'mobx-persist';

import { Filter } from '../store/filters';
import { SettingsStore } from '../store/settings';
import { Predicate } from './types';

interface ISettingsComponentProps {
  settings: SettingsStore;
}

type SettingsComponent = ({ settings }: ISettingsComponentProps) => JSX.Element;
type CardComponent = React.ComponentType<{ data: any }>;

export abstract class AbstractProvider<T = {}> {
  /**
   * Unique identifier of the provider
   */
  public id: string;

  /**
   * Name of the provider, as displayed in the Settings sidebar
   */
  public label: string;

  /**
   * Component used to render the provider settings panel
   */
  public settingsComponent: SettingsComponent;

  /**
   * Component used to render the provider's data on the dashboard
   */
  public cardComponent: CardComponent;

  /**
   * A place for the provider to store its specific settings
   */
  @persist('object')
  @observable
  public settings: T = {} as T;

  /**
   * Called after the app has been booted, so that we can perform initial
   * data fetching and initialization tasks.
   */
  public abstract initialize(): Promise<void>;

  /**
   * Returns an array of available predicates for the provider
   */
  public abstract getAvailablePredicates(): Predicate[];

  /**
   * Retrieve the definition of a predicate from its name
   * @param name Name of the predicate we want to retrieve
   */
  public abstract findPredicate(name: string): Predicate;

  /**
   * Fetch a filter associated to this provider
   * @param filter
   * @param providerSettings
   */
  public abstract fetchFilter(filter: Filter): Promise<any[]>;

  /**
   * Resolve the unique identifier associated to a filter item
   * @param item A filter item
   */
  public abstract resolveFilterItemIdentifier(item: any): string;
}
