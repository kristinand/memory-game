import React from 'react';
import { useSelector } from 'react-redux';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Game from './containers/Game';
import Menu from './containers/Menu/Menu';
import Rating from './containers/Rating/Rating';
import Settings from './containers/Settings/Settings';

const app = () => {
  const player = useSelector(state => state.player);

  let routes = (
    <Switch>
      <Route path="/rating" component={Rating} />
      <Route path="/settings" component={Settings} />
      <Route path="/" component={Menu} />
      <Redirect to="/" />
    </Switch>
  );

  if (player.length > 0) {
    routes = (
      <Switch>
        <Route path="/game" component={Game} />
        <Route path="/rating" component={Rating} />
        <Route path="/settings" component={Settings} />
        <Route path="/" component={Menu} />
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <HashRouter>
      {routes}
    </HashRouter>
  );
};

export default app;
