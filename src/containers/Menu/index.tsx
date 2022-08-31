import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Layout from 'components/Layout';
import Login from 'assets/icons/right.svg';
import Logout from 'assets/icons/left.svg';
import MenuButton from 'components/MenuButton';
import Button from 'components/Button';
import Input from 'components/Input';

import { useLocalStorage } from 'utils/hooks';
import { removeCookie } from 'utils/functions';
import { login, logout, selectPlayerName } from 'store/auth/slice';
import { startGame } from 'store/game/slice';
import { setDefaultSettings } from 'store/settings/slice';
import Footer from 'components/Footer';
import { setCookie } from 'utils/functions/setCookie';
import classes from './classes.module.scss';

const Menu: React.FC = () => {
  const dispatch = useDispatch();
  const storedPlayer = useSelector(selectPlayerName);
  const [helperText, setHelperText] = useState('');
  const [player, setPlayer] = useState(storedPlayer);
  const { playerData, deletePlayerData } = useLocalStorage();

  const onInputValueChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    if (!storedPlayer) {
      setPlayer((event.target as HTMLInputElement).value.trim());
    }
  };

  const onStartGame = () => {
    deletePlayerData('game');
    dispatch(startGame());
  };

  const onLogin = () => {
    const playerRegEx = new RegExp(/^[a-zA-Z]{3,10}$/);
    if (!player.length) {
      setHelperText('Please, enter your name');
    } else if (player.length < 3) {
      setHelperText('Your name should contain at least 3 characters');
    } else if (playerRegEx.exec(player) === null) {
      setHelperText('Only latin characters allowed');
    } else {
      setCookie('player', player, 1);
      dispatch(login(player));
      setHelperText('');
    }
  };

  const onLogout = () => {
    setPlayer('');
    setHelperText('');
    removeCookie('player', storedPlayer);
    dispatch(setDefaultSettings());
    dispatch(logout());
  };

  return (
    <>
      <Layout centered>
        <div className={classes.loginContainer}>
          {storedPlayer ? (
            <div className={classes.playerName}>Hello, {storedPlayer}!</div>
          ) : (
            <Input
              onChange={onInputValueChangeHandler}
              onKeyPress={(event) => {
                if (event.key === 'Enter') onLogin();
              }}
              withHelperText
              helperText={helperText}
              placeholder="Your name"
              value={player}
              autoFocus
              type="text"
              className={classes.input}
            />
          )}

          <Button
            className={classes.loginButton}
            icon={storedPlayer ? <Logout /> : <Login />}
            onClick={storedPlayer ? onLogout : onLogin}
            title={storedPlayer ? 'Logout' : 'Login'}
          />
        </div>

        <div className={classes.separator}>♥ ☀ ♦</div>

        <div className={classes.buttonGroup}>
          <MenuButton onClick={onStartGame} disabled={!storedPlayer} path="/game" title="New Game" />
          <MenuButton path="/game" disabled={!storedPlayer || !playerData?.game} title="Continue" />
          <MenuButton path="/rating" title="Rating" />
          <MenuButton disabled={!storedPlayer} path={!storedPlayer ? '' : '/settings'} title="Settings" />
          <MenuButton path="/about" title="About" />
        </div>
      </Layout>

      <Footer />
    </>
  );
};

export default Menu;
