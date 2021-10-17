import React, { ElementType } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import Reset from 'assets/icons/reset.svg';
import menuSound from 'assets/menu-click.opus';
import Layout from 'components/Layout';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Button from 'components/Button';
import SettingsElement from 'components/SettingsElement';

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
    const settings = { ...state, ...obj };
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

  const onHotkeyChangeHandler = (keyType: keyof IKeys, value: string) => {
    const newHotkey = value.slice(-1);
    if (!Object.values(state.keys).includes(newHotkey)) {
      dispatch(actions.changeHotkey(keyType, newHotkey));
      setLocalStorageSettingsItem({
        keys: {
          ...state.keys,
          [keyType]: newHotkey,
        },
      });
    }
  };

  const onThemeChangeHandler = (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (!state.isSystemTheme) {
      const theme = checked ? ETheme.dark : ETheme.light;
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
            value={state.musicVolume}
          />
          <SettingsElement
            title="Sounds Volume"
            onChange={(event) => onVolumeChangeHandler('sound', (event.target as HTMLInputElement).valueAsNumber)}
            value={state.soundVolume}
          />
          <SettingsElement
            title="Pause Hotkey"
            onChange={(event) => onHotkeyChangeHandler('pause', (event.target as HTMLInputElement).value)}
            value={state.keys.pause}
          />
          <SettingsElement
            title="Reload Game Hotkey"
            onChange={(event) => onHotkeyChangeHandler('reload', (event.target as HTMLInputElement).value)}
            value={state.keys.reload}
          />
          <SettingsElement
            title="Toggle Fullscreen Hotkey"
            onChange={(event) => onHotkeyChangeHandler('fullscreen', (event.target as HTMLInputElement).value)}
            value={state.keys.fullscreen}
          />
          <SettingsElement
            title="Music Volume Hotkey"
            onChange={(event) => onHotkeyChangeHandler('music', (event.target as HTMLInputElement).value)}
            value={state.keys.music}
          />
          <SettingsElement
            title="Sounds Volume Hotkey"
            onChange={(event) => onHotkeyChangeHandler('sounds', (event.target as HTMLInputElement).value)}
            value={state.keys.sounds}
          />
          <SettingsElement
            title="Card Pattern Enabled"
            value={state.isPatternShown}
            onChange={onToggleCardPatternHandler}
          />
          <SettingsElement title="Use System Theme" value={state.isSystemTheme} onChange={onUseSystemThemeHandler} />
          {!state.isSystemTheme && (
            <SettingsElement
              title="Dark Theme Enabled"
              value={state.theme === ETheme.dark}
              onChange={onThemeChangeHandler}
            />
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
