import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import useTimer from '../../hooks/useTimer';
import { formatTime } from '../../utils/functions';
import classes from './GameHeader.css';
import IconButton from '../../components/IconButton';

import menuSound from '@assets/menu-click.opus';
import Refresh from '@assets/icons/refresh.svg';
import Pause from '@assets/icons/pause.svg';
import Play from '@assets/icons/play.svg';
import Screen from '@assets/icons/screen.svg';
import Sound0 from '@assets/icons/sound0.svg';
import Sound1 from '@assets/icons/sound1.svg';
import Sound2 from '@assets/icons/sound2.svg';
import Music0 from '@assets/icons/music0.svg';
import Music1 from '@assets/icons/music1.svg';
import Music2 from '@assets/icons/music2.svg';

const header = () => {
  const state = useSelector((state) => state);
  const [menuClickSound] = useState(new Audio(menuSound));
  let soundVolume = state.soundVolume;
  let musicVolume = state.musicVolume;
  menuClickSound.volume = soundVolume;

  const dispatch = useDispatch();
  const { timer, isPaused, handleStart, handlePause, handleResume, handleReset } = useTimer(0);

  useEffect(() => {
    let timeoutTimer;
    if (state.cardsToWin !== 0) return;
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
    return () => {
      handlePause();
    }
  }, [state.isLevelStarted]);

  const onResetLevelHandler = () => {
    handleReset();
    dispatch(actions.resetLevel());
  };

  const onChangeAudioVolumeHandler = (type) => {
    let volume = type === 'sound' ? soundVolume : musicVolume;
    if (volume < 0.5) volume = 0.5;
    else if (volume >= 0.5 && volume < 1) volume = 1;
    else volume = 0;

    if (type === 'sound') {
      menuClickSound.currentTime = 0;
      menuClickSound.play();
    }
    dispatch(actions.changeVolume(type, volume));
  };

  const toggleFullscreenHandler = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className={classes.Header}>
      <span className={classes.level}>level: {state.level}</span>

      <span className={classes.right}>
        <span className={classes.timer}>{formatTime(timer)}</span>
        <IconButton
          onClick={isPaused ? handleResume : handlePause}
          color={state.coverColor}
          component={isPaused ? Play : Pause}
        />
        <IconButton onClick={onResetLevelHandler} color={state.coverColor} component={Refresh} />
        <IconButton onClick={toggleFullscreenHandler} color={state.coverColor} component={Screen} />
        <IconButton
          onClick={() => onChangeAudioVolumeHandler('sound')}
          color={state.coverColor}
          component={soundVolume === 0 ? Sound0 : soundVolume <= 0.5 ? Sound1 : Sound2}
        />
        <IconButton
          onClick={() => onChangeAudioVolumeHandler('music')}
          color={state.coverColor}
          component={musicVolume === 0 ? Music0 : musicVolume <= 0.5 ? Music1 : Music2}
        />
      </span>
    </div>
  );
};

export default React.memo(header);
