import React from 'react';
import { observer, inject } from 'mobx-react';

import { Header } from './components/Header';
import { Discover, Dashboard } from './pages';

const PAGES = {
  discover: Discover,
  dashboard: Dashboard,
};

@inject('navigation')
@observer
export class App extends React.Component {
  render() {
    const { navigation } = this.props;
    const Page = PAGES[navigation.page];

    return (
      <div className="App">
        <Header navigation={navigation} />
        <Page />
      </div>
    );
  }
}
