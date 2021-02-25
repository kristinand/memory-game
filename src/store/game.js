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
    case actionTypes.LOGIN: return login(state, action);
    case actionTypes.LOGOUT: return {...state, player: '', isLoggedIn: false};
    case actionTypes.LOAD_LOCAL_GAME_DATA: return loadLocalGameData(state, action);
    case actionTypes.LOAD_LOCAL_SETTINGS_DATA: return loadLocalSettingsData(state, action);
    case actionTypes.START_GAME: return startGame(state, action);
    case actionTypes.END_GAME: return endGame(state, action);
    case actionTypes.LOAD_LEVEL: return loadLevel(state, action);
    case actionTypes.SAVE_SCORE: return { ...state, score: action.timer };
    case actionTypes.CHANGE_CARD_STATUS: return updateGameStatus(state, action);
    case actionTypes.CHANGE_VOLUME: return changeVolume(state, action);
    case actionTypes.CHANGE_PAUSE_STATUS: return { ...state, isGamePaused: action.isPaused };
    case actionTypes.CHANGE_HOTKEY: return changeHotkey(state, action);
    case actionTypes.CHANGE_BG_COLOR: return { ...state, settings: {...state.settings, bgColor: action.bgColor }};
    case actionTypes.TOGGLE_PATTERN: return { ...state, settings: {...state.settings, isPatternShown: !state.settings.isPatternShown }};
    case actionTypes.SET_DEFAULT_SETTINGS: return { ...state, settings: initState.settings };
    case actionTypes.AUTOPLAY: return { ...state, isAutoplay: action.value };
    default: return state;
  }
};

const login = (state, action) => {
  return { ...state, isLoggedIn: true, player: action.player};
}

const loadLocalGameData = (state, action) => {
  const data = action.data;
  if (Object.keys(data).length === 0 ) {
    return {
      ...state,
      player: action.player,
      isLoggedIn: action.player !== undefined
    }
  } else {
    return {
      ...state,
      player: action.player,
      isLoggedIn: action.player !== undefined,
      level: data.level,
      cards: data.cards,
      coverColor: data.coverColor,
      cardsToWin: data.cardsToWin,
      isGamePaused: data.isGamePaused,
      score: data.score,
      isGamePaused: true,
    };
  }
}

const loadLocalSettingsData = (state, action) => {
  return {
    ...state,
    settings: {
      ...state.settings,
      ...action.data
    }
  };
}

const startGame = (state, action) => {
  localStorage.removeItem('gameData');
  const coverColor = generateRandomColor(40, 40, 60, 60);
  let cards = createCards(1, coverColor);
  if (action.player === '') return;
  return {
    ...state,
    coverColor: coverColor,
    cards,
    cardsToWin: cards.length,
    level: 1,
    score: 0,
    isGamePaused: true,
    isGameEnded: false,
    isAutoplay: false,
  };
};

const endGame = (state, action) => {
  localStorage.removeItem('gameData');
  return { ...state, isGameEnded: true };
}

const changeVolume = (state, action) => {
  if (action.audio === 'music') {
    return { ...state, settings: {...state.settings, musicVolume: action.volume} };
  } else {
    return { ...state, settings: {...state.settings, soundVolume: action.volume} };
  }
};

const loadLevel = (state, action) => {
  let level = state.level;
  if (action.param === 'inc' && level < state.levels) {
    level += 1;
  } else if (action.param === 'dec' && level > 1) {
    level -= 1;
  }
  const coverColor = generateRandomColor(40, 40, 60, 60);
  let cards = createCards(level, state.coverColor);
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
  let cards = state.cards;
  let selectedCard = cards[selectedCardIndex];
  let oldCard = cards[oldCardIndex];
  let cardsToWin = state.cardsToWin;

  if (status === 'opened') {
    selectedCard.status = 'opened';
    cards = cards.slice(0, selectedCardIndex).concat([selectedCard, ...cards.slice(selectedCardIndex + 1)]);
  } else if (status === 'guessed') {
    selectedCard.status = 'guessed';
    oldCard.status = 'guessed';
    cards = cards.slice(0, selectedCardIndex).concat([selectedCard, ...cards.slice(selectedCardIndex + 1)]);
    cards = cards.slice(0, oldCardIndex).concat([oldCard, ...cards.slice(oldCardIndex + 1)]);
    cardsToWin = cardsToWin - 2;
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
  const keyType = action.keyType;
  const keyValue = action.value;
  return { ...state, settings: {...state.settings, keys: { ...state.settings.keys, [keyType]: keyValue }} };
};

export default gameReducer;
