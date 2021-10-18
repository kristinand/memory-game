import React, { ElementType } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Reset from 'assets/icons/reset.svg';
import menuSound from 'assets/menu-click.opus';
import Layout from 'components/Layout';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Button from 'components/Button';
import SettingsElement from 'components/SettingsElement';

import { getLocalStorageValue } from 'utils/functions';
import { IKeys } from 'entities/';
import { IState } from 'store/entities';
import { ISettings, ETheme } from 'store/settings/entities';
import * as actions from 'store/settings/actions';
import classes from './classes.module.scss';

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((store: IState) => store.settings);
  const sound = new Audio(menuSound);

  const setLocalStorageSettingsItem = (obj: Partial<ISettings>) => {
    let settings = getLocalStorageValue('settings') as Partial<ISettings>;
    settings = { ...settings, ...obj };
    localStorage.setItem('settings', JSON.stringify(settings));
  };

  const setDefaultSettingsHandler = () => {
    dispatch(actions.setDefaultSettings());
    localStorage.removeItem('settings');
  };

  const onVolumeChangeHandler = (type: string, value: number) => {
    if (value >= 0 && value <= 1) {
      sound.volume = value;
      sound.currentTime = 0;
      void sound.play();

      dispatch(actions.changeVolume(type, value));
      setLocalStorageSettingsItem({ [type.concat('Volume')]: value });
    }
  };

  const onHotkeyChangeHandler = (type: keyof IKeys, { code }: React.KeyboardEvent<HTMLInputElement>) => {
    const key = code.slice(3);
    if (!Object.values(state.keys).includes(key) && code.startsWith('Key')) {
      dispatch(actions.changeHotkey(type, key));
      setLocalStorageSettingsItem({
        keys: {
          ...state.keys,
          [type]: key,
        },
      });
    }
  };

  const onThemeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!state.isSystemTheme) {
      const theme = event.target.checked ? ETheme.dark : ETheme.light;
      dispatch(actions.changeTheme(theme));
      setLocalStorageSettingsItem({ theme });
    }
  };

  const onToggleCardPatternHandler = () => {
    dispatch(actions.togglePattern());
    setLocalStorageSettingsItem({ isPatternShown: !state.isPatternShown });
  };

  const onUseSystemThemeHandler = () => {
    dispatch(actions.useSystemTheme());
    setLocalStorageSettingsItem({ isSystemTheme: !state.isSystemTheme });
  };

  return (
    <>
      <Header title="Game Settings" />
      <Layout>
        <div className={classes.table}>
          <SettingsElement
            title="Music Volume"
            onChange={(event) => onVolumeChangeHandler('music', (event.target as HTMLInputElement).valueAsNumber)}
            val={state.musicVolume}
          />
          <SettingsElement
            title="Sounds Volume"
            onChange={(event) => onVolumeChangeHandler('sound', (event.target as HTMLInputElement).valueAsNumber)}
            val={state.soundVolume}
          />
          <SettingsElement
            title="Pause Hotkey"
            onKeyPress={(event) => onHotkeyChangeHandler('pause', event)}
            val={state.keys.pause}
          />
          <SettingsElement
            title="Reload Game Hotkey"
            onKeyPress={(event) => onHotkeyChangeHandler('reload', event)}
            val={state.keys.reload}
          />
          <SettingsElement
            title="Toggle Fullscreen Hotkey"
            onKeyPress={(event) => onHotkeyChangeHandler('fullscreen', event)}
            val={state.keys.fullscreen}
          />
          <SettingsElement
            title="Music Volume Hotkey"
            onKeyPress={(event) => onHotkeyChangeHandler('music', event)}
            val={state.keys.music}
          />
          <SettingsElement
            title="Sounds Volume Hotkey"
            onKeyPress={(event) => onHotkeyChangeHandler('sounds', event)}
            val={state.keys.sounds}
          />
          <SettingsElement title="Show Card Pattern" val={state.isPatternShown} onChange={onToggleCardPatternHandler} />
          <SettingsElement title="System Theme" val={state.isSystemTheme} onChange={onUseSystemThemeHandler} />
          {!state.isSystemTheme && (
            <SettingsElement title="Dark Theme" val={state.theme === ETheme.dark} onChange={onThemeChangeHandler} />
          )}
        </div>

        <Button className={classes.button} onClick={setDefaultSettingsHandler} icon={Reset as ElementType}>
          Set Default
        </Button>
      </Layout>
      <Footer />
    </>
  );
};

export default Settings;
