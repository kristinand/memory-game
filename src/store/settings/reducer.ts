import { Reducer } from 'redux';
import { TSettingsActionTypes, EActionTypes, ISettings, ETheme } from './entities';

const initState: ISettings = {
  theme: ETheme.light,
  isPatternShown: true,
  musicVolume: 0.5,
  soundVolume: 0.5,
  // TODO: volume: {
  //   music: 0.5,
  //   sounds: 0.5,
  // },
  keys: {
    music: 'm',
    sounds: 's',
    reload: 'r',
    fullscreen: 'f',
    pause: 'p',
  },
};

const settingsReducer: Reducer<ISettings, TSettingsActionTypes> = (state = initState, action) => {
  switch (action.type) {
    case EActionTypes.LOAD_LOCAL_SETTINGS_DATA:
      return action.data;
    case EActionTypes.CHANGE_VOLUME:
      return { ...state, [`${action.audio}Volume`]: action.volume };
    case EActionTypes.CHANGE_HOTKEY:
      return { ...state, keys: { ...state.keys, [action.keyType]: action.value } };
    case EActionTypes.CHANGE_THEME:
      return { ...state, theme: action.theme };
    case EActionTypes.TOGGLE_PATTERN:
      return { ...state, isPatternShown: !state.isPatternShown };
    case EActionTypes.SET_DEFAULT_SETTINGS:
      return initState;

    default:
      return state;
  }
};

export default settingsReducer;
