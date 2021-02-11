import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Game from './containers/Game/Game';
import Header from './containers/Header/Header';
import * as actions from './store/actions';

const app = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  
  useEffect(() => {
    let timer;
    if (state.cardsToWin === 0) {
      timer = setTimeout(() => {
        dispatch(actions.changeLevel('inc'))
      }, 600)
    }
    return () => {
      clearTimeout(timer);
    }
  }, [state.cardsToWin])

  return (
    <Fragment>
      <Header
        buttonColor={state.coverColor}
        level={state.level}
      />
      <Game coverColor={state.coverColor} level={state.level} />
    </Fragment>
  );
}

export default app;
