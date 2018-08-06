import React from 'react';
import { connect } from 'react-redux';

import { Header } from './components/Header';
import { Discover, Dashboard } from './pages';

const PAGES = {
  discover: Discover,
  dashboard: Dashboard,
};

const _App = ({ page }) => {
  const Page = PAGES[page];
  return (
    <div className="App">
      <Header />
      <Page />
    </div>
  );
};

export const App = connect(({ navigation }) => ({ page: navigation.page }))(
  _App
);
