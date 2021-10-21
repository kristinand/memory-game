import { ECardStatus } from './enums';

export interface IGameData {
  level: number;
  cards: ICard[];
  cardsToWin: number;
  score: number;
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
  pairKey: string;
  color: string;
  pattern: string;
  coverColor: string;
  status: ECardStatus;
  count: number;
}

export interface IRating {
  _id: string;
  player: string;
  date: string;
  score: number;
}
