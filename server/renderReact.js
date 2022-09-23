const express = require('express');
const fs = require('fs');
const path = require('path');
const React = require('react');
const { createStore } = require('redux');
const { Provider } = require('react-redux');
const { StaticRouter } = require('react-router-dom/server');
const ReactDOMServer = require('react-dom/server');
const App = require('../src/App/index.tsx');
const { store, rootReducer } = require('../src/store/index.ts');

const app = express();
app.get(/\.(js|css|map|ico)$/, express.static(path.resolve('public')));

app.use('*', (req, res) => {
  const reduxStore = createStore(rootReducer);
  let indexHTML = fs.readFileSync(path.resolve('public/index.html'), {
    encoding: 'utf8',
  });

  let appHTML = ReactDOMServer.renderToString(
    <Provider store={reduxStore}>
      <StaticRouter location={req.originalUrl}>
        <App.default />
      </StaticRouter>
    </Provider>,
  );

  const preloadedState = store.getState();
  indexHTML = indexHTML
    .replace('<div id="app"></div>', `<div id="app">${appHTML}</div>`)
    .replace(
      '"window.__PRELOADED_STATE__"',
      (window.__PRELOADED_STATE__ = JSON.stringify(preloadedState).replace(/</g, '\\u003c')),
    );

  res.contentType('text/html');
  res.status(200);
  return res.send(appHTML);
});

app.listen('9000', () => {
  console.log('Express server started at <http://localhost:9000>');
});
