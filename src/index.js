import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import { App } from './App';
import { bootstrap, navigation, settings, trends, filters } from './store';

import 'normalize.css';

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
