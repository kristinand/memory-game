import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { loadLocalGameData } from 'store/game/actions';
import { loadLocalSettingsData } from 'store/settings/actions';
import { IState } from 'store/entities';
import { ISettings } from 'store/settings/entities';
import { IGameData } from 'entities/';
import { getLocalStorageValue } from 'utils/functions';
import Game from './containers/Game/Game';
import Menu from './containers/Menu/Menu';
import Rating from './containers/Rating/Rating';
import Settings from './containers/Settings/Settings';
import About from './components/About/About';

import './styles/index.scss';
import classes from './App.module.scss';

const App: React.FC = () => {
  const isLoggedIn = useSelector((state: IState) => state.game.isLoggedIn);
  const bgColor = useSelector((state: IState) => state.settings.bgColor);
  const dispatch = useDispatch();

  useEffect(() => {
    const player = localStorage.getItem('player');
    if (player) {
      const gameData = getLocalStorageValue('gameData') as IGameData;
      dispatch(loadLocalGameData(player, gameData));
    }
    const settingsData = getLocalStorageValue('settingsData') as ISettings;
    if (settingsData) {
      dispatch(loadLocalSettingsData(settingsData));
    }
  }, []);

  return (
    <div className={classes.App} style={{ backgroundColor: bgColor }}>
      <div className={classes.wrapper}>
        <BrowserRouter>
          <Switch>
            {isLoggedIn && <Route path="/game" component={Game} />}
            <Route path="/about" component={About} />
            <Route path="/rating" component={Rating} />
            {isLoggedIn && <Route path="/settings" component={Settings} />}
            <Route path="/" component={Menu} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
