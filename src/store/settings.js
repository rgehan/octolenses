import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';

import { LANGUAGES } from '../constants/languages';
import { DATES } from '../constants/dates';

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

  @action.bound
  updateSettings(key, value) {
    this[key] = value;
  }
}

export const settings = new SettingsStore();
