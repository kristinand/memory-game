import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import ReactDOMServer from 'react-dom/server';
import App from '../src/App';
import { rootReducer } from '../src/store';
import { template } from './htmlTemplate';

const renderer = (req, res) => {
  const store = configureStore({ reducer: rootReducer });
  const preloadedState = store.getState();

  const appHTML = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.originalUrl}>
        <App />
      </StaticRouter>
    </Provider>,
  );
  const indexHTML = template(appHTML, JSON.stringify(preloadedState));

  res.contentType('text/html');
  res.status(200);
  return res.send(indexHTML);
};

export default renderer;
