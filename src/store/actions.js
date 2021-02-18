import * as actionTypes from './actionTypes';

export const loadLevel = (param = '') => {
  return {
    type: actionTypes.LOAD_LEVEL,
    param,
  };
};

export const endLevel = (timer = 0) => {
  return {
    type: actionTypes.END_LEVEL,
    timer,
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

export const endGame = () => {
  return {
    type: actionTypes.END_GAME
  };
};

export const changeVolume = (audio, volume) => {
  return {
    type: actionTypes.CHANGE_VOLUME,
    audio,
    volume,
  }
}

export const setIsTimerPaused = (isPaused) => {
  return {
    type: actionTypes.CHANGE_PAUSE_STATUS,
    isPaused
  }
}