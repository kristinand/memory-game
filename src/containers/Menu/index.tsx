import React, { ElementType, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Layout from 'components/Layout';
import Login from 'assets/icons/right.svg';
import Logout from 'assets/icons/left.svg';
import MenuButton from 'components/MenuButton';
import Button from 'components/Button';
import Input from 'components/Input';

import { setLocalStorageValue, getLocalStorageValue } from 'utils/functions';
import { IState } from 'store/entities';
import { IGame } from 'store/game/entities';
import * as actions from 'store/game/actions';
import Footer from 'components/Footer';
import classes from './classes.module.scss';

const Menu: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((store: IState) => store.game);
  const [helperText, setHelperText] = useState('');
  const [player, setPlayer] = useState(state.player);

  const onInputValueChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    if (!state.player) {
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
      setLocalStorageValue('player', player);
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
          {state.player ? (
            <div className={classes.playerName}>Hello, {player}!</div>
          ) : (
            <Input
              onChange={onInputValueChangeHandler}
              onKeyPress={(event) => {
                if (event.key === 'Enter') login();
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
            icon={(state.player ? Logout : Login) as ElementType}
            onClick={state.player ? logout : login}
            title={state.player ? 'Logout' : 'Login'}
          />
        </div>

        <div className={classes.separator}>♥ ☀ ♦</div>

        <div className={classes.buttonGroup}>
          <MenuButton
            onClick={() => dispatch(actions.startGame())}
            disabled={!state.player}
            path="/game"
            title="New Game"
          />
          <MenuButton
            path="/game"
            disabled={
              !state.player ||
              (getLocalStorageValue('gameData') as IGame)?.player !== state.player 
            }
            title="Continue"
          />
          <MenuButton path="/rating" title="Rating" />
          <MenuButton disabled={!state.player} path={!state.player ? '' : '/settings'} title="Settings" />
          <MenuButton path="/about" title="About" />
        </div>
      </Layout>

      <Footer />
    </>
  );
};

export default Menu;
