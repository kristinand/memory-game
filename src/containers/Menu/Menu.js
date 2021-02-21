import React, { useState, useEffect, Fragment } from 'react';
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
  const [isInputTouhced, setIsInputTouhced] = useState(false);
  const playerRegEx = new RegExp(/^[a-zA-Z]{1,10}$/);

  useEffect(() => {
    if (isInputTouhced && (player.length === 0 || player.match(playerRegEx) === null)) {
      setIsHelperTextVisible(true);
    } else {
      setIsHelperTextVisible(false);
    }
  }, [player]);

  const onNewGameHandler = () => {
    if (player.length !== 0 && player.match(playerRegEx) !== null) {
      localStorage.setItem('player', player);
      dispatch(actions.startGame(player));
    } else {
      setIsHelperTextVisible(true);
    }
  };

  const onContinueGameHandler = () => {
    if (player !== state.player) return;
  };

  const savePlayerName = (player) => {
    player = player.trim();
    if (player.length > 0) {
      setIsInputTouhced(true);
    }
    else {
      localStorage.removeItem('player');
    }
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
        <MenuButton onClick={onNewGameHandler} disabled={isHelperTextVisible} path={player.length === 0 ? "/" : "/game"} title="New Game" />
        <MenuButton
          onClick={onContinueGameHandler.bind(this)}
          path="/game"
          disabled={isHelperTextVisible || player !== state.player}
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
