import { ECardStatus, ICard } from 'entities/';

export interface IGame {
  player: string;
  isGamePaused: boolean;
  isAutoplay: boolean;
  level: number;
  cards: ICard[];
  cardsToWin: number;
  score: number;
}

export enum EActionTypes {
  LOAD_LOCAL_GAME_DATA = 'LOAD_LOCAL_GAME_DATA',

  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',

  START_GAME = 'START_GAME',
  END_GAME = 'END_GAME',

  LOAD_LEVEL = 'LOAD_LEVEL',
  CHANGE_CARD_STATUS = 'CHANGE_CARD_STATUS',
  CHANGE_PAUSE_STATUS = 'CHANGE_PAUSE_STATUS',
  SAVE_SCORE = 'SAVE_SCORE',
  AUTOPLAY = 'AUTOPLAY',
}

export interface IStartGame {
  type: typeof EActionTypes.START_GAME;
}

export interface IEndGame {
  type: typeof EActionTypes.END_GAME;
}

export interface ILoadLevel {
  type: typeof EActionTypes.LOAD_LEVEL;
}

export interface IChangeCardStatus {
  type: typeof EActionTypes.CHANGE_CARD_STATUS;

  status: ECardStatus;
  selectedCard: ICard;
  oldCard?: ICard;
}

export interface ISetIsGamePaused {
  type: typeof EActionTypes.CHANGE_PAUSE_STATUS;

  isPaused: boolean;
}

export interface ILoadLocalGameData {
  type: typeof EActionTypes.LOAD_LOCAL_GAME_DATA;

  data: IGame;
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

export type TGameActionTypes =
  | IStartGame
  | IEndGame
  | ILoadLevel
  | IChangeCardStatus
  | ISetIsGamePaused
  | ILoadLocalGameData
  | ISaveScore
  | ILogin
  | ILogout
  | ISetAutoplay;
