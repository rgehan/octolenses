import React from 'react';
import { observer, inject } from 'mobx-react';

import { Discover, Dashboard } from './pages';
import { Header, ToastManager } from './components';
import { IsDarkContext } from './contexts/isDark';
import { SettingsStore } from './store/settings';
import { NavigationStore } from './store/navigation';

const PAGES = {
  discover: Discover,
  dashboard: Dashboard,
};

interface IProps {
  navigation: NavigationStore;
  settings: SettingsStore;
}

@inject('navigation', 'settings')
@observer
export class App extends React.Component<IProps> {
  render() {
    const { navigation, settings } = this.props;
    const Page = PAGES[navigation.page];

    return (
      <div className="App">
        <IsDarkContext.Provider value={settings.isDark}>
          <Header navigation={navigation} />
          <Page />
          <ToastManager />
        </IsDarkContext.Provider>
      </div>
    );
  }
}
