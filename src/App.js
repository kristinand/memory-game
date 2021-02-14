import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Game from './containers/Game/Game';
import Header from './containers/Header/Header';
import Menu from './containers/Menu/Menu';

const app = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  let screen = <Menu />;

  if (state.isGameStarted) {
    screen = (
      <div>
        <Header />
        <Game />
      </div>
    );
  }

  return <Fragment>{screen}</Fragment>;
};

export default app;
