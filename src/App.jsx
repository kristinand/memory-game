import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import * as actions from './store/actions';
import Game from './containers/Game/Game';
import Menu from './containers/Menu/Menu';
import Rating from './containers/Rating/Rating';
import Settings from './containers/Settings/Settings';
import About from './components/About/About';
import classes from './App.css';

const App = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const bgColor = useSelector((state) => state.settings.bgColor);
  const dispatch = useDispatch();
  const getLocalStorageValue = (prop) => JSON.parse(localStorage.getItem(prop));

  useEffect(() => {
    const player = localStorage.getItem('player');
    if (player) {
      const gameData = getLocalStorageValue('gameData');
      dispatch(actions.loadLocalGameData(player, gameData));
    }
    const settingsData = getLocalStorageValue('settingsData');
    if (settingsData) {
      dispatch(actions.loadLocalSettingsData(settingsData));
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
