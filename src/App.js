import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Game from './containers/Game/Game';
import Header from './containers/Header/Header';
import * as actions from './store/actions';
import { getRandomNumber } from './utils/functions'

const app = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const names = ['Bob', 'Patric', 'Lily', 'Lola', 'Jane', 'Jess', 'Tom', 'Robin'];
    const player = names[getRandomNumber(0, names.length)];
    dispatch(actions.startGame(player));
    dispatch(actions.loadLevel());
  },[]);

  return (
    <Fragment>
      <Header />
      <Game />
    </Fragment>
  );
}

export default app;
