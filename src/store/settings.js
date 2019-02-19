import { observable, action, autorun } from 'mobx';
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

  @persist
  @observable
  schemaVersion = undefined;

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
