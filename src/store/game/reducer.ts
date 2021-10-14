import { Reducer } from 'redux';
import { getRandomColor, createCards } from 'utils/functions';
import { IGame, ECardStatus } from 'entities/';
import { IChangeCardStatus, TGameActionTypes, EActionTypes } from './entites';

const initState: IGame = {
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
};

const gameReducer: Reducer<IGame, TGameActionTypes> = (state = initState, action) => {
  switch (action.type) {
    case EActionTypes.LOAD_LOCAL_GAME_DATA: {
      const { data, player } = action;
      return {
        ...state,
        ...data,
        player,
        isLoggedIn: player !== undefined,
      };
    }

    case EActionTypes.LOGIN:
      return { ...state, player: action.player, isLoggedIn: true };
    case EActionTypes.LOGOUT:
      return { ...state, player: '', isLoggedIn: false };

    case EActionTypes.START_GAME: {
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
    }
    case EActionTypes.END_GAME: {
      localStorage.removeItem('gameData');
      return { ...state, isGameEnded: true };
    }

    case EActionTypes.LOAD_LEVEL: {
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
    }
    case EActionTypes.SAVE_SCORE:
      return { ...state, score: action.timer };
    case EActionTypes.AUTOPLAY:
      return { ...state, isAutoplay: action.value };
    case EActionTypes.CHANGE_PAUSE_STATUS:
      return { ...state, isGamePaused: action.isPaused };
    case EActionTypes.CHANGE_CARD_STATUS:
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return updateGameStatus(state, action);

    default:
      return state;
  }
};

const updateGameStatus = (state: IGame, action: IChangeCardStatus): IGame => {
  const { selectedCardIndex, oldCardIndex, status } = action;
  let { cards, cardsToWin } = state;
  const selectedCard = cards[selectedCardIndex];
  const oldCard = cards[oldCardIndex];

  // in case of all statuses, selected card:
  cards = cards.slice(0, selectedCardIndex).concat([selectedCard, ...cards.slice(selectedCardIndex + 1)]);
  selectedCard.status = status;

  // opened can be only one card
  if (status !== ECardStatus.Opened) {
    cards = cards.slice(0, oldCardIndex).concat([oldCard, ...cards.slice(oldCardIndex + 1)]);
    oldCard.status = status;
  }

  if (status === ECardStatus.Guessed) {
    cardsToWin -= 2;
  }
  return { ...state, cards, cardsToWin, isGamePaused: false };
};

export default gameReducer;
