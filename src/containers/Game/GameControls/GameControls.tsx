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

import IconButton from 'components/IconButton/IconButton';

import { IState } from 'entities/interfaces';
import * as gameActions from 'store/game/actions';
import * as settingsActions from 'store/settings/actions';
import { useTimer } from 'utils/hooks';
import { formatTime } from 'utils/functions';
import classes from './GameControls.css';

interface IProps {
  getFocusRef: (ref: HTMLDivElement) => void;
}

const GameControls: React.FC<IProps> = ({ getFocusRef }) => {
  const history = useHistory();
  const focusRef = useRef<HTMLDivElement>();

  const gameState = useSelector((store: IState) => store.game);
  const settingsState = useSelector((store: IState) => store.settings);

  const [menuClickSound] = useState(new Audio(menuSound));
  menuClickSound.volume = settingsState.soundVolume;

  const dispatch = useDispatch();
  const { timer, isPaused, handleStart, handlePause, handleResume, handleReset } = useTimer(gameState.score);

  useEffect(() => {
    const screen = focusRef.current;
    getFocusRef(screen);
    screen.focus();
    if (gameState.score) {
      handlePause();
    } else {
      handleStart();
      handlePause();
    }
  }, []);

  useEffect(() => {
    let timeoutTimer;
    if (!gameState.cardsToWin) {
      if (gameState.level < gameState.levels) {
        timeoutTimer = setTimeout(() => {
          dispatch(gameActions.loadLevel('inc'));
        }, 1000);
      } else {
        dispatch(gameActions.endGame(gameState.player, gameState.score));
        history.push('/rating');
      }
    }
    return () => clearTimeout(timeoutTimer);
  }, [gameState.cardsToWin]);

  useEffect(() => {
    if (gameState.isGamePaused) {
      handlePause();
    } else {
      handleResume();
    }
    return () => handlePause();
  }, [gameState.isGamePaused]);

  const saveGameData = () => {
    const localData = {
      cards: gameState.cards,
      level: gameState.level,
      coverColor: gameState.coverColor,
      cardsToWin: gameState.cardsToWin,
      score: timer,
      player: gameState.player,
    };
    localStorage.setItem('gameData', JSON.stringify(localData));
  };

  useEffect(() => {
    if (!gameState.isAutoplay && timer > 0) {
      saveGameData();
      dispatch(gameActions.saveScore(timer));
    }
  }, [timer]);

  useEffect(() => {
    if (gameState.score === 0) {
      handleReset();
      handlePause();
    }
  }, [gameState.isAutoplay]);

  const onChangeAudioVolumeHandler = (type) => {
    let volume = type === 'sound' ? settingsState.soundVolume : settingsState.musicVolume;
    if (volume < 0.5) volume = 0.5;
    else if (volume >= 0.5 && volume < 1) volume = 1;
    else volume = 0;

    if (type === 'sound') {
      menuClickSound.currentTime = 0;
      void menuClickSound.play();
    }
    dispatch(settingsActions.changeVolume(type, volume));
  };

  const toggleFullscreenHandler = () => {
    if (!document.fullscreenElement) {
      void document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      void document.exitFullscreen();
    }
  };

  const onGamePauseHandler = () => dispatch(gameActions.setIsGamePaused(!isPaused));
  const onGameReloadHandler = () => {
    if (!gameState.isAutoplay) {
      handleReset();
      dispatch(gameActions.startGame());
    }
  };

  const handleKeyPress = ({ key }) => {
    const { fullscreen, reload, sounds, music, pause } = settingsState.keys;
    if (key === fullscreen) toggleFullscreenHandler();
    else if (key === reload) onGameReloadHandler();
    else if (key === sounds) onChangeAudioVolumeHandler('sound');
    else if (key === music) onChangeAudioVolumeHandler('music');
    else if (key === pause) onGamePauseHandler();
  };

  return (
    <div className={classes.GameControls}>
      <div role="menu" ref={focusRef} className={classes.screen} tabIndex={0} onKeyPress={handleKeyPress} />
      <span className={classes.level}>level: {gameState.level}</span>

      <span className={classes.right}>
        <span className={classes.timer}>{formatTime(timer)}</span>
        <IconButton
          onClick={onGamePauseHandler}
          color={gameState.coverColor}
          title={isPaused ? 'Play' : 'Pause'}
          component={(isPaused ? Play : Pause) as ElementType}
        />
        <IconButton
          onClick={onGameReloadHandler}
          color={gameState.coverColor}
          component={Refresh as ElementType}
          title="Reload Game"
        />
        <IconButton
          onClick={toggleFullscreenHandler}
          color={gameState.coverColor}
          component={Screen as ElementType}
          title="Toggle Fullscreen"
        />
        <IconButton
          onClick={() => onChangeAudioVolumeHandler('sound')}
          color={gameState.coverColor}
          title="Sound Volume"
          component={
            // eslint-disable-next-line no-nested-ternary
            (settingsState.soundVolume === 0
              ? Sound0
              : settingsState.soundVolume <= 0.5
              ? Sound1
              : Sound2) as ElementType
          }
        />
        <IconButton
          onClick={() => onChangeAudioVolumeHandler('music')}
          color={gameState.coverColor}
          title="Music Volume"
          component={
            // eslint-disable-next-line no-nested-ternary
            (settingsState.musicVolume === 0
              ? Music0
              : settingsState.musicVolume <= 0.5
              ? Music1
              : Music2) as ElementType
          }
        />
        <IconButton
          onClick={() => history.push('/')}
          color={gameState.coverColor}
          component={Back as ElementType}
          title="Back to Menu"
        />
      </span>
    </div>
  );
};

export default GameControls;
