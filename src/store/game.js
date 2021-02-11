import * as actionTypes from './actionTypes';
import { shuffleList, generateRandomColor, fillCards } from '../utils/functions';

const initState = {
  level: 1,
  cards: [],
  coverColor: generateRandomColor(40, 40, 60, 60),
  cardsToWin: 1,
};

const updateCardStatus = (state, status, selectedCardIndex, oldCardIndex = -1) => {
  let cards = state.cards;
  let selectedCard = cards[selectedCardIndex];
  let oldCard = cards[oldCardIndex];
  let cardsToWin = state.cardsToWin;

  if (status ===  'opened') {
    selectedCard.status = 'opened';
    cards = cards.slice(0, selectedCardIndex).concat([selectedCard, ...cards.slice(selectedCardIndex + 1)]);
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
  return { cards, cardsToWin };
};

const gameReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_LEVEL: {
      let level = state.level;
      if (action.param === 'inc' && level < 5) {
        level += 1;
      } else if (action.param === 'dec' && level > 1) {
        level -= 1;
      }
      const coverColor = generateRandomColor(40, 40, 60, 60);
      return { ...state, level, coverColor };
    }
    case actionTypes.LOAD_LEVEL: {
      let cards = [];
      cards = fillCards(cards, state.level, state.coverColor);
      cards = shuffleList(cards);

      return { ...state, cards: cards, cardsToWin: cards.length };
    }
    case actionTypes.CHANGE_CARD_STATUS: {
      const {cards, cardsToWin} = updateCardStatus(state, action.status, action.selectedCardIndex, action.oldCardindex);
      return { ...state, cards, cardsToWin };
    }
    default:
      return state;
  }
};

export default gameReducer;
