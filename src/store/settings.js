import { observable, action } from 'mobx';

import { LANGUAGES } from '../constants/languages';
import { DATES } from '../constants/dates';

class SettingsStore {
  @observable
  language = LANGUAGES[0].value;

  @observable
  dateRange = DATES[0].value;

  @observable
  token = undefined;

  @observable
  wasOnboarded = false;

  @action.bound
  updateSettings(key, value) {
    this[key] = value;
  }
}

export const settings = new SettingsStore();
