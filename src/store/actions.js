import * as actionTypes from './actionTypes';
import axios from 'axios';

export const loadLevel = (param = '') => {
  return {
    type: actionTypes.LOAD_LEVEL,
    param,
  };
};

export const changeCardStatus = (status, selectedCardIndex, oldCardIndex) => {
  return {
    type: actionTypes.CHANGE_CARD_STATUS,
    status,
    selectedCardIndex,
    oldCardIndex,
  };
};

export const startGame = (player) => {
  return {
    type: actionTypes.START_GAME,
    player,
  };
};

export const endGame = (player, score) => async dispatch => {

    const config = {
      headers: {'Content-Type': 'application/json'}
    }
    const body = JSON.stringify({player, score});
    
    try {
      const res = await axios.put('http://localhost:5000/game', body, config);
      dispatch({
      type: actionTypes.END_GAME,
      payload: res.data,
    })
  } catch(err) {
    console.error(err);
  }
};

export const changeVolume = (audio, volume) => {
  return {
    type: actionTypes.CHANGE_VOLUME,
    audio,
    volume,
  };
};

export const setIsGamePaused = (isPaused) => {
  return {
    type: actionTypes.CHANGE_PAUSE_STATUS,
    isPaused,
  };
};

export const loadLocalGameData = (player, data) => {
  return {
    type: actionTypes.LOAD_LOCAL_GAME_DATA,
    player,
    data,
  };
};

export const loadLocalSettingsData = (data) => {
  return {
    type: actionTypes.LOAD_LOCAL_SETTINGS_DATA,
    data,
  };
};

export const changeHotkey = (keyType, value) => {
  return {
    type: actionTypes.CHANGE_HOTKEY,
    keyType,
    value,
  };
};

export const setDefaultSettings = () => {
  return {
    type: actionTypes.SET_DEFAULT_SETTINGS,
  };
};

export const changeBgColor = (bgColor) => {
  return {
    type: actionTypes.CHANGE_BG_COLOR,
    bgColor,
  };
};

export const togglePattern = () => {
  return {
    type: actionTypes.TOGGLE_PATTERN,
  };
};

export const saveScore = (timer) => {
  return {
    type: actionTypes.SAVE_SCORE,
    timer,
  };
};

export const login = (player) => {
  return {
    type: actionTypes.LOGIN,
    player,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT
  };
};
