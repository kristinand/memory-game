import React, { useEffect, useState, useRef, ElementType } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import menuSound from 'assets/menu-click.opus';
import Refresh from 'assets/icons/refresh.svg';
import Pause from 'assets/icons/pause.svg';
import Play from 'assets/icons/play.svg';
import Back from 'assets/icons/left.svg';
import Screen from 'assets/icons/screen.svg';
import Sound0 from 'assets/icons/sound0.svg';
import Sound1 from 'assets/icons/sound1.svg';
import Sound2 from 'assets/icons/sound2.svg';
import Music0 from 'assets/icons/music0.svg';
import Music1 from 'assets/icons/music1.svg';
import Music2 from 'assets/icons/music2.svg';

import { IState } from '../../../entities/interfaces';
import * as actions from '../../../store/actions';
import { useTimer } from '../../../utils/hooks';
import { formatTime } from '../../../utils/functions';
import IconButton from '../../../components/IconButton/IconButton';
import classes from './GameControls.css';

interface IProps {
  getFocusRef: (ref: HTMLDivElement) => void;
}

const GameControls: React.FC<IProps> = ({ getFocusRef }) => {
  const history = useHistory();
  const focusRef = useRef<HTMLDivElement>();
  const state = useSelector((store: IState) => store);
  const [menuClickSound] = useState(new Audio(menuSound));
  menuClickSound.volume = state.settings.soundVolume;

  const dispatch = useDispatch();
  const { timer, isPaused, handleStart, handlePause, handleResume, handleReset } = useTimer(state.score);

  useEffect(() => {
    const screen = focusRef.current;
    getFocusRef(screen);
    screen.focus();
    if (state.score) {
      handlePause();
    } else {
      handleStart();
      handlePause();
    }
  }, []);

  useEffect(() => {
    let timeoutTimer;
    if (!state.cardsToWin) {
      if (state.level < state.levels) {
        timeoutTimer = setTimeout(() => {
          dispatch(actions.loadLevel('inc'));
        }, 1000);
      } else {
        dispatch(actions.endGame(state.player, state.score));
        history.push('/rating');
      }
    }
    return () => clearTimeout(timeoutTimer);
  }, [state.cardsToWin]);

  useEffect(() => {
    if (state.isGamePaused) {
      handlePause();
    } else {
      handleResume();
    }
    return () => handlePause();
  }, [state.isGamePaused]);

  const saveGameData = () => {
    const localData = {
      cards: state.cards,
      level: state.level,
      coverColor: state.coverColor,
      cardsToWin: state.cardsToWin,
      score: timer,
      player: state.player,
    };
    localStorage.setItem('gameData', JSON.stringify(localData));
  };

  useEffect(() => {
    if (!state.isAutoplay && timer > 0) {
      saveGameData();
      dispatch(actions.saveScore(timer));
    }
  }, [timer]);

  useEffect(() => {
    if (state.score === 0) {
      handleReset();
      handlePause();
    }
  }, [state.isAutoplay]);

  const onChangeAudioVolumeHandler = (type) => {
    let volume = type === 'sound' ? state.settings.soundVolume : state.settings.musicVolume;
    if (volume < 0.5) volume = 0.5;
    else if (volume >= 0.5 && volume < 1) volume = 1;
    else volume = 0;

    if (type === 'sound') {
      menuClickSound.currentTime = 0;
      void menuClickSound.play();
    }
    dispatch(actions.changeVolume(type, volume));
  };

  const toggleFullscreenHandler = () => {
    if (!document.fullscreenElement) {
      void document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      void document.exitFullscreen();
    }
  };

  const onGamePauseHandler = () => dispatch(actions.setIsGamePaused(!isPaused));
  const onGameReloadHandler = () => {
    if (!state.isAutoplay) {
      handleReset();
      dispatch(actions.startGame());
    }
  };

  const handleKeyPress = ({ key }) => {
    const { fullscreen, reload, sounds, music, pause } = state.settings.keys;
    if (key === fullscreen) toggleFullscreenHandler();
    else if (key === reload) onGameReloadHandler();
    else if (key === sounds) onChangeAudioVolumeHandler('sound');
    else if (key === music) onChangeAudioVolumeHandler('music');
    else if (key === pause) onGamePauseHandler();
  };

  return (
    <div className={classes.GameControls}>
      <div role="menu" ref={focusRef} className={classes.screen} tabIndex={0} onKeyPress={handleKeyPress} />
      <span className={classes.level}>level: {state.level}</span>

      <span className={classes.right}>
        <span className={classes.timer}>{formatTime(timer)}</span>
        <IconButton
          onClick={onGamePauseHandler}
          color={state.coverColor}
          title={isPaused ? 'Play' : 'Pause'}
          component={(isPaused ? Play : Pause) as ElementType}
        />
        <IconButton
          onClick={onGameReloadHandler}
          color={state.coverColor}
          component={Refresh as ElementType}
          title="Reload Game"
        />
        <IconButton
          onClick={toggleFullscreenHandler}
          color={state.coverColor}
          component={Screen as ElementType}
          title="Toggle Fullscreen"
        />
        <IconButton
          onClick={() => onChangeAudioVolumeHandler('sound')}
          color={state.coverColor}
          title="Sound Volume"
          component={
            // eslint-disable-next-line no-nested-ternary
            (state.settings.soundVolume === 0
              ? Sound0
              : state.settings.soundVolume <= 0.5
              ? Sound1
              : Sound2) as ElementType
          }
        />
        <IconButton
          onClick={() => onChangeAudioVolumeHandler('music')}
          color={state.coverColor}
          title="Music Volume"
          component={
            // eslint-disable-next-line no-nested-ternary
            (state.settings.musicVolume === 0
              ? Music0
              : state.settings.musicVolume <= 0.5
              ? Music1
              : Music2) as ElementType
          }
        />
        <IconButton
          onClick={() => history.push('/')}
          color={state.coverColor}
          component={Back as ElementType}
          title="Back to Menu"
        />
      </span>
    </div>
  );
};

export default GameControls;
