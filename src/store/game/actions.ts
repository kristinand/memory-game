import { ActionCreator, Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import {
  ILoadLocalGameData,
  IEndGame,
  IStartGame,
  ILogin,
  ILogout,
  ILoadLevel,
  ISetIsGamePaused,
  IChangeCardStatus,
  ISaveScore,
  ISetAutoplay,
  EActionTypes,
  IGame,
} from './entities';
import api from '../../api/api';

export type AppThunk = ActionCreator<ThunkAction<void, IGame, null, Action<string>>>;

export const loadLocalGameData = (
  player: ILoadLocalGameData['player'],
  data: ILoadLocalGameData['data'],
): ILoadLocalGameData => ({
  type: EActionTypes.LOAD_LOCAL_GAME_DATA,
  player,
  data,
});

export const startGame = (): IStartGame => ({
  type: EActionTypes.START_GAME,
});

export const endGame =
  (player: string, score: number) =>
  (dispatch: Dispatch<IEndGame>): void => {
    api
      .saveScore({ player, score })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      })
      .finally(() => {
        dispatch({
          type: EActionTypes.END_GAME,
        });
      });
  };

export const login = (player: ILogin['player']): ILogin => ({
  type: EActionTypes.LOGIN,
  player,
});

export const logout = (): ILogout => ({
  type: EActionTypes.LOGOUT,
});

export const loadNextLevel = (): ILoadLevel => ({
  type: EActionTypes.LOAD_LEVEL,
});

export const setIsGamePaused = (isPaused: ISetIsGamePaused['isPaused']): ISetIsGamePaused => ({
  type: EActionTypes.CHANGE_PAUSE_STATUS,
  isPaused,
});

export const changeCardStatus = (
  status: IChangeCardStatus['status'],
  selectedCard: IChangeCardStatus['selectedCard'],
  oldCard?: IChangeCardStatus['oldCard'],
): IChangeCardStatus => ({
  type: EActionTypes.CHANGE_CARD_STATUS,
  status,
  selectedCard,
  oldCard,
});

export const saveScore = (timer: ISaveScore['timer']): ISaveScore => ({
  type: EActionTypes.SAVE_SCORE,
  timer,
});

export const setAutoplay = (value: ISetAutoplay['value']): ISetAutoplay => ({
  type: EActionTypes.AUTOPLAY,
  value,
});
