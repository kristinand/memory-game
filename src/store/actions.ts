import * as actionTypes from './actionTypes';
import api from '../api/api';

export const loadLevel = (param = '') => ({
  type: actionTypes.LOAD_LEVEL,
  param,
});

export const changeCardStatus = (status, selectedCardIndex, oldCardIndex?) => ({
  type: actionTypes.CHANGE_CARD_STATUS,
  status,
  selectedCardIndex,
  oldCardIndex,
});

export const startGame = () => ({
  type: actionTypes.START_GAME,
});

export const endGame = (player, score) => async (dispatch) => {
  try {
    const payload = await api.saveScore({ player, score });
    dispatch({
      type: actionTypes.END_GAME,
      payload,
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
