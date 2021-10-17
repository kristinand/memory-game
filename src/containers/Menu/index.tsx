import React, { ElementType, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Layout from 'components/Layout';
import Login from 'assets/icons/right.svg';
import Logout from 'assets/icons/left.svg';
import MenuButton from 'components/MenuButton';
import IconButton from 'components/IconButton';
import Input from 'components/Input';

import { IState } from 'store/entities';
import * as actions from 'store/game/actions';
import Footer from 'components/Footer';
import classes from './classes.module.scss';

const Menu: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((store: IState) => store.game);
  const [helperText, setHelperText] = useState('');
  const [player, setPlayer] = useState(localStorage.getItem('player') || state.player);

  const onInputValueChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    if (!state.isLoggedIn) {
      setPlayer((event.target as HTMLInputElement).value.trim());
    }
  };

  const login = () => {
    const playerRegEx = new RegExp(/^[a-zA-Z]{3,10}$/);
    if (!player.length) {
      setHelperText('Please, enter your name');
    } else if (player.length < 3) {
      setHelperText('Your name should contain at least 3 characters');
    } else if (playerRegEx.exec(player) === null) {
      setHelperText('Only latin characters allowed');
    } else {
      localStorage.setItem('player', player);
      dispatch(actions.login(player));
      setHelperText('');
    }
  };

  const logout = () => {
    localStorage.removeItem('player');
    setPlayer('');
    setHelperText('');
    dispatch(actions.logout());
  };

  return (
    <>
      <Layout centered>
        <div className={classes.loginContainer}>
          <Input
            onChange={onInputValueChangeHandler}
            withHelperText
            helperText={helperText}
            placeholder="Your name"
            autoFocus
            type="text"
            className={classes.input}
          />
          <IconButton
            className={classes.loginButton}
            component={(state.isLoggedIn ? Logout : Login) as ElementType}
            onClick={state.isLoggedIn ? logout : login}
            title={state.isLoggedIn ? 'Logout' : 'Login'}
          />
        </div>

        <div className={classes.separator}>♥ ☀ ♦</div>

        <div className={classes.buttonGroup}>
          <MenuButton
            onClick={() => dispatch(actions.startGame())}
            disabled={!state.isLoggedIn}
            path="/game"
            title="New Game"
          />
          <MenuButton
            path="/game"
            disabled={
              !state.isLoggedIn ||
              state.isGameEnded ||
              localStorage.getItem('gameData') === null ||
              localStorage.getItem('player') !== player
            }
            title="Continue"
          />
          <MenuButton path="/rating" title="Rating" />
          <MenuButton disabled={!state.isLoggedIn} path={!state.isLoggedIn ? '' : '/settings'} title="Settings" />
          <MenuButton path="/about" title="About" />
        </div>
      </Layout>

      <Footer />
    </>
  );
};

export default Menu;
