import { ECardStatus } from './enums';

export interface IState extends IGameData {
  isGamePaused: boolean;
  isGameEnded: boolean;
  isLoggedIn: boolean;
  isAutoplay: boolean;
  player: string;
  levels: number;
  settings: ISettings;
}

export interface IGameData {
  level: number;
  cards: ICard[];
  coverColor: string;
  cardsToWin: null | number;
  score: number;
}

export interface ISettings {
  bgColor: string;
  isPatternShown: boolean;
  musicVolume: number;
  soundVolume: number;
  keys: IKeys;
}

export interface IKeys {
  music: string;
  sounds: string;
  reload: string;
  fullscreen: string;
  pause: string;
}

export interface ICard {
  key: string;
  color: string;
  pattern: string;
  coverColor: string;
  status: ECardStatus;
}

export interface IRating {
  _id: string;
  player: string;
  date: string;
  score: number;
}
