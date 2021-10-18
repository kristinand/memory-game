import { IKeys } from 'entities/';

export enum ETheme {
  light = 'light',
  dark = 'dark',
}

export interface ISettings {
  isSystemTheme: boolean;
  theme: ETheme;
  isPatternShown: boolean;
  musicVolume: number;
  soundVolume: number;
  keys: IKeys;
}

export enum EActionTypes {
  LOAD_LOCAL_SETTINGS_DATA = 'LOAD_LOCAL_SETTINGS_DATA',

  CHANGE_VOLUME = 'CHANGE_VOLUME',
  CHANGE_HOTKEY = 'CHANGE_HOTKEY',
  CHANGE_THEME = 'CHANGE_THEME',
  TOGGLE_PATTERN = 'TOGGLE_PATTERN',
  SET_DEFAULT_SETTINGS = 'SET_DEFAULT_SETTINGS',
  USE_SYSTEM_THEME = 'USE_SYSTEM_THEME',
}

export interface ILoadLocalSettingsData {
  type: typeof EActionTypes.LOAD_LOCAL_SETTINGS_DATA;
  data: Partial<ISettings>;
}

export interface IChangeHotkey {
  type: typeof EActionTypes.CHANGE_HOTKEY;
  keyType: keyof IKeys;
  value: string;
}

export interface ISetDefaultSettings {
  type: typeof EActionTypes.SET_DEFAULT_SETTINGS;
}

export interface IChangeTheme {
  type: typeof EActionTypes.CHANGE_THEME;
  theme: ETheme;
}

export interface ITogglePattern {
  type: typeof EActionTypes.TOGGLE_PATTERN;
}

export interface IUseSystemTheme {
  type: typeof EActionTypes.USE_SYSTEM_THEME;
}

export interface IChangeVolume {
  type: typeof EActionTypes.CHANGE_VOLUME;
  audio: string;
  volume: number;
}

export type TSettingsActionTypes =
  | ILoadLocalSettingsData
  | IChangeHotkey
  | ISetDefaultSettings
  | ITogglePattern
  | IChangeTheme
  | IChangeVolume
  | ITogglePattern
  | IUseSystemTheme;
