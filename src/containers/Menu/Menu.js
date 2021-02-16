import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import classes from './Menu.css';
import MenuButton from '../../components/MenuButton/MenuButton';
import menuSound from '@assets/menu-click.opus';

const menu = (props) => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const [player, setPlayer] = useState(store.player);
  const [isHelperTextVisible, setIsHelperTextVisible] = useState(false);
  let inputClasses = isHelperTextVisible ? [classes.input, classes.inputDanger].join(' ') : classes.input;
  const menuClickSound = new Audio(menuSound);
  menuClickSound.volume = store.soundVolume;

  if (player.length > 0 && isHelperTextVisible) setIsHelperTextVisible(false);

  const onNewGameHandler = () => {
    if (player.length === 0) { 
      setIsHelperTextVisible(true);
    } else {
      menuClickSound.play();
      dispatch(actions.startGame(player))
    }
  }

  const onContinueGameHandler = () => {
    console.log(this);
    menuClickSound.play();
    if (store.isGameStarted) return;
  }

  return (
    <div className={classes.menu}>
      <div className={classes.inputContainer}>
        <input
          className={inputClasses}
          type="text"
          id="name"
          value={player}
          onChange={(event) => setPlayer(event.target.value)}
          placeholder="Your name"
          autoComplete="off"
        />
        {isHelperTextVisible ? <p className={classes.helperText}>Please, enter your name</p> : ''}
      </div>
      <span className="separator">♥ ☀ ♦</span>
      <MenuButton onClick={onNewGameHandler} disabled={isHelperTextVisible} path="/game" title="New Game" />
      <MenuButton onClick={onContinueGameHandler.bind(this)} path="/game" disabled={!store.isGameStarted || isHelperTextVisible} title="Continue" />
      <MenuButton onClick={() => {menuClickSound.play()}} path="/rating" title="Rating" />
      <MenuButton onClick={() => {menuClickSound.play()}} path="/settings" title="Settings" />
    </div>
  );
};

export default menu;
