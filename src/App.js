import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from './store/actions';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Game from './containers/Game';
import Menu from './containers/Menu/Menu';
import Rating from './containers/Rating/Rating';
import Settings from './containers/Settings/Settings';

const App = () => {
  const player = useSelector(state => state.player);
  const dispatch = useDispatch();

  useEffect(() => {
    const localData = {};
    if (localStorage.getItem('player') !== null) localData.player = localStorage.getItem('player');
    if (localStorage.getItem('music') !== null) localData.musicVolume = localStorage.getItem('music');
    if (localStorage.getItem('sound') !== null) localData.soundVolume = localStorage.getItem('sound');

    dispatch(actions.loadLocalData(localData));
  }, [])

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

export default App;
