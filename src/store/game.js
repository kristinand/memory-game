import * as actionTypes from './actionTypes';
import { shuffleList, generateRandomColor, fillCards } from '../utils/functions';

const initState = {
  level: 1,
  levels: 5,
  cards: [],
  coverColor: generateRandomColor(40, 40, 60, 60),
  cardsToWin: null,
  isLevelStarted: false,
  isGameStarted: false,
  player: 'Player',
  score: [],
};

const updateGameStatus = (state, status, selectedCardIndex, oldCardIndex = -1) => {
  let cards = state.cards;
  let selectedCard = cards[selectedCardIndex];
  let oldCard = cards[oldCardIndex];
  let cardsToWin = state.cardsToWin;
  let isLevelStarted = state.isLevelStarted;

  if (status ===  'opened') {
    selectedCard.status = 'opened';
    cards = cards.slice(0, selectedCardIndex).concat([selectedCard, ...cards.slice(selectedCardIndex + 1)]);
    isLevelStarted = true;
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
  return { cards, cardsToWin, isLevelStarted };
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
      return { ...state, player: action.player, isGameStarted: true, cards, cardsToWin: cards.length }
    };
    case actionTypes.END_GAME: {
      console.log('Your scores: ' + state.score.join(", "));
      return { ...initState, player: action.player };
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
        isLevelStarted: false
      };
    }
    case actionTypes.RESET_LEVEL: {
      return {...state, isLevelStarted: false, cards: createCards(state.level, state.coverColor), cardsToWin: cards.length };
    }
    case actionTypes.END_LEVEL: {
      return {...state, score: [...state.score, action.timer]};
    }

    case actionTypes.CHANGE_CARD_STATUS: {
      const { cards, cardsToWin, isLevelStarted } = updateGameStatus(state, action.status, action.selectedCardIndex, action.oldCardindex);
      return { ...state, cards, cardsToWin, isLevelStarted };
    }
    default:
      return state;
  }
};

export default gameReducer;
