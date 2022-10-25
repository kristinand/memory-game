import { IGame } from 'store/game/slice';
import { ISettings } from 'store/settings/slice';
import { ECardStatus } from './enums';

export interface IKeys {
  music: string;
  sounds: string;
  reload: string;
  fullscreen: string;
  pause: string;
}

export interface ICard {
  id: string;
  color: string;
  pattern: string;
  coverColor: string;
  status: ECardStatus;
  count: number;
}

export interface IPlayerData {
  game: Partial<IGame>;
  settings: Partial<ISettings>;
}
