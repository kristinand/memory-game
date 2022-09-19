import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate  } from 'react-router-dom';

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
import { selectGameData, loadNextLevel, saveCurrentScore, startGame, setIsGamePaused } from 'store/game/slice';
import { saveScore } from 'store/game/thunks/saveScore';
import { selectSettings, changeVolume } from 'store/settings/slice';
import { useTimer, usePlayerData, useAudio } from 'utils/hooks';
import { formatTime } from 'utils/functions';
import classes from './classes.module.scss';

interface IProps {
  getFocusRef: (ref: HTMLDivElement) => void;
}

const GameControls: React.FC<IProps> = ({ getFocusRef }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const focusRef = useRef<HTMLDivElement>();

  const { cards, score, level, isAutoplay, isGamePaused } = useSelector(selectGameData);
  const { soundVolume, musicVolume, keys } = useSelector(selectSettings);
  const { timer, isPaused, handleStart, handlePause, handleReset } = useTimer({ initTimer: score });
  const { updatePlayerData } = usePlayerData();
  const clickSound = useAudio('sound', { volume: musicVolume });

  useEffect(() => {
    const screen = focusRef.current;
    getFocusRef(focusRef.current);
    screen.focus();
  }, [getFocusRef]);

  useEffect(() => {
    let timeoutTimer;

    if (!isAutoplay && cards.every(card => card.status === ECardStatus.Guessed)) {
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
    if (isGamePaused) {
      handlePause();
    } else {
      handleStart();
    }

    return () => handlePause();
  }, [handlePause, handleStart, isGamePaused]);

  useEffect(() => {
    if (timer && !isAutoplay) {
      updatePlayerData({
        game: {
          cards,
          level,
          score: timer,
        },
      });
      dispatch(saveCurrentScore(timer));
    }
  }, [cards, dispatch, isAutoplay, level, timer, updatePlayerData]);

  const onChangeAudioVolumeHandler = (audio: 'sound' | 'music') => {
    let volume = audio === 'sound' ? soundVolume : musicVolume;
    if (volume < 0.5) volume = 0.5;
    else if (volume >= 0.5 && volume < 1) volume = 1;
    else volume = 0;

    if (audio === 'sound') {
      clickSound.volume = volume;
      clickSound.replay();
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
    handleReset();
    dispatch(startGame());
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
        <Button title="Back to Menu" onClick={() => navigate('/')} icon={<Back />} />
      </span>
    </header>
  );
};

export default GameControls;
