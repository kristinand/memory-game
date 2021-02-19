import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import * as actions from '../../store/actions';
import useTimer from '../../hooks/useTimer';
import { formatTime } from '../../utils/functions';
import classes from './GameHeader.css';
import IconButton from '../../components/IconButton/IconButton';

import menuSound from '@assets/menu-click.opus';
import Refresh from '@assets/icons/refresh.svg';
import Pause from '@assets/icons/pause.svg';
import Play from '@assets/icons/play.svg';
import Back from '@assets/icons/left.svg';
import Screen from '@assets/icons/screen.svg';
import Sound0 from '@assets/icons/sound0.svg';
import Sound1 from '@assets/icons/sound1.svg';
import Sound2 from '@assets/icons/sound2.svg';
import Music0 from '@assets/icons/music0.svg';
import Music1 from '@assets/icons/music1.svg';
import Music2 from '@assets/icons/music2.svg';

const GameHeader = (props) => {
  const history = useHistory();
  const focusRef = useRef();
  const state = useSelector((state) => state);
  const [menuClickSound] = useState(new Audio(menuSound));
  menuClickSound.volume = state.settings.soundVolume;

  const dispatch = useDispatch();
  const { timer, isPaused, handleStart, handlePause, handleResume, handleReset } = useTimer(0);

  useEffect(() => {
    props.getFocusRef(focusRef.current);
    focusRef.current.focus();
  }, []);

  useEffect(() => {
    let timeoutTimer;
    if (state.cardsToWin !== 0) return;
    dispatch(actions.endLevel(timer));
    if (state.level < state.settings.levels) {
      timeoutTimer = setTimeout(() => {
        dispatch(actions.loadLevel('inc'));
      }, 1000);
    } else {
      dispatch(actions.endGame());
      history.push('/rating');
    }
    return () => {
      clearTimeout(timeoutTimer);
    };
  }, [state.cardsToWin]);

  useEffect(() => {
    if (state.isTimerPaused) {
      handlePause();
    } else {
      timer === 0 ? handleStart() : handleResume();
    }
    return () => {
      handlePause();
    };
  }, [state.isTimerPaused]);

  const handleKeyPress = (event) => {
    let key = event.key;
    if (key === state.settings.keys.fullscreen) toggleFullscreenHandler();
    else if (key === state.settings.keys.reload) onGameReloadHandler();
    else if (key === state.settings.keys.sounds) onChangeAudioVolumeHandler('sound');
    else if (key === state.settings.keys.music ) onChangeAudioVolumeHandler('music');
    else if (key === state.settings.keys.pause ) onGamePauseHandler();
  };

  const onChangeAudioVolumeHandler = (type) => {
    let volume = type === 'sound' ? state.settings.soundVolume : state.settings.musicVolume;
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

  const onGamePauseHandler = () => dispatch(actions.setIsTimerPaused(!isPaused));
  const onGameReloadHandler = () => {
    handleReset();
    dispatch(actions.startGame(state.player));
  };

  return (
    <div className={classes.GameHeader}>
      <div ref={focusRef} className={classes.screen} tabIndex={0} onKeyPress={handleKeyPress}></div>
      <span className={classes.level}>level: {state.level}</span>

      <span className={classes.right}>
        <span className={classes.timer}>{formatTime(timer)}</span>
        <IconButton
          onClick={onGamePauseHandler}
          color={state.coverColor}
          title={isPaused ? 'Play' : 'Pause'}
          component={isPaused ? Play : Pause}
        />
        <IconButton
          onClick={onGameReloadHandler}
          color={state.coverColor}
          component={Refresh}
          title='Reload Game'
        />
        <IconButton
          onClick={toggleFullscreenHandler}
          color={state.coverColor}
          component={Screen}
          title="Toggle Fullscreen"
        />
        <IconButton
          onClick={() => onChangeAudioVolumeHandler('sound')}
          color={state.coverColor}
          title="Sound Volume"
          component={state.settings.soundVolume === 0 ? Sound0 : state.settings.soundVolume <= 0.5 ? Sound1 : Sound2}
        />
        <IconButton
          onClick={() => onChangeAudioVolumeHandler('music')}
          color={state.coverColor}
          title="Music Volume"
          component={state.settings.musicVolume === 0 ? Music0 : state.settings.musicVolume <= 0.5 ? Music1 : Music2}
        />
        <IconButton onClick={() => history.push('/')} color={state.coverColor} component={Back} title="Back to Menu" />
      </span>
    </div>
  );
};

export default GameHeader;
