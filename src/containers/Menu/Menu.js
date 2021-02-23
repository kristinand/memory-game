import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import classes from './Menu.css';
import MenuButton from '../../components/MenuButton/MenuButton';
import IconButton from '../../components/IconButton/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Logo from '@assets/icons/rss_logo.svg';
import Login from '@assets/icons/right.svg';
import Logout from '@assets/icons/left.svg';

const Menu = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [helperText, setHelperText] = useState('');
  const [player, setPlayer] = useState(localStorage.getItem('player') || state.player);

  const onContinueGameHandler = () => {
    if (localStorage.getItem('gameData') === null || localStorage.getItem('player') !== player) return;
  };

  const onInputValueChangeHandler = (player) => {
    player = player.trim();
    setPlayer(player);
  };

  const login = () => {
    const playerRegEx = new RegExp(/^[a-zA-Z]{3,10}$/);
    if (player.length === 0) {
      setHelperText('Please, enter your name')
    } else if (player.length < 3) {
      setHelperText('Your name should contain at least 3 characters')
    } else if (player.match(playerRegEx) === null) {
      setHelperText('Only latin characters allowed')
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
    <Fragment>
      <div className={classes.menu}>
        <div className={classes.NameInput}>
          <div className={classes.inputContainer}>
            <input
              className={helperText.length > 0 ? [classes.input, classes.inputDanger].join(' ') : classes.input}
              type="text"
              id="name"
              value={player}
              onChange={(event) => onInputValueChangeHandler(event.target.value)}
              placeholder="Your name"
              autoComplete="off"
            />
            <IconButton
              component={state.isLoggedIn ? Logout : Login}
              onClick={state.isLoggedIn ? logout : login}
              title={state.isLoggedIn ? 'Logout' : 'Login'}
            />
          </div>
          {helperText.length > 0 ? (
            <p className={classes.helperText}>{helperText}</p>
          ) : (
            ''
          )}
        </div>

        <span className="separator">♥ ☀ ♦</span>

        <MenuButton
          onClick={() => dispatch(actions.startGame())}
          disabled={!state.isLoggedIn}
          path={player.length === 0 ? '/' : '/game'}
          title="New Game"
        />
        <MenuButton
          onClick={onContinueGameHandler}
          path={localStorage.getItem('gameData') !== null && localStorage.getItem('player') === JSON.parse(localStorage.getItem('gameData')).player ? '/game' : '/'}
          disabled={
            !state.isLoggedIn || localStorage.getItem('gameData') === null || localStorage.getItem('player') !== JSON.parse(localStorage.getItem('gameData')).player
          }
          title="Continue"
        />
        <MenuButton path="/rating" title="Rating" />
        <MenuButton disabled={!state.isLoggedIn} path="/settings" title="Settings" />
        <MenuButton path="/about" title="About" />
      </div>
      <p className={classes.footer}>
        Created by{' '}
        <a rel="noopener noreferrer nofollow" target="_blank" href="https://github.com/kristinand">
          @kristinand
        </a>
        , 2021 /{' '}
        <a rel="noopener noreferrer nofollow" target="_blank" href="https://rs.school/js/">
          <SvgIcon component={Logo} style={{ width: '1.7em', height: 'auto' }} viewBox="0 0 552.8 205.3" />
        </a>
      </p>
    </Fragment>
  );
};

export default Menu;
