import {ILoadLocalSettingsData,
  IChangeVolume,
  IChangeHotkey,
  IChangeBgColor,
  ITogglePattern,
  EActionTypes,
  ISetDefaultSettings,} from '../entities';

export const loadLocalSettingsData = (data: ILoadLocalSettingsData['data']): ILoadLocalSettingsData => ({
  type: EActionTypes.LOAD_LOCAL_SETTINGS_DATA,
  data,
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
