import { ECardStatus } from './enums';

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
