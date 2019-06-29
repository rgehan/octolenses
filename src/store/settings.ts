import { action, autorun, observable } from 'mobx';
import { persist } from 'mobx-persist';

import { DARK_MODE } from '../constants/darkMode';
import { DATES } from '../constants/dates';
import { LANGUAGES } from '../constants/languages';

export class SettingsStore {
  /**
   * Language used in the "Discover" page
   */
  @persist
  @observable
  public language = LANGUAGES[0].value;

  /**
   * How far in the past to find repos in the "Discover" page
   */
  @persist
  @observable
  public dateRange = DATES[0].value;

  /**
   * DEPRECATED. Legacy place where the GitHub token was stored.
   */
  @persist
  @observable
  public token = undefined;

  /**
   * Current dark mode state. Whether it's always on/off, or only at night.
   */
  @persist
  @observable
  public darkMode = DARK_MODE.DISABLED;

  /**
   * Whether the "onboarding" was run
   */
  @persist
  @observable
  public wasOnboarded = false;

  /**
   * Id of the filter that is selected in the sidebar
   */
  @persist
  @observable
  public selectedFilterId: string = null;

  /**
   * Version of the current settings schema. It is used to determine which
   * migrations to run.
   */
  @persist
  @observable
  public schemaVersion = 3;

  @observable
  public isDark = false;

  public applyDarkMode() {
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

  // TODO Do not rely on magic setter
  @action.bound
  public updateSettings(key: string, value: any) {
    this[key] = value;
  }
}

export const settingsStore = new SettingsStore();

// Apply darkMode on the page whenever it changes
autorun(() => {
  settingsStore.applyDarkMode();
});

// Update dark mode periodically in case it's now the night
setInterval(() => {
  settingsStore.applyDarkMode();
}, 1000);
