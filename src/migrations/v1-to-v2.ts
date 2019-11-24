/* tslint:disable no-console */

import { ProviderType } from '../providers';
import { Filter } from '../store/filters';
import { IMigration } from './types';
import { getFromLocalStorage, saveToLocalStorage } from './utils';

export default class implements IMigration {
  public name = 'v1-to-v2';

  public shouldRun(): boolean {
    const settings = getFromLocalStorage('settingsStore');

    if (settings && settings.schemaVersion === 1) {
      return true;
    }

    return false;
  }

  public run() {
    this.defaultFiltersProviderToGithub();
    this.moveTokenFromSettingsToGithubProvider();
    this.upgradeSchemaVersion();
  }

  private defaultFiltersProviderToGithub() {
    const filters = getFromLocalStorage('filtersStore');

    console.log('[migration] Defaulting all filters providers to "github"');
    filters.data.forEach((filter: Filter) => {
      filter.provider = filter.provider || ProviderType.GITHUB;
    });

    saveToLocalStorage('filtersStore', filters);
  }

  private moveTokenFromSettingsToGithubProvider() {
    const settings = getFromLocalStorage('settingsStore');
    const githubProvider = getFromLocalStorage('githubProvider');

    if (githubProvider || !settings.token) {
      return;
    }

    console.log('[migration] Moving set token to github provider settings');
    saveToLocalStorage('githubProvider', {
      settings: { token: settings.token },
    });
  }

  private upgradeSchemaVersion() {
    const settings = getFromLocalStorage('settingsStore');
    settings.schemaVersion = 2;
    console.log('[migration] Upgrading schema version to 2');
    saveToLocalStorage('settingsStore', settings);
  }
}
