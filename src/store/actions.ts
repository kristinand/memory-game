import { ActionCreator, Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { IState } from 'entities/interfaces';
import api from '../api/api';
import {ILoadLevel,
  IChangeCardStatus,
  IStartGame,
  IChangeVolume,
  ISetIsGamePaused,
  ILoadLocalGameData,
  ILoadLocalSettingsData,
  IChangeHotkey,
  ISetDefaultSettings,
  IChangeBgColor,
  ITogglePattern,
  ILogout,
  ILogin,
  ISaveScore,
  ISetAutoplay,
  EActionTypes,} from './entities';

export type AppThunk = ActionCreator<ThunkAction<void, IState, null, Action<string>>>;

export const loadLocalGameData = (
  player: ILoadLocalGameData['player'],
  data: ILoadLocalGameData['data'],
): ILoadLocalGameData => ({
  type: EActionTypes.LOAD_LOCAL_GAME_DATA,
  player,
  data,
});

export const loadLocalSettingsData = (data: ILoadLocalSettingsData['data']): ILoadLocalSettingsData => ({
  type: EActionTypes.LOAD_LOCAL_SETTINGS_DATA,
  data,
});

export const startGame = (): IStartGame => ({
  type: EActionTypes.START_GAME,
});

export const endGame =
  (player: string, score: number) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      await api.saveScore({ player, score });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
    dispatch({
      type: EActionTypes.END_GAME,
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

export const changeVolume = (audio: IChangeVolume['audio'], volume: IChangeVolume['volume']): IChangeVolume => ({
  type: EActionTypes.CHANGE_VOLUME,
  audio,
  volume,
});

export const changeHotkey = (keyType: IChangeHotkey['keyType'], value: IChangeHotkey['value']): IChangeHotkey => ({
  type: EActionTypes.CHANGE_HOTKEY,
  keyType,
  value,
});

export const changeBgColor = (bgColor: IChangeBgColor['bgColor']): IChangeBgColor => ({
  type: EActionTypes.CHANGE_BG_COLOR,
  bgColor,
});

export const togglePattern = (): ITogglePattern => ({
  type: EActionTypes.TOGGLE_PATTERN,
});

export const setDefaultSettings = (): ISetDefaultSettings => ({
  type: EActionTypes.SET_DEFAULT_SETTINGS,
});
