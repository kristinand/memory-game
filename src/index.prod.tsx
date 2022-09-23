/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { store, rootReducer } from './store';

// Create Redux store with state injected by the server
// @ts-ignore
const reduxStore = createStore(rootReducer, window.__PRELOADED_STATE__);

// Allow the passed state to be garbage-collected
// @ts-ignore
delete window.__PRELOADED_STATE__;

ReactDOM.hydrate(
  <Provider store={reduxStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
