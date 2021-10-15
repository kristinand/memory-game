import React, { ElementType, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import SvgIcon from '@material-ui/core/SvgIcon';

import { myGitHubLink, myGitHubName, RSSchoolLink } from 'constants/index';
import Logo from 'assets/icons/rss_logo.svg';
import Login from 'assets/icons/right.svg';
import Logout from 'assets/icons/left.svg';
import MenuButton from 'components/MenuButton/MenuButton';
import IconButton from 'components/IconButton/IconButton';

import { IState } from 'store/entities';
import * as actions from 'store/game/actions';
import classes from './classes.module.scss';

const Menu: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((store: IState) => store.game);
  const [helperText, setHelperText] = useState('');
  const [player, setPlayer] = useState(localStorage.getItem('player') || state.player);

  const onInputValueChangeHandler = (value: string) => {
    if (!state.isLoggedIn) {
      setPlayer(value.trim());
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
      <div className={classes.menu}>
        <div className={classes.NameInput}>
          <div className={classes.inputContainer}>
            <input
              className={classNames({ [classes.input]: true, [classes.inputDanger]: helperText.length })}
              type="text"
              id="name"
              value={player}
              onChange={(event) => onInputValueChangeHandler(event.target.value)}
              placeholder="Your name"
              autoComplete="off"
            />
            <IconButton
              component={(state.isLoggedIn ? Logout : Login) as ElementType}
              onClick={state.isLoggedIn ? logout : login}
              title={state.isLoggedIn ? 'Logout' : 'Login'}
            />
          </div>
          {helperText.length > 0 ? <p className={classes.helperText}>{helperText}</p> : ''}
        </div>

        <span className={classes.separator}>♥ ☀ ♦</span>

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
      <p className={classes.footer}>
        Created by{' '}
        <a rel="noopener noreferrer nofollow" target="_blank" href={myGitHubLink}>
          @{myGitHubName}
        </a>
        , 2021 /{' '}
        <a rel="noopener noreferrer nofollow" target="_blank" href={RSSchoolLink}>
          <SvgIcon component={Logo as ElementType} className={classes.logoSvg} viewBox="0 0 552.8 205.3" />
        </a>
      </p>
    </>
  );
};

export default Menu;
