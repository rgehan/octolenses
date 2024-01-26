import 'babel-polyfill';
import { Provider } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';
import {
  bootstrap,
  filtersStore,
  navigationStore,
  settingsStore,
  trendsStore,
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
