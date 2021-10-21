import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import classNames from 'classnames';

import { loadLocalGameData } from 'store/game/actions';
import { loadLocalSettingsData } from 'store/settings/actions';
import { IState } from 'store/entities';
import { ISettings } from 'store/settings/entities';
import { IGame } from 'store/game/entities';
import { getLocalStorageValue } from 'utils/functions';
import Game from 'containers/Game';
import Menu from 'containers/Menu';
import Rating from 'containers/Rating';
import Settings from 'containers/Settings';
import About from 'components/About';

import './styles/index.scss';
import classes from './App.module.scss';

const App: React.FC = () => {
  const player = useSelector((state: IState) => state.game.player);
  const theme = useSelector((state: IState) => state.settings.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    const gameData = getLocalStorageValue('gameData') as IGame;
    if (gameData.player === player) {
      dispatch(loadLocalGameData(gameData));
    }
    const settings = getLocalStorageValue('settings') as Partial<ISettings>;
    if (settings) {
      dispatch(loadLocalSettingsData(settings));
    }
  }, [player]);

  return (
    <div className={classNames(classes.App, classes[theme])}>
      <BrowserRouter>
        <Switch>
          {player && <Route path="/game" component={Game} />}
          <Route path="/about" component={About} />
          <Route path="/rating" component={Rating} />
          {player && <Route path="/settings" component={Settings} />}
          <Route path="/" component={Menu} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
