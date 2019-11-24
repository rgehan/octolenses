import { action, observable } from 'mobx';

import { getDateFromValue } from '../constants/dates';
import { fetchTrendingRepos } from '../lib/github';
import { settingsStore } from './settings';

export class TrendsStore {
  @observable
  public data: any[] = [];

  @observable
  public loading = false;

  @action.bound
  public updateRepos(newRepos: any[]) {
    this.data = newRepos;
  }

  @action.bound
  public setLoading(isLoading: boolean) {
    this.loading = isLoading;
  }

  @action.bound
  public async fetchTrendingRepos() {
    const language = settingsStore.language;
    const date = getDateFromValue(settingsStore.dateRange);
    const token = settingsStore.token;

    this.loading = true;
    this.data = await fetchTrendingRepos({ language, date, token });
    this.loading = false;
  }
}

export const trendsStore = new TrendsStore();
