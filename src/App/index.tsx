import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { HandleResponseErrors } from 'api/HandleResponseErrors';
import { selectPlayerName } from 'store/auth/slice';
import { loadLocalGameData } from 'store/game/slice';
import { selectTheme, loadLocalSettingsData } from 'store/settings/slice';
import { usePlayerData } from 'utils/hooks';
import Game from 'pages/Game';
import Menu from 'pages/Menu';
import Rating from 'pages/Rating';
import Settings from 'pages/Settings';
import About from 'pages/About';
import 'styles/index.scss';
import classes from './classes.module.scss';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const player = useSelector(selectPlayerName);
  const theme = useSelector(selectTheme);
  const { playerData } = usePlayerData();

  useEffect(() => {
    if (playerData) {
      const { game, settings } = playerData;
      dispatch(loadLocalGameData(game));
      dispatch(loadLocalSettingsData(settings));
    }
  }, [dispatch, playerData]);

  const renderPrivateRoutes = () => (
    <>
      <Route path="/game" element={<Game />} />
      <Route path="/settings" element={<Settings />} />
    </>
  );

  return (
    <div className={classNames(classes.App, classes[theme])}>
      <BrowserRouter>
        <HandleResponseErrors />
        <Routes>
          {player && renderPrivateRoutes()}
          <Route path="/about" element={<About />} />
          <Route path="/rating" element={<Rating />} />
          <Route path="/" element={<Menu />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
