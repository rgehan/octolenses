import { SettingsStore } from '../store/settings';
import { Filter } from '../store/filters';
import { Predicate } from './types';

interface SettingsComponentProps {
  settings: SettingsStore;
}

type SettingsComponent = ({ settings }: SettingsComponentProps) => JSX.Element;
type CardComponent = ({ data }: any) => JSX.Element;

export abstract class AbstractProvider {
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
  public abstract fetchFilter(
    filter: Filter,
    providerSettings: any
  ): Promise<any[]>;
}
