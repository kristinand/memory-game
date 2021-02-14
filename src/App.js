import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Game from './containers/Game/Game';
import Header from './containers/Header/Header';
import Menu from './containers/Menu/Menu';
import * as actions from './store/actions';
import { getRandomNumber } from './utils/functions';

const app = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    const names = ['Bob', 'Patric', 'Lily', 'Lola', 'Jane', 'Jess', 'Tom', 'Robin'];
    const player = names[getRandomNumber(0, names.length)];
    dispatch(actions.startGame(player));
    dispatch(actions.loadLevel());
  }, []);

  let screen = <Menu />;

  if (state.isGameStarted) {
    sreen = (
      <div>
        <Header />
        <Game />
      </div>
    );
  }

  return <Fragment>{screen}</Fragment>;
};

export default app;
