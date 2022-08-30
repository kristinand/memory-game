import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { ECardStatus } from 'entities';
import { selectGameData, loadNextLevel, saveCurrentScore, startGame, setIsGamePaused } from 'store/game/slice';
import { saveScore } from 'store/game/thunks/saveScore';
import { selectSettings, changeVolume } from 'store/settings/slice';
import { useTimer } from 'utils/hooks';
import { formatTime, setLocalStorageValue } from 'utils/functions';
import classes from './classes.module.scss';

interface IProps {
  getFocusRef: (ref: HTMLDivElement) => void;
}

const GameControls: React.FC<IProps> = ({ getFocusRef }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const focusRef = useRef<HTMLDivElement>();

  const { player, cards, score, level, isAutoplay, isGamePaused } = useSelector(selectGameData);
  const { soundVolume, musicVolume, keys } = useSelector(selectSettings);
  const [isLevelCompleted, setIsLevelCompleted] = useState(false);
  const { timer, isPaused, handleStart, handlePause, handleResume, handleReset } = useTimer(score);

  const menuClickSound = new Audio(menuSound);
  menuClickSound.volume = soundVolume;

  useEffect(() => {
    setIsLevelCompleted(cards.every(({ status }) => status === ECardStatus.Guessed));
  }, [cards]);

  useEffect(() => {
    const screen = focusRef.current;
    getFocusRef(screen);
    screen.focus();
    if (!score) {
      handleStart();
    }
  }, []);

  useEffect(() => {
    let timeoutTimer;
    if (isLevelCompleted) {
      if (level < LAST_LEVEL) {
        timeoutTimer = setTimeout(() => {
          dispatch(loadNextLevel());
        }, 1000);
      } else {
        void dispatch(saveScore({ player, score }));
        history.push('/rating');
      }
    }

    return () => clearTimeout(timeoutTimer);
  }, [isLevelCompleted]);

  useEffect(() => {
    if (isGamePaused) {
      handlePause();
    } else {
      handleResume();
    }
    return () => handlePause();
  }, [isGamePaused]);

  const saveGameData = () => {
    setLocalStorageValue('gameData', {
      cards,
      level,
      score: timer,
      player,
    });
  };

  useEffect(() => {
    if (!isAutoplay && timer) {
      saveGameData();
      dispatch(saveCurrentScore(timer));
    }
  }, [timer]);

  useEffect(() => {
    if (!score) {
      handleReset();
      handlePause();
    }
  }, [isAutoplay]);

  const onChangeAudioVolumeHandler = (audio: 'sound' | 'music') => {
    let volume = audio === 'sound' ? soundVolume : musicVolume;
    if (volume < 0.5) volume = 0.5;
    else if (volume >= 0.5 && volume < 1) volume = 1;
    else volume = 0;

    if (audio === 'sound') {
      menuClickSound.currentTime = 0;
      void menuClickSound.play();
    }
    dispatch(changeVolume({ audio, volume }));
  };

  const toggleFullscreenHandler = () => {
    if (!document.fullscreenElement) {
      void document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      void document.exitFullscreen();
    }
  };

  const onGamePauseHandler = () => dispatch(setIsGamePaused(!isPaused));
  const onGameReloadHandler = () => {
    if (!isAutoplay) {
      handleReset();
      dispatch(startGame());
    }
  };

  const handleKeyPress = ({ code }: React.KeyboardEvent<HTMLInputElement>) => {
    const pressedKey = code.slice(3);
    const { fullscreen, reload, sounds, music, pause } = keys;
    switch (pressedKey) {
      case fullscreen:
        return toggleFullscreenHandler();
      case reload:
        return onGameReloadHandler();
      case sounds:
        return onChangeAudioVolumeHandler('sound');
      case music:
        return onChangeAudioVolumeHandler('music');
      case pause:
        return onGamePauseHandler();
      default:
        return null;
    }
  };

  return (
    <header className={classes.gameControls}>
      <div role="menu" ref={focusRef} className={classes.screen} tabIndex={0} onKeyPress={handleKeyPress} />
      <span className={classes.level}>level: {level}</span>

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
            soundVolume === 0 ? <Sound0 /> : soundVolume <= 0.5 ? <Sound1 /> : <Sound2 />
          }
        />
        <Button
          title="Music Volume"
          onClick={() => onChangeAudioVolumeHandler('music')}
          icon={
            // eslint-disable-next-line no-nested-ternary
            musicVolume === 0 ? <Music0 /> : musicVolume <= 0.5 ? <Music1 /> : <Music2 />
          }
        />
        <Button title="Back to Menu" onClick={() => history.push('/')} icon={<Back />} />
      </span>
    </header>
  );
};

export default GameControls;
