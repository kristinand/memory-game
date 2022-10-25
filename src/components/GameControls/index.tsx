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

import { LAST_LEVEL, DELAY } from 'utils/constants';
import { ECardStatus } from 'types';
import { selectGameData, loadNextLevel, saveCurrentScore, startGame } from 'store/game/slice';
import { saveScore } from 'store/game/thunks/saveScore';
import { selectSettings, changeVolume } from 'store/settings/slice';
import { useTimer, useLocalPlayerData, useAudio } from 'utils/hooks';
import { formatTime } from 'utils/functions';
import classes from './classes.module.scss';

const GameControls: React.FC = () => {
  const { state } = useLocation() as { state: { isNewGame: boolean } };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cards, score, level, isAutoplay } = useSelector(selectGameData);
  const { soundVolume, musicVolume, keys } = useSelector(selectSettings);
  const { timer, isPaused, handleStart, handlePause, handleReset } = useTimer({
    initTimer: state.isNewGame ? 0 : score,
  });
  const { deletePlayerData, updatePlayerSettingsData } = useLocalPlayerData();
  const clickSound = useAudio('sound', { volume: soundVolume });
  const musicSound = useAudio('music', { volume: musicVolume, loop: true }, true);

  useEffect(() => {
    if (state.isNewGame) {
      deletePlayerData('game');
      dispatch(startGame());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isNewGame, dispatch]);

  useEffect(() => {
    musicSound.volume = musicVolume;
  }, [musicVolume, musicSound]);

  useEffect(() => {
    clickSound.volume = soundVolume;
  }, [clickSound, soundVolume]);

  useEffect(() => {
    if (isPaused && cards) {
      handleStart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  useEffect(() => {
    if (timer) {
      dispatch(saveCurrentScore(timer));
    }
  }, [dispatch, timer]);

  useEffect(() => {
    const hasNotGuessed = cards.some(({ status }) => status !== ECardStatus.Guessed);

    if (isAutoplay || hasNotGuessed) {
      return null;
    }

    let timeoutTimer;
    // TODO: Show modal instead of redirect
    if (level === LAST_LEVEL) {
      void dispatch(saveScore(score));
      timeoutTimer = setTimeout(() => {
        navigate('/rating');
      }, DELAY);
    } else {
      timeoutTimer = setTimeout(() => {
        dispatch(loadNextLevel());
      }, DELAY);
    }

    return () => clearTimeout(timeoutTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, cards]);

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
      updatePlayerSettingsData({ [audio.concat('Volume')]: volume });
    },
    [clickSound, dispatch, musicVolume, soundVolume, updatePlayerSettingsData],
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
    deletePlayerData('game');
    dispatch(startGame());
  }, [deletePlayerData, dispatch, handleReset]);

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

    window.addEventListener('keypress', handleKeyPress);
    return window.removeEventListener('keypress', handleKeyPress);
  }, [keys, onChangeAudioVolumeHandler, onGamePauseHandler, onGameReloadHandler]);

  return (
    <header className={classes.gameControls}>
      <div>
        level: {level}/{LAST_LEVEL}
        <span className={classes.divider}>|</span>
        {formatTime(timer)}
      </div>
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
