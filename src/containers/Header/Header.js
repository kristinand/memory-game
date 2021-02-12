import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useTimer from '../../hooks/useTimer';
import { formatTime } from '../../utils/functions';
import * as actions from '../../store/actions';
import classes from './Header.css';
import IconButton from '../../components/IconButton';
import Refresh from '@assets/icons/refresh.svg';
import Pause from '@assets/icons/pause.svg';
import Play from '@assets/icons/play.svg';
import Screen from '@assets/icons/screen.svg';
import Sound2 from '@assets/icons/sound2.svg';
import Music2 from '@assets/icons/music2.svg';

const header = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { timer, isPaused, handleStart, handlePause, handleResume, handleReset } = useTimer(0);

  useEffect(() => {
    let timeoutTimer;
    if (state.cardsToWin > 0) return;
    dispatch(actions.endLevel(timer));
    if (state.level < state.levels) {
      timeoutTimer = setTimeout(() => {
        dispatch(actions.loadLevel('inc'));
      }, 1000);
    } else {
      dispatch(actions.endGame());
    }
    return () => {
      clearTimeout(timeoutTimer);
    };
  }, [state.cardsToWin]);

  useEffect(() => {
    state.isLevelStarted ? handleStart() : handleReset();
  }, [state.isLevelStarted]);

  const onResetLevelHandler = () => {
    handleReset();
    dispatch(actions.resetLevel());
  };

  const onPauseGameHandler = () => {
    handlePause();
  };

  const onResumeGameHandler = () => {
    handleResume();
  };


  return (
    <div className={classes.Header}>
      <span className={classes.level}>level: {state.level}</span>

      <span className={classes.right}>
        <span className={classes.timer}>{formatTime(timer)}</span>
        {isPaused ? (
          <IconButton onClick={onResumeGameHandler} color={state.coverColor} component={Play} />
        ) : (
          <IconButton onClick={onPauseGameHandler} color={state.coverColor} component={Pause} />
        )}
        <IconButton onClick={onResetLevelHandler} color={state.coverColor} component={Refresh} />
        <IconButton color={state.coverColor} component={Screen} />
        <IconButton color={state.coverColor} component={Sound2} />
        <IconButton color={state.coverColor} component={Music2} />
      </span>
    </div>
  );
};

export default React.memo(header);
