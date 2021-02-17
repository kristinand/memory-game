import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import classes from './Menu.css';
import MenuButton from '../../components/MenuButton/MenuButton';
import NameInput from '../../components/NameInput/NameInput';

const Menu = (props) => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const [player, setPlayer] = useState(localStorage.getItem('player') || store.player);
  const [isHelperTextVisible, setIsHelperTextVisible] = useState(false);
  if (player.length > 0 && isHelperTextVisible) setIsHelperTextVisible(false);

  const onNewGameHandler = () => {
    if (player.length === 0) {
      setIsHelperTextVisible(true);
    } else {
      dispatch(actions.startGame(player));
    }
  };

  const onContinueGameHandler = () => {
    if (store.isGameStarted || player !== store.player) return;
  };

  const savePlayerName = (player) => {
    localStorage.setItem('player', player);
    setPlayer(player);
  };

  return (
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
        disabled={!store.isGameStarted || isHelperTextVisible || player !== store.player}
        title="Continue"
      />
      <MenuButton path="/rating" title="Rating" />
      <MenuButton path="/settings" title="Settings" />
    </div>
  );
};

export default Menu;
