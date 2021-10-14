import { TGameActionTypes, IGame } from './game/entities';
import { TSettingsActionTypes, ISettings } from './settings/entities';

export interface IState {
  game: IGame;
  settings: ISettings;
}

export type TActionTypes = TGameActionTypes | TSettingsActionTypes;
