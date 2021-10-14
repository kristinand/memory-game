import { ActionCreator, Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { IGame } from 'entities/';
import {
  ILoadLocalGameData,
  IStartGame,
  ILogin,
  ILogout,
  ILoadLevel,
  ISetIsGamePaused,
  IChangeCardStatus,
  ISaveScore,
  ISetAutoplay,
  EActionTypes,
} from './actionTypes';
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
  (dispatch: Dispatch): void => {
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

export const loadLevel = (param = ''): ILoadLevel => ({
  type: EActionTypes.LOAD_LEVEL,
  param,
});

export const setIsGamePaused = (isPaused: ISetIsGamePaused['isPaused']): ISetIsGamePaused => ({
  type: EActionTypes.CHANGE_PAUSE_STATUS,
  isPaused,
});

export const changeCardStatus = (
  status: IChangeCardStatus['status'],
  selectedCardIndex: IChangeCardStatus['selectedCardIndex'],
  oldCardIndex?: IChangeCardStatus['oldCardIndex'],
): IChangeCardStatus => ({
  type: EActionTypes.CHANGE_CARD_STATUS,
  status,
  selectedCardIndex,
  oldCardIndex,
});

export const saveScore = (timer: ISaveScore['timer']): ISaveScore => ({
  type: EActionTypes.SAVE_SCORE,
  timer,
});

export const setAutoplay = (value: ISetAutoplay['value']): ISetAutoplay => ({
  type: EActionTypes.AUTOPLAY,
  value,
});
