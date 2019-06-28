import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import { App } from './App';
import { bootstrap, navigation, settings, trends, filters } from './store';

bootstrap();

ReactDOM.render(
  <Provider
    navigation={navigation}
    settings={settings}
    trends={trends}
    filters={filters}
  >
    <App />
  </Provider>,
  document.getElementById('container')
);
