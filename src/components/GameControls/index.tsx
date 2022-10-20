import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

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

import { LAST_LEVEL } from 'utils/constants';
import { ECardStatus } from 'types';
import { selectGameData, loadNextLevel, saveCurrentScore, startGame } from 'store/game/slice';
import { saveScore } from 'store/game/thunks/saveScore';
import { selectSettings, changeVolume } from 'store/settings/slice';
import { useTimer, usePlayerData, useAudio } from 'utils/hooks';
import { formatTime } from 'utils/functions';
import classes from './classes.module.scss';

interface IProps {
  isGameStarted: boolean;
}

const GameControls: React.FC<IProps> = ({ isGameStarted }) => {
  const { state } = useLocation() as { state: { isContinue: boolean } };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cards, score, level, isAutoplay } = useSelector(selectGameData);
  const { soundVolume, musicVolume, keys } = useSelector(selectSettings);
  const { timer, isPaused, handleStart, handlePause, handleReset } = useTimer({
    initTimer: state?.isContinue ? score : 0,
  });
  const { updatePlayerData, deletePlayerData } = usePlayerData();
  const clickSound = useAudio('sound', { volume: musicVolume });
  const musicSound = useAudio('music', { volume: musicVolume, loop: true }, true);

  useEffect(() => {
    if (!state?.isContinue) {
      deletePlayerData('game');
      dispatch(startGame());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isContinue, dispatch]);

  useEffect(() => {
    musicSound.volume = musicVolume;
  }, [musicVolume, musicSound]);

  useEffect(() => {
    if (isGameStarted) {
      handleStart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameStarted]);

  useEffect(() => {
    let timeoutTimer;

    if (!isAutoplay && cards.every((card) => card.status === ECardStatus.Guessed)) {
      if (level < LAST_LEVEL) {
        timeoutTimer = setTimeout(() => {
          dispatch(loadNextLevel());
        }, 1000);
      } else {
        void dispatch(saveScore(score));
        navigate('/rating');
      }
    }

    return () => clearTimeout(timeoutTimer);
  }, [isAutoplay, level, dispatch, score, navigate, cards]);

  useEffect(() => {
    if (timer && !isAutoplay && !isPaused) {
      updatePlayerData({
        game: {
          cards,
          level,
          score: timer,
        },
      });
      dispatch(saveCurrentScore(timer));
    }
  }, [cards, dispatch, isAutoplay, isPaused, level, timer, updatePlayerData]);

  const onChangeAudioVolumeHandler = useCallback(
    (audio: 'sound' | 'music') => {
      let volume = audio === 'sound' ? soundVolume : musicVolume;

      if (volume < 0.5) {
        volume = 0.5;
      } else if (volume >= 0.5 && volume < 1) {
        volume = 1;
      } else {
        volume = 0;
      }

      if (audio === 'sound') {
        clickSound.volume = volume;
        clickSound.replay();
      }

      dispatch(changeVolume({ audio, volume }));
    },
    [clickSound, dispatch, musicVolume, soundVolume],
  );

  const toggleFullscreenHandler = () => {
    if (!document.fullscreenElement) {
      void document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      void document.exitFullscreen();
    }
  };

  const onGamePauseHandler = useCallback(() => {
    if (isPaused) {
      handleStart();
    } else {
      handlePause();
    }
  }, [handlePause, handleStart, isPaused]);

  const onGameReloadHandler = useCallback(() => {
    handleReset();
    dispatch(startGame());
  }, [dispatch, handleReset]);

  useEffect(() => {
    const handleKeyPress = ({ code }: KeyboardEvent) => {
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

    window.addEventListener('keypress', (e) => handleKeyPress(e));
    return window.removeEventListener('keypress', (e) => handleKeyPress(e));
  }, [keys, onChangeAudioVolumeHandler, onGamePauseHandler, onGameReloadHandler]);

  return (
    <header className={classes.gameControls}>
      <span className={classes.level}>
        level: {level}/{LAST_LEVEL}
      </span>
      <span className={classes.timer}>{formatTime(timer)}</span>
      <div className={classes.buttonGroup}>
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
        <Button title="Back to Menu" onClick={() => navigate('/')} icon={<Back />} />
      </div>
    </header>
  );
};

export default GameControls;
