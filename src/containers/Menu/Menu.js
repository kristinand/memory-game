import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import classes from './Menu.css';
import MenuButton from '../../components/MenuButton/MenuButton';

const menu = (props) => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const [player, setPlayer] = useState(store.player);

  return (
    <div className={classes.Menu}>
      <input
        className={classes.Input}
        type="text"
        id="name"
        value={player}
        onChange={(event) => setPlayer(event.target.value)}
        placeholder="Your name"
				autocomplete="off"
      />
      <span className="separator">♥ ☀ ♦</span>
      <MenuButton onClick={() => dispatch(actions.startGame(player))} title="New Game" />
      <MenuButton onClick={() => {}} disabled={true} title="Continue" />
      <MenuButton onClick={() => {}} title="Rating" />
      <MenuButton onClick={() => {}} title="Settings" />
    </div>
  );
};

export default menu;
