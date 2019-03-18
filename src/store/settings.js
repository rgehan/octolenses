import { observable, action, autorun } from 'mobx';
import { persist } from 'mobx-persist';

import { LANGUAGES } from '../constants/languages';
import { DATES } from '../constants/dates';
import { DARK_MODE } from '../constants/darkMode';

class SettingsStore {
  /**
   * Generic store for the providers settings
   */
  @persist('object')
  @observable
  providerSettings = {};

  /**
   * Language used in the "Discover" page
   */
  @persist
  @observable
  language = LANGUAGES[0].value;

  /**
   * How far in the past to find repos in the "Discover" page
   */
  @persist
  @observable
  dateRange = DATES[0].value;

  /**
   * DEPRECATED. Legacy place where the GitHub token was stored.
   */
  @persist
  @observable
  token = undefined;

  /**
   * Current dark mode state. Whether it's always on/off, or only at night.
   */
  @persist
  @observable
  darkMode = DARK_MODE.DISABLED;

  /**
   * Whether the "onboarding" was run
   */
  @persist
  @observable
  wasOnboarded = false;

  /**
   * Version of the current settings schema. It is used to determine which
   * migrations to run.
   */
  @persist
  @observable
  schemaVersion = 2;

  @observable
  isDark = false;

  applyDarkMode() {
    const hours = new Date().getHours();
    const isNightTime = hours >= 19 || hours <= 7;

    if (this.darkMode === DARK_MODE.ENABLED) {
      this.isDark = true;
    } else if (this.darkMode === DARK_MODE.AT_NIGHT && isNightTime) {
      this.isDark = true;
    } else {
      this.isDark = false;
    }

    document.body.className = this.isDark ? 'dark' : 'light';
  }

  @action.bound
  updateSettings(key, value) {
    this[key] = value;
  }
}

export const settings = new SettingsStore();

// Apply darkMode on the page whenever it changes
autorun(() => {
  settings.applyDarkMode();
});

// Update dark mode periodically in case it's now the night
setInterval(() => {
  settings.applyDarkMode();
}, 1000);
