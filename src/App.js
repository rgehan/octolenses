import React from 'react';
import { observer, inject } from 'mobx-react';

import { Discover, Dashboard } from './pages';
import { Header, ToastManager } from './components';

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
        <ToastManager />
      </div>
    );
  }
}
