import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { HandleResponseErrors } from 'api/HandleResponseErrors';
import { selectPlayerName, loadLocalGameData, IGame } from 'store/game/slice';
import { selectTheme, loadLocalSettingsData, ISettings } from 'store/settings/slice';
import { getLocalStorageValue } from 'utils/functions';
import Game from 'containers/Game';
import Menu from 'containers/Menu';
import Rating from 'containers/Rating';
import Settings from 'containers/Settings';
import About from 'components/About';

import './styles/index.scss';
import classes from './App.module.scss';

const App: React.FC = () => {
  const player = useSelector(selectPlayerName);
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    const gameData = getLocalStorageValue('gameData') as IGame;
    if (gameData?.player === player) {
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
        <HandleResponseErrors />
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
