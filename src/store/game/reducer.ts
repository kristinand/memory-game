/* eslint-disable @typescript-eslint/no-use-before-define */
import { Reducer } from 'redux';
import { getRandomColor } from 'utils/functions';
import { TGameActionTypes, EActionTypes, IGame } from './entities';
import { createCards, updateCardStatus, loadNextLevel } from './functions';

const initState: IGame = {
  level: 1,
  coverColor: getRandomColor(),
  cards: createCards(1, getRandomColor()),
  cardsToWin: 2 * (1 * 2 + 2),
  isGamePaused: true,
  isLoggedIn: false,
  isAutoplay: false,
  player: '',
  score: 0,
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

    case EActionTypes.START_GAME:{
      localStorage.removeItem('gameData');
      return { ...initState, player: state.player, isLoggedIn: true };
    }
    case EActionTypes.END_GAME: {
      localStorage.removeItem('gameData');
      return { ...initState, player: state.player, isLoggedIn: true };
    }

    case EActionTypes.LOAD_LEVEL:
      return loadNextLevel(state);
    case EActionTypes.SAVE_SCORE:
      return { ...state, score: action.timer };
    case EActionTypes.AUTOPLAY:
      return { ...state, isAutoplay: action.value };
    case EActionTypes.CHANGE_PAUSE_STATUS:
      return { ...state, isGamePaused: action.isPaused };
    case EActionTypes.CHANGE_CARD_STATUS:
      return updateCardStatus(state, action);

    default:
      return state;
  }
};

export default gameReducer;
