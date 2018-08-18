import { observable, action } from 'mobx';

import { fetchTrendingRepos } from '../lib/github';
import { getDateFromValue } from '../constants/dates';
import { settings } from './settings';

class TrendsStore {
  @observable
  data = [];

  @observable
  loading = false;

  @action.bound
  updateRepos(newRepos) {
    this.repos = newRepos;
  }

  @action.bound
  setLoading(isLoading) {
    this.loading = isLoading;
  }

  @action.bound
  async fetchTrendingRepos() {
    const language = settings.language;
    const date = getDateFromValue(settings.dateRange);
    const token = settings.token;

    this.loading = true;
    this.data = await fetchTrendingRepos({ language, date, token });
    this.loading = false;
  }
}

export const trends = new TrendsStore();
