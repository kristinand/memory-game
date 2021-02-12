import * as actionTypes from './actionTypes';

export const loadLevel = (param = '') => {
  return {
    type: actionTypes.LOAD_LEVEL,
    param,
  };
};

export const resetLevel = () => {
  return {
    type: actionTypes.RESET_LEVEL,
  };
};

export const endLevel = (timer = 0) => {
  return {
    type: actionTypes.END_LEVEL,
    timer,
  };
};

export const changeCardStatus = (status, selectedCardIndex, oldCardindex) => {
  return {
    type: actionTypes.CHANGE_CARD_STATUS,
    status,
    selectedCardIndex,
    oldCardindex,
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