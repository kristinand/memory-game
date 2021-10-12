import { ECardStatus } from 'entities/enums';
import { IGameData, ISettings, IKeys } from 'entities/interfaces';

export enum EActionTypes {
  LOAD_LOCAL_GAME_DATA = 'LOAD_LOCAL_GAME_DATA',
  LOAD_LOCAL_SETTINGS_DATA = 'LOAD_LOCAL_SETTINGS_DATA',

  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',

  START_GAME = 'START_GAME',
  END_GAME = 'END_GAME',

  LOAD_LEVEL = 'LOAD_LEVEL',
  SAVE_SCORE = 'SAVE_SCORE',

  AUTOPLAY = 'AUTOPLAY',

  CHANGE_CARD_STATUS = 'CHANGE_CARD_STATUS',
  CHANGE_PAUSE_STATUS = 'CHANGE_PAUSE_STATUS',
  CHANGE_VOLUME = 'CHANGE_VOLUME',
  CHANGE_HOTKEY = 'CHANGE_HOTKEY',
  CHANGE_BG_COLOR = 'CHANGE_BG_COLOR',
  TOGGLE_PATTERN = 'TOGGLE_PATTERN',
  SET_DEFAULT_SETTINGS = 'SET_DEFAULT_SETTINGS',
}

export interface IStartGame {
  type: typeof EActionTypes.START_GAME;
}

export interface IEndGame {
  type: typeof EActionTypes.END_GAME;
}

export interface ILoadLevel {
  type: typeof EActionTypes.LOAD_LEVEL;
  param: string;
}

export interface IChangeCardStatus {
  type: typeof EActionTypes.CHANGE_CARD_STATUS;
  status: ECardStatus;
  selectedCardIndex: number;
  oldCardIndex?: number;
}

export interface IChangeVolume {
  type: typeof EActionTypes.CHANGE_VOLUME;
  audio: string;
  volume: number;
}

export interface ISetIsGamePaused {
  type: typeof EActionTypes.CHANGE_PAUSE_STATUS;
  isPaused: boolean;
}

export interface ILoadLocalGameData {
  type: typeof EActionTypes.LOAD_LOCAL_GAME_DATA;
  player: string;
  data: IGameData;
}

export interface ILoadLocalSettingsData {
  type: typeof EActionTypes.LOAD_LOCAL_SETTINGS_DATA;
  data: ISettings;
}

export interface IChangeHotkey {
  type: typeof EActionTypes.CHANGE_HOTKEY;
  keyType: keyof IKeys;
  value: string;
}

export interface ISetDefaultSettings {
  type: typeof EActionTypes.SET_DEFAULT_SETTINGS;
}

export interface IChangeBgColor {
  type: typeof EActionTypes.CHANGE_BG_COLOR;
  bgColor: string;
}

export interface ITogglePattern {
  type: typeof EActionTypes.TOGGLE_PATTERN;
}

export interface ISaveScore {
  type: typeof EActionTypes.SAVE_SCORE;
  timer: number;
}

export interface ILogin {
  type: typeof EActionTypes.LOGIN;
  player: string;
}

export interface ILogout {
  type: typeof EActionTypes.LOGOUT;
}

export interface ISetAutoplay {
  type: typeof EActionTypes.AUTOPLAY;
  value: boolean;
}

export type TActionTypes =
  | ILoadLevel
  | IChangeCardStatus
  | IStartGame
  | IEndGame
  | IChangeVolume
  | ISetIsGamePaused
  | ILoadLocalGameData
  | ILoadLocalSettingsData
  | IChangeHotkey
  | ISetDefaultSettings
  | ITogglePattern
  | IChangeBgColor
  | ITogglePattern
  | ISaveScore
  | ILogin
  | ILogout
  | ISetAutoplay;
