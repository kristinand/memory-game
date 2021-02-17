import * as actionTypes from './actionTypes';
import { shuffleList, generateRandomColor, fillCards } from '../utils/functions';

const initState = {
  level: 1,
  levels: 5,
  cards: [],
  coverColor: generateRandomColor(40, 40, 60, 60),
  cardsToWin: null,
  isGameStarted: false,
  isTimerPaused: true,
  player: '',
  score: 0,
  musicVolume: 0.5,
  soundVolume: 0.5,
};

const updateGameStatus = (state, status, selectedCardIndex, oldCardIndex = -1) => {
  let cards = state.cards;
  let selectedCard = cards[selectedCardIndex];
  let oldCard = cards[oldCardIndex];
  let cardsToWin = state.cardsToWin;
  let isTimerPaused = state.isTimerPaused;

  if (status ===  'opened') {
    selectedCard.status = 'opened';
    cards = cards.slice(0, selectedCardIndex).concat([selectedCard, ...cards.slice(selectedCardIndex + 1)]);
    isTimerPaused = false;
  } else if (status ===  'guessed') {
    selectedCard.status = 'guessed';
    oldCard.status = 'guessed';
    cards = cards.slice(0, selectedCardIndex).concat([selectedCard, ...cards.slice(selectedCardIndex + 1)]);
    cards = cards.slice(0, oldCardIndex).concat([oldCard, ...cards.slice(oldCardIndex + 1)]);
    cardsToWin = cardsToWin - 2;
  } else if (status ===  'not-guessed') {
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
  return { cards, cardsToWin, isTimerPaused };
};

const createCards = (level, coverColor) => {
  let cards = [];
  cards = fillCards(cards, level, coverColor);
  cards = shuffleList(cards);
  return cards;
}

const gameReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.START_GAME: {
      let cards = createCards(state.level, state.coverColor);
      if (action.player === '') return;
      return { ...state, player: action.player, isGameStarted: true, cards, cardsToWin: cards.length, level: 1 }
    };
    case actionTypes.END_GAME: {
      console.log('Your scores: ' + state.score.join(", "));
      return { ...initState, player: state.player };
    }
    case actionTypes.LOAD_LEVEL: {
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
        cards, level, coverColor,
        cardsToWin: cards.length,
        isTimerPaused: true,
      };
    }
    case actionTypes.RESET_LEVEL: {
      return {...state, cards: createCards(state.level, state.coverColor), cardsToWin: state.cards.length };
    }
    case actionTypes.END_LEVEL: {
      return {...state, score: action.timer};
    }

    case actionTypes.CHANGE_CARD_STATUS: {
      const { cards, cardsToWin, isTimerPaused } = updateGameStatus(state, action.status, action.selectedCardIndex, action.oldCardindex);
      return { ...state, cards, cardsToWin, isTimerPaused };
    }
    case actionTypes.CHANGE_VOLUME: {
      if (action.audio === 'music') {
        return {...state, musicVolume: action.volume}
      } else {
        return {...state, soundVolume: action.volume}
      }
    }
    case actionTypes.CHANGE_PAUSE_STATUS: {
      console.log(action.isPaused)
      return {...state, isTimerPaused: action.isPaused}
    }
    default:
      return state;
  }
};

export default gameReducer;
