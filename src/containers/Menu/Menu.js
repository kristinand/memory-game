import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import classes from './Menu.css';
import MenuButton from '../../components/MenuButton/MenuButton';
import NameInput from '../../components/NameInput/NameInput';
import SvgIcon from '@material-ui/core/SvgIcon';
import Logo from '@assets/icons/rss_logo.svg';

const Menu = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [player, setPlayer] = useState(localStorage.getItem('player') || state.player);
  const [isHelperTextVisible, setIsHelperTextVisible] = useState(false);
  if (player && player.length > 0 && isHelperTextVisible) setIsHelperTextVisible(false);

  const onNewGameHandler = () => {
    if (player.length === 0) {
      setIsHelperTextVisible(true);
    } else {
      dispatch(actions.startGame(player));
    }
  };

  const onContinueGameHandler = () => {
    if (state.isGameStarted || player !== state.player) return;
  };

  const savePlayerName = (player) => {
    if (player.length > 0) localStorage.setItem('player', player);
    else localStorage.removeItem('player');
    setPlayer(player);
  };

  return (
    <Fragment>
      <div className={classes.menu}>
        <NameInput
          player={player}
          onInputValueChangeHandler={(player) => savePlayerName(player)}
          isHelperTextVisible={isHelperTextVisible}
        />
        <span className="separator">♥ ☀ ♦</span>
        <MenuButton onClick={onNewGameHandler} disabled={isHelperTextVisible} path="/game" title="New Game" />
        <MenuButton
          onClick={onContinueGameHandler.bind(this)}
          path="/game"
          disabled={!state.isGameStarted || isHelperTextVisible || player !== state.player}
          title="Continue"
        />
        <MenuButton path="/rating" title="Rating" />
        <MenuButton path="/settings" title="Settings" />
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
