import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';

class NavigationStore {
  @persist
  @observable
  page = 'dashboard';

  @action.bound
  navigateTo(newPage) {
    this.page = newPage;
  }
}

export const navigation = new NavigationStore();
