import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import classes from './Menu.css';
import MenuButton from '../../components/MenuButton/MenuButton';

const menu = (props) => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const [player, setPlayer] = useState(store.player);
  const [isHelperTextVisible, setIsHelperTextVisible] = useState(false);
  let inputClasses = isHelperTextVisible ? [classes.input, classes.inputDanger].join(' ') : classes.input;

  if (player.length > 0 && isHelperTextVisible) setIsHelperTextVisible(false);

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
      <MenuButton onClick={() => {
        if (player.length === 0) { 
          setIsHelperTextVisible(true);
        } else {
          dispatch(actions.startGame(player))
        }
        }} title="New Game" />
      <MenuButton onClick={() => {}} disabled={true} title="Continue" />
      <MenuButton onClick={() => {}} title="Rating" />
      <MenuButton onClick={() => {}} title="Settings" />
    </div>
  );
};

export default menu;
