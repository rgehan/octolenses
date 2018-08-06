import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { getPersistor } from '@rematch/persist';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { App } from './App';
import { store } from './redux';

ReactDOM.render(
  <PersistGate persistor={getPersistor()}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>,
  document.getElementById('container')
);
