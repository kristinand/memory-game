import fs from 'fs';
import path from 'path';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import ReactDOMServer from 'react-dom/server';
import App from '../src/App';
import { store, rootReducer } from '../src/store';

const renderer = (req, res) => {
  const reduxStore = createStore(rootReducer);
  let indexHTML = fs.readFileSync(path.resolve('public/index.html'), {
    encoding: 'utf8',
  });

  let appHTML = ReactDOMServer.renderToString(
    <Provider store={reduxStore}>
      <StaticRouter location={req.originalUrl}>
        <App />
      </StaticRouter>
    </Provider>,
  );

  const preloadedState = store.getState();
  indexHTML = indexHTML
    .replace('<div id="root"></div>', `<div id="root">${appHTML}</div>`)
    // .replace(
    //   '"window.__PRELOADED_STATE__"',
    //   (window.__PRELOADED_STATE__ = JSON.stringify(preloadedState).replace(/</g, '\\u003c')),
    // );

  res.contentType('text/html');
  res.status(200);
  return res.send(indexHTML);
};

export default renderer;
