import { observer } from 'mobx-react';
import React from 'react';

import { Header, ToastManager } from './components';
import { Dashboard, Discover } from './pages';
import { navigationStore } from './store';

const PAGES = {
  discover: Discover,
  dashboard: Dashboard,
};

type PageName = keyof typeof PAGES;

export const App = observer(() => {
  const Page = PAGES[navigationStore.page as PageName];

  return (
    <div className="App">
      <Header />
      <Page />
      <ToastManager />
    </div>
  );
});
