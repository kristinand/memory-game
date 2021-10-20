/* eslint-disable @typescript-eslint/no-use-before-define */
import { Reducer } from 'redux';
import { getRandomColor } from 'utils/functions';
import { TGameActionTypes, EActionTypes, IGame } from './entities';
import { updateCardStatus, loadNextLevel, startGame } from './functions';

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

    case EActionTypes.START_GAME:
      return startGame(state, initState);
    case EActionTypes.END_GAME: {
      localStorage.removeItem('gameData');
      return { ...state, isGameEnded: true };
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
