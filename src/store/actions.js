import axios from 'axios';
import * as actionTypes from './actionTypes';

export const loadLevel = (param = '') => ({
  type: actionTypes.LOAD_LEVEL,
  param,
});

export const changeCardStatus = (status, selectedCardIndex, oldCardIndex) => ({
  type: actionTypes.CHANGE_CARD_STATUS,
  status,
  selectedCardIndex,
  oldCardIndex,
});

export const startGame = () => ({
  type: actionTypes.START_GAME,
});

export const endGame = (player, score) => async (dispatch) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  const body = JSON.stringify({ player, score });

  try {
    const res = await axios.put('http://localhost:5000/game', body, config);
    dispatch({
      type: actionTypes.END_GAME,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const changeVolume = (audio, volume) => ({
  type: actionTypes.CHANGE_VOLUME,
  audio,
  volume,
});

export const setIsGamePaused = (isPaused) => ({
  type: actionTypes.CHANGE_PAUSE_STATUS,
  isPaused,
});

export const loadLocalGameData = (player, data) => ({
  type: actionTypes.LOAD_LOCAL_GAME_DATA,
  player,
  data,
});

export const loadLocalSettingsData = (data) => ({
  type: actionTypes.LOAD_LOCAL_SETTINGS_DATA,
  data,
});

export const changeHotkey = (keyType, value) => ({
  type: actionTypes.CHANGE_HOTKEY,
  keyType,
  value,
});

export const setDefaultSettings = () => ({
  type: actionTypes.SET_DEFAULT_SETTINGS,
});

export const changeBgColor = (bgColor) => ({
  type: actionTypes.CHANGE_BG_COLOR,
  bgColor,
});

export const togglePattern = () => ({
  type: actionTypes.TOGGLE_PATTERN,
});

export const saveScore = (timer) => ({
  type: actionTypes.SAVE_SCORE,
  timer,
});

export const login = (player) => ({
  type: actionTypes.LOGIN,
  player,
});

export const logout = () => ({
  type: actionTypes.LOGOUT,
});

export const setAutoplay = (value) => ({
  type: actionTypes.AUTOPLAY,
  value,
});
