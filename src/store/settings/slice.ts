import { createSlice } from '@reduxjs/toolkit';

import { IKeys } from 'types';
import { RootState } from 'store';

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

interface IChangeHotkey {
  keyType: keyof IKeys;
  key: string;
}

interface IChangeVolume {
  audio: string;
  volume: number;
}

const systemTheme =
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? ETheme.dark
    : ETheme.light;

const initialState: ISettings = {
  isSystemTheme: true,
  theme: systemTheme,
  isPatternShown: true,
  musicVolume: 0.5,
  soundVolume: 0.5,
  keys: {
    music: 'M',
    sounds: 'S',
    reload: 'R',
    fullscreen: 'F',
    pause: 'P',
  },
};

export const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    loadLocalSettingsData(state, { payload }: { payload: Partial<ISettings> }) {
      return { ...state, ...payload };
    },
    changeVolume(state, { payload }: { payload: IChangeVolume }) {
      state[`${payload.audio}Volume`] = payload.volume;
    },
    changeHotkey(state, { payload }: { payload: IChangeHotkey }) {
      state.keys[payload.keyType] = payload.key;
    },
    changeTheme(state, { payload }: { payload: ETheme }) {
      state.theme = payload;
    },
    togglePattern(state) {
      state.isPatternShown = !state.isPatternShown;
    },
    applySystemTheme(state) {
      state.isSystemTheme = !state.isSystemTheme;
      state.theme = systemTheme;
    },
    setDefaultSettings() {
      return initialState;
    },
  },
});

export const {
  loadLocalSettingsData,
  changeVolume,
  changeHotkey,
  changeTheme,
  togglePattern,
  applySystemTheme,
  setDefaultSettings,
} = slice.actions;

export const selectTheme = (state: RootState): ETheme => state.settings.theme;
export const selectSettings = (state: RootState): ISettings => state.settings;

export default slice.reducer;
