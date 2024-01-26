/* tslint:disable no-console */

import { providers, ProviderType } from '../providers';
import { Filter } from '../store/filters';
import { IMigration } from './types';
import { getFromLocalStorage, saveToLocalStorage } from './utils';

export default class implements IMigration {
  public name = 'v2-to-v3';

  public shouldRun(): boolean {
    const settings = getFromLocalStorage('settingsStore');

    if (settings && settings.schemaVersion === 2) {
      return true;
    }

    return false;
  }

  public run() {
    this.defaultPredicatesOperators();
    this.upgradeSchemaVersion();
  }

  private defaultPredicatesOperators() {
    const filters = getFromLocalStorage('filtersStore');

    // There shouldn't be any other provider in use for now
    const provider = providers[ProviderType.GITHUB];

    console.log('[migration] Defaulting all predicates operators');
    filters.data.forEach((filter: Filter) => {
      filter.predicates.forEach((predicate: any) => {
        const isNegated = predicate.negated;

        predicate.negated = undefined;

        const predicateDefinition = provider.findPredicate(predicate.type);

        // Shouldn't happen, but let's be safe
        if (!predicateDefinition) {
          return;
        }

        // Operator-less predicates don't have an `operator` key
        if (predicateDefinition.operators.length === 0) {
          return;
        }

        predicate.operator = isNegated ? 'not_equal' : 'equal';
      });
    });

    saveToLocalStorage('filtersStore', filters);
  }

  private upgradeSchemaVersion() {
    const settings = getFromLocalStorage('settingsStore');
    settings.schemaVersion = 3;
    console.log('[migration] Upgrading schema version to 3');
    saveToLocalStorage('settingsStore', settings);
  }
}
