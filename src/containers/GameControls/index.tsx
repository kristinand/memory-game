import React, { useEffect, useState, useRef } from 'react';
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

import Button from 'components/Button';

import { LAST_LEVEL } from 'constants/';
import { IState } from 'store/entities';
import * as gameActions from 'store/game/actions';
import * as settingsActions from 'store/settings/actions';
import { useTimer } from 'utils/hooks';
import { formatTime, setLocalStorageValue } from 'utils/functions';
import classes from './classes.module.scss';

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
      if (gameState.level < LAST_LEVEL) {
        timeoutTimer = setTimeout(() => {
          dispatch(gameActions.loadNextLevel());
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
    const gameData = {
      cards: gameState.cards,
      level: gameState.level,
      score: timer,
      player: gameState.player,
    };
    setLocalStorageValue('gameData', gameData);
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

  const handleKeyPress = ({ code }: React.KeyboardEvent<HTMLInputElement>) => {
    const pressedKey = code.slice(3);
    const { fullscreen, reload, sounds, music, pause } = settingsState.keys;
    if (pressedKey === fullscreen) toggleFullscreenHandler();
    else if (pressedKey === reload) onGameReloadHandler();
    else if (pressedKey === sounds) onChangeAudioVolumeHandler('sound');
    else if (pressedKey === music) onChangeAudioVolumeHandler('music');
    else if (pressedKey === pause) onGamePauseHandler();
  };

  return (
    <header className={classes.gameControls}>
      <div role="menu" ref={focusRef} className={classes.screen} tabIndex={0} onKeyPress={handleKeyPress} />
      <span className={classes.level}>level: {gameState.level}</span>

      <span className={classes.buttonGroup}>
        <span className={classes.timer}>{formatTime(timer)}</span>
        <Button
          title={isPaused ? 'Play' : 'Pause'}
          onClick={onGamePauseHandler}
          icon={isPaused ? <Play /> : <Pause />}
        />
        <Button title="Reload Game" onClick={onGameReloadHandler} icon={<Refresh />} />
        <Button title="Toggle Fullscreen" onClick={toggleFullscreenHandler} icon={<Screen />} />
        <Button
          title="Sound Volume"
          onClick={() => onChangeAudioVolumeHandler('sound')}
          icon={
            // eslint-disable-next-line no-nested-ternary
            settingsState.soundVolume === 0 ? <Sound0 /> : settingsState.soundVolume <= 0.5 ? <Sound1 /> : <Sound2 />
          }
        />
        <Button
          title="Music Volume"
          onClick={() => onChangeAudioVolumeHandler('music')}
          icon={
            // eslint-disable-next-line no-nested-ternary
            settingsState.musicVolume === 0 ? <Music0 /> : settingsState.musicVolume <= 0.5 ? <Music1 /> : <Music2 />
          }
        />
        <Button title="Back to Menu" onClick={() => history.push('/')} icon={<Back />} />
      </span>
    </header>
  );
};

export default GameControls;
