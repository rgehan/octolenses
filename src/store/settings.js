import { observable, action, autorun, computed } from 'mobx';
import { persist } from 'mobx-persist';

import { LANGUAGES } from '../constants/languages';
import { DATES } from '../constants/dates';
import { DARK_MODE } from '../constants/darkMode';

class SettingsStore {
  @persist
  @observable
  language = LANGUAGES[0].value;

  @persist
  @observable
  dateRange = DATES[0].value;

  @persist
  @observable
  token = undefined;

  @persist
  @observable
  wasOnboarded = false;

  @persist
  @observable
  darkMode = DARK_MODE.DISABLED;

  @action.bound
  updateSettings(key, value) {
    this[key] = value;
  }

  @computed
  get isDark() {
    return this.darkMode === DARK_MODE.ENABLED;
  }
}

export const settings = new SettingsStore();

// Apply darkMode on the page whenever it changes
autorun(() => {
  applyDarkMode(settings.darkMode);
});

// Update dark mode periodically in case it's now the night
setInterval(() => {
  applyDarkMode(settings.darkMode);
}, 1000);

/**
 * Update dark mode using the user settings.
 * @param {string} darkMode What dark mode setting is used by the user
 */
function applyDarkMode(darkMode) {
  const hours = new Date().getHours();
  const isNightTime = hours >= 19 || hours <= 7;

  const isDark =
    darkMode === DARK_MODE.ENABLED ||
    (darkMode === DARK_MODE.AT_NIGHT && isNightTime);

  document.body.className = isDark ? 'dark' : 'light';
}
