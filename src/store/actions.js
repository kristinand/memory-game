import * as actionTypes from './actionTypes';

export const changeLevel = (param, level) => {
  return {
    type: actionTypes.CHANGE_LEVEL,
    param,
  };
};

export const loadLevel = () => {
  return {
    type: actionTypes.LOAD_LEVEL,
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
