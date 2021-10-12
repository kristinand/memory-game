/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-use-before-define */
import { Reducer } from 'redux';
import { ICard, IState } from 'entities/interfaces';
import { ECardStatus } from 'entities/enums';
import { TActionTypes, EActionTypes } from './entities';
import { shuffleList, getRandomColor, fillCards } from '../utils/functions';

const initState: IState = {
  level: 1,
  cards: [],
  coverColor: getRandomColor(40, 40, 60, 60),
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

const gameReducer: Reducer<IState, TActionTypes> = (state = initState, action) => {
  switch (action.type) {
    case EActionTypes.LOAD_LOCAL_GAME_DATA:
      return loadLocalGameData(state, action);
    case EActionTypes.LOAD_LOCAL_SETTINGS_DATA:
      return loadLocalSettingsData(state, action);

    case EActionTypes.LOGIN:
      return login(state, action);
    case EActionTypes.LOGOUT:
      return { ...state, player: '', isLoggedIn: false };

    case EActionTypes.START_GAME:
      return startGame(state);
    case EActionTypes.END_GAME:
      return endGame(state);

    case EActionTypes.LOAD_LEVEL:
      return loadLevel(state, action);
    case EActionTypes.SAVE_SCORE:
      return { ...state, score: action.timer };
    case EActionTypes.AUTOPLAY:
      return { ...state, isAutoplay: action.value };
    case EActionTypes.CHANGE_PAUSE_STATUS:
      return { ...state, isGamePaused: action.isPaused };
      case EActionTypes.CHANGE_CARD_STATUS:
        return updateGameStatus(state, action);

    case EActionTypes.CHANGE_VOLUME:
      return changeVolume(state, action);
    case EActionTypes.CHANGE_HOTKEY:
      return changeHotkey(state, action);
    case EActionTypes.CHANGE_BG_COLOR:
      return { ...state, settings: { ...state.settings, bgColor: action.bgColor } };
    case EActionTypes.TOGGLE_PATTERN:
      return { ...state, settings: { ...state.settings, isPatternShown: !state.settings.isPatternShown } };
    case EActionTypes.SET_DEFAULT_SETTINGS:
      return { ...state, settings: initState.settings };

    default:
      return state;
  }
};

const loadLocalGameData = (state, action): IState => {
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

const loadLocalSettingsData = (state, action): IState => ({
  ...state,
  settings: {
    ...state.settings,
    ...action.data,
  },
});

const startGame = (state): IState => {
  localStorage.removeItem('gameData');
  const coverColor = getRandomColor(40, 40, 60, 60);
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

const endGame = (state): IState => {
  localStorage.removeItem('gameData');
  return { ...state, isGameEnded: true };
};

const login = (state: IState, action): IState => ({ ...state, isLoggedIn: true, player: action.player });

const loadLevel = (state, action): IState => {
  let { level } = state;
  if (action.param === 'inc' && level < state.levels) {
    level += 1;
  } else if (action.param === 'dec' && level > 1) {
    level -= 1;
  }
  const coverColor = getRandomColor(40, 40, 60, 60);
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

const updateGameStatus = (state, action): IState => {
  const { selectedCardIndex, oldCardIndex, status } = action;
  let { cards, cardsToWin } = state;
  const selectedCard = cards[selectedCardIndex];
  const oldCard = cards[oldCardIndex];

  if (status === ECardStatus.Opened) {
    selectedCard.status = ECardStatus.Opened;
    cards = cards.slice(0, selectedCardIndex).concat([selectedCard, ...cards.slice(selectedCardIndex + 1)]);
  } else if (status === ECardStatus.Guessed) {
    selectedCard.status = ECardStatus.Guessed;
    oldCard.status = ECardStatus.Guessed;
    cards = cards.slice(0, selectedCardIndex).concat([selectedCard, ...cards.slice(selectedCardIndex + 1)]);
    cards = cards.slice(0, oldCardIndex).concat([oldCard, ...cards.slice(oldCardIndex + 1)]);
    cardsToWin -= 2;
  } else if (status === ECardStatus.NotGuessed) {
    selectedCard.status = ECardStatus.NotGuessed;
    oldCard.status = ECardStatus.NotGuessed;
    cards = cards.slice(0, selectedCardIndex).concat([selectedCard, ...cards.slice(selectedCardIndex + 1)]);
    cards = cards.slice(0, oldCardIndex).concat([oldCard, ...cards.slice(oldCardIndex + 1)]);
  } else {
    selectedCard.status = ECardStatus.Closed;
    oldCard.status = ECardStatus.Closed;
    cards = cards.slice(0, selectedCardIndex).concat([selectedCard, ...cards.slice(selectedCardIndex + 1)]);
    cards = cards.slice(0, oldCardIndex).concat([oldCard, ...cards.slice(oldCardIndex + 1)]);
  }
  return { ...state, cards, cardsToWin, isGamePaused: false };
};

const createCards = (level, coverColor): ICard[] => {
  let cards = [];
  cards = fillCards(cards, level, coverColor);
  cards = shuffleList(cards);
  return cards;
};

const changeVolume = (state, action): IState => {
  let newState;
  if (action.audio === 'music') {
    newState = { ...state, settings: { ...state.settings, musicVolume: action.volume } };
  } else {
    newState = { ...state, settings: { ...state.settings, soundVolume: action.volume } };
  }
  return newState;
};

const changeHotkey = (state, action): IState => {
  const { keyType, value: keyValue } = action;
  return { ...state, settings: { ...state.settings, keys: { ...state.settings.keys, [keyType]: keyValue } } };
};

export default gameReducer;
