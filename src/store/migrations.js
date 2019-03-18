import { isNil } from 'lodash';
import { ProviderType } from '../providers';

export async function migrateData() {
  const settings = getFromLocalStorage('settingsStore');
  const filters = getFromLocalStorage('filtersStore');

  // If there was no notion of schemaVersion, start at 1
  if (settings && isNil(settings.schemaVersion)) {
    console.log('Migrating schema to v1');
    settings.schemaVersion = 1;
  }

  // Migrating from v1 to v2
  if (settings && settings.schemaVersion === 1) {
    console.log('Migrating schema to v2');

    // Default each filter provider to GitHub
    filters.data.forEach(filter => {
      filter.provider = filter.provider || ProviderType.GITHUB;
    });

    // If a GitHub token is provided, move it to the correct place in the new
    // providers settings.
    if (settings.token && !settings.providerSettings) {
      settings.providerSettings = {
        [ProviderType.GITHUB]: { token: settings.token },
      };
    }

    settings.schemaVersion = 2;
  }

  saveToLocalStorage('settingsStore', settings);
  saveToLocalStorage('filtersStore', filters);
}

function getFromLocalStorage(key) {
  const data = localStorage.getItem(key);

  if (data) {
    return JSON.parse(data);
  }

  return null;
}

function saveToLocalStorage(key, value) {
  const data = JSON.stringify(value);
  localStorage.setItem(key, data);
}
