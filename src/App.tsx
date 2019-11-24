import { inject, observer } from 'mobx-react';
import React from 'react';
import { compose } from 'recompose';

import { Header, ToastManager } from './components';
import { Dashboard, Discover } from './pages';
import { NavigationStore } from './store/navigation';

const PAGES = {
  discover: Discover,
  dashboard: Dashboard,
};

type PageName = keyof typeof PAGES;

interface IInnerProps {
  navigationStore: NavigationStore;
}

export const App = compose<IInnerProps, {}>(
  inject('navigationStore'),
  observer
)(({ navigationStore }) => {
  const Page = PAGES[navigationStore.page as PageName];

  return (
    <div className="App">
      <Header />
      <Page />
      <ToastManager />
    </div>
  );
});
