import { Reducer } from 'redux';
import { ISettings } from 'entities/interfaces';
import { TActionTypes, EActionTypes } from '../entities';

const initState: ISettings = {
  bgColor: '#f8ebc6',
  isPatternShown: true,
  musicVolume: 0.5,
  soundVolume: 0.5,
  // volume: {
  //   music: 0.5,
  //   sound: 0.5,
  // },
  keys: {
    music: 'm',
    sounds: 's',
    reload: 'r',
    fullscreen: 'f',
    pause: 'p',
  },
};

const changeVolume = (state, action): ISettings => {
  let newState;
  if (action.audio === 'music') {
    newState = { ...state, musicVolume: action.volume };
  } else {
    newState = { ...state, soundVolume: action.volume };
  }
  return newState;
};

const changeHotkey = (state, action): ISettings => {
  const { keyType, value: keyValue } = action;
  return { ...state, keys: { ...state.keys, [keyType]: keyValue } };
};

const settingsReducer: Reducer<ISettings, TActionTypes> = (state = initState, action) => {
  switch (action.type) {
    case EActionTypes.LOAD_LOCAL_SETTINGS_DATA:
      return action.data;
    case EActionTypes.CHANGE_VOLUME:
      return changeVolume(state, action);
    case EActionTypes.CHANGE_HOTKEY:
      return changeHotkey(state, action);
    case EActionTypes.CHANGE_BG_COLOR:
      return { ...state, bgColor: action.bgColor };
    case EActionTypes.TOGGLE_PATTERN:
      return { ...state, isPatternShown: !state.isPatternShown };
    case EActionTypes.SET_DEFAULT_SETTINGS:
      return initState;

    default:
      return state;
  }
};

export default settingsReducer;
