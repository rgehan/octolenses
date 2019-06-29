import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import { App } from './App';
import {
  bootstrap,
  navigationStore,
  settingsStore,
  trendsStore,
  filtersStore,
} from './store';

bootstrap();

ReactDOM.render(
  <Provider
    navigationStore={navigationStore}
    settingsStore={settingsStore}
    trendsStore={trendsStore}
    filtersStore={filtersStore}
  >
    <App />
  </Provider>,
  document.getElementById('container')
);
