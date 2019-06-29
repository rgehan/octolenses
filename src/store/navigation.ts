import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';

export class NavigationStore {
  @persist
  @observable
  public page = 'dashboard';

  @action.bound
  public navigateTo(newPage: string) {
    this.page = newPage;
  }
}

export const navigationStore = new NavigationStore();
