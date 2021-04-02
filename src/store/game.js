/* eslint-disable no-use-before-define */
import * as actionTypes from './actionTypes';
import { shuffleList, generateRandomColor, fillCards } from '../utils/functions';

const initState = {
  level: 1,
  cards: [],
  coverColor: generateRandomColor(40, 40, 60, 60),
  cardsToWin: null,
  isGamePaused: true,
  isGameEnded: false,
  isLoggedIn: false,
  isAutoplay: false,
  player: '',
  score: 0,
  levels: 5,
  settings: {
    bgColor: '#f8ebc6',
    isPatternShown: true,
    musicVolume: 0.5,
    soundVolume: 0.5,
    keys: {
      music: 'm',
      sounds: 's',
      reload: 'r',
      fullscreen: 'f',
      pause: 'p',
    },
  },
};

const gameReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return login(state, action);
    case actionTypes.LOGOUT:
      return { ...state, player: '', isLoggedIn: false };
    case actionTypes.LOAD_LOCAL_GAME_DATA:
      return loadLocalGameData(state, action);
    case actionTypes.LOAD_LOCAL_SETTINGS_DATA:
      return loadLocalSettingsData(state, action);
    case actionTypes.START_GAME:
      return startGame(state, action);
    case actionTypes.END_GAME:
      return endGame(state, action);
    case actionTypes.LOAD_LEVEL:
      return loadLevel(state, action);
    case actionTypes.SAVE_SCORE:
      return { ...state, score: action.timer };
    case actionTypes.CHANGE_CARD_STATUS:
      return updateGameStatus(state, action);
    case actionTypes.CHANGE_VOLUME:
      return changeVolume(state, action);
    case actionTypes.CHANGE_PAUSE_STATUS:
      return { ...state, isGamePaused: action.isPaused };
    case actionTypes.CHANGE_HOTKEY:
      return changeHotkey(state, action);
    case actionTypes.CHANGE_BG_COLOR:
      return { ...state, settings: { ...state.settings, bgColor: action.bgColor } };
    case actionTypes.SET_DEFAULT_SETTINGS:
      return { ...state, settings: initState.settings };
    case actionTypes.AUTOPLAY:
      return { ...state, isAutoplay: action.value };
    case actionTypes.TOGGLE_PATTERN:
      return { ...state, settings: { ...state.settings, isPatternShown: !state.settings.isPatternShown } };
    default:
      return state;
  }
};

const login = (state, action) => ({ ...state, isLoggedIn: true, player: action.player });

const loadLocalGameData = (state, action) => {
  const { data, player } = action;
  let newState;
  if (data === null) {
    newState = {
      ...state,
      player,
      isLoggedIn: player !== undefined,
    };
  } else {
    newState = {
      ...state,
      player,
      isLoggedIn: player !== undefined,
      level: data.level,
      cards: data.cards,
      coverColor: data.coverColor,
      cardsToWin: data.cardsToWin,
      score: data.score,
    };
  }
  return newState;
};

const loadLocalSettingsData = (state, action) => ({
  ...state,
  settings: {
    ...state.settings,
    ...action.data,
  },
});

const startGame = (state) => {
  localStorage.removeItem('gameData');
  const coverColor = generateRandomColor(40, 40, 60, 60);
  const cards = createCards(1, coverColor);
  return {
    ...state,
    coverColor,
    cards,
    cardsToWin: cards.length,
    level: 1,
    score: 0,
    isGamePaused: true,
    isGameEnded: false,
    isAutoplay: false,
  };
};

const endGame = (state) => {
  localStorage.removeItem('gameData');
  return { ...state, isGameEnded: true };
};

const changeVolume = (state, action) => {
  let newState;
  if (action.audio === 'music') {
    newState = { ...state, settings: { ...state.settings, musicVolume: action.volume } };
  } else {
    newState = { ...state, settings: { ...state.settings, soundVolume: action.volume } };
  }
  return newState;
};

const loadLevel = (state, action) => {
  let { level } = state;
  if (action.param === 'inc' && level < state.levels) {
    level += 1;
  } else if (action.param === 'dec' && level > 1) {
    level -= 1;
  }
  const coverColor = generateRandomColor(40, 40, 60, 60);
  const cards = createCards(level, state.coverColor);
  return {
    ...state,
    cards,
    level,
    coverColor,
    cardsToWin: cards.length,
    isGamePaused: true,
  };
};

const updateGameStatus = (state, action) => {
  const { selectedCardIndex, oldCardIndex, status } = action;
  let { cards, cardsToWin } = state;
  const selectedCard = cards[selectedCardIndex];
  const oldCard = cards[oldCardIndex];

  if (status === 'opened') {
    selectedCard.status = 'opened';
    cards = cards.slice(0, selectedCardIndex).concat([selectedCard, ...cards.slice(selectedCardIndex + 1)]);
  } else if (status === 'guessed') {
    selectedCard.status = 'guessed';
    oldCard.status = 'guessed';
    cards = cards.slice(0, selectedCardIndex).concat([selectedCard, ...cards.slice(selectedCardIndex + 1)]);
    cards = cards.slice(0, oldCardIndex).concat([oldCard, ...cards.slice(oldCardIndex + 1)]);
    cardsToWin -= 2;
  } else if (status === 'not-guessed') {
    selectedCard.status = 'not-guessed';
    oldCard.status = 'not-guessed';
    cards = cards.slice(0, selectedCardIndex).concat([selectedCard, ...cards.slice(selectedCardIndex + 1)]);
    cards = cards.slice(0, oldCardIndex).concat([oldCard, ...cards.slice(oldCardIndex + 1)]);
  } else {
    selectedCard.status = 'closed';
    oldCard.status = 'closed';
    cards = cards.slice(0, selectedCardIndex).concat([selectedCard, ...cards.slice(selectedCardIndex + 1)]);
    cards = cards.slice(0, oldCardIndex).concat([oldCard, ...cards.slice(oldCardIndex + 1)]);
  }
  return { ...state, cards, cardsToWin, isGamePaused: false };
};

const createCards = (level, coverColor) => {
  let cards = [];
  cards = fillCards(cards, level, coverColor);
  cards = shuffleList(cards);
  return cards;
};

const changeHotkey = (state, action) => {
  const { keyType, value: keyValue } = action;
  return { ...state, settings: { ...state.settings, keys: { ...state.settings.keys, [keyType]: keyValue } } };
};

export default gameReducer;
