import { observable, action } from 'mobx';

class NavigationStore {
  @observable
  page = 'dashboard';

  @action.bound
  navigateTo(newPage) {
    this.page = newPage;
  }
}

export const navigation = new NavigationStore();
