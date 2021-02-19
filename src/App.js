import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from './store/actions';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Game from './containers/Game';
import Menu from './containers/Menu/Menu';
import Rating from './containers/Rating/Rating';
import Settings from './containers/Settings/Settings';
import classes from './App.css';

const App = () => {
  const player = useSelector((state) => state.player);
  const bgColor = useSelector((state) => state.settings.bgColor);
  const dispatch = useDispatch();

  useEffect(() => {
    let localPlayer = '';
    const playerSettings = {};
    if (localStorage.getItem('player') !== null) localPlayer = localStorage.getItem('player');
    if (localStorage.getItem('music') !== null) JSON.parse(playerSettings.musicVolume = localStorage.getItem('music'));
    if (localStorage.getItem('sound') !== null) JSON.parse(playerSettings.soundVolume = localStorage.getItem('sound'));
    if (localStorage.getItem('bgColor') !== null) playerSettings.bgColor = localStorage.getItem('bgColor');

    dispatch(actions.loadLocalData(localPlayer, playerSettings));
  }, []);

  return (
    <div className={classes.App} style={{backgroundColor: bgColor}}>
      <div className={classes.wrapper}>
        <HashRouter>
          <Switch>
            {player.length > 0 ? <Route path="/game" component={Game}/> : '' }
            <Route path="/rating" component={Rating} />
            <Route path="/settings" component={Settings} />
            <Route path="/" component={Menu} />
            <Redirect to="/" />
          </Switch>
        </HashRouter>
      </div>
    </div>
  );
};

export default App;
