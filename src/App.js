import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from './store/actions';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Game from './containers/Game/Game';
import Menu from './containers/Menu/Menu';
import Rating from './containers/Rating/Rating';
import Settings from './containers/Settings/Settings';
import About from './containers/About/About';
import classes from './App.css';

const App = () => {
  const player = useSelector((state) => state.player);
  const bgColor = useSelector((state) => state.settings.bgColor);
  const dispatch = useDispatch();

  useEffect(() => {
    const player = localStorage.getItem('player');
    let gameData = localStorage.getItem('gameData') || '{}';
    if (player !== null) {
      gameData = JSON.parse(gameData);
      dispatch(actions.loadLocalGameData(player, gameData));
      // подгружаем его настройки с сервера
    }
  }, []);

  return (
    <div className={classes.App} style={{ backgroundColor: bgColor }}>
      <div className={classes.wrapper}>
        <HashRouter>
          <Switch>
            {player.length > 0 ? <Route path="/game" component={Game} /> : ''}
            <Route path="/about" component={About} />
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
