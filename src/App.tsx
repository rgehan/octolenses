import { inject, observer } from 'mobx-react';
import React from 'react';

import { Header, ToastManager } from './components';
import { IsDarkContext } from './contexts/isDark';
import { Dashboard, Discover } from './pages';
import { NavigationStore } from './store/navigation';
import { SettingsStore } from './store/settings';

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
  public render() {
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
