import { set } from 'lodash';

import { ProviderType } from '../providers';
import { Filter } from '../store/filters';
import { Migration } from './index';
import { getFromLocalStorage, saveToLocalStorage } from './utils';

export default class implements Migration {
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

    saveToLocalStorage('githubProvider', {
      settings: { token: settings.token },
    });
  }

  private upgradeSchemaVersion() {
    const settings = getFromLocalStorage('settingsStore');
    settings.schemaVersion = 2;
    saveToLocalStorage('settingsStore', settings);
  }
}
