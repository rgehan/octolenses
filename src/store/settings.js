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

  @action.bound
  updateSettings(key, value) {
    this[key] = value;
  }
}

export const settings = new SettingsStore();

// Apply darkMode on the page whenever it changes
autorun(() => {
  const isDark = settings.darkMode === DARK_MODE.ENABLED;
  document.body.className = isDark ? 'dark' : 'light';
});
