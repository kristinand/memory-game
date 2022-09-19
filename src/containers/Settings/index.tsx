import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Reset from 'assets/icons/reset.svg';
import menuSound from 'assets/menu-click.opus';
import Layout from 'components/Layout';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Button from 'components/Button';
import SettingsElement from 'components/SettingsElement';

import { IKeys } from 'entities/';
import {
  selectSettings,
  ISettings,
  ETheme,
  setDefaultSettings,
  changeHotkey,
  changeTheme,
  changeVolume,
  useSystemTheme,
  togglePattern,
} from 'store/settings/slice';
import { usePlayerData } from 'utils/hooks';
import classes from './classes.module.scss';

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const { playerData, updatePlayerData, deletePlayerData } = usePlayerData();
  const { keys, isPatternShown, isSystemTheme, musicVolume, soundVolume, theme } = useSelector(selectSettings);
  const sound = new Audio(menuSound);

  const setLocalStorageSettingsItem = (obj: Partial<ISettings>) => {
    updatePlayerData({
      settings: {
        ...playerData?.settings,
        ...obj,
      },
    });
  };

  const setDefaultSettingsHandler = () => {
    dispatch(setDefaultSettings());
    deletePlayerData('settings');
  };

  const onVolumeChangeHandler = (audio: string, volume: number) => {
    if (volume >= 0 && volume <= 1) {
      sound.volume = volume;
      sound.currentTime = 0;
      void sound.play();

      dispatch(changeVolume({ audio, volume }));
      setLocalStorageSettingsItem({ [audio.concat('Volume')]: volume });
    }
  };

  const onHotkeyChangeHandler = (keyType: keyof IKeys, { code }: React.KeyboardEvent<HTMLInputElement>) => {
    const key = code.slice(3);
    if (!Object.values(keys).includes(key) && code.startsWith('Key')) {
      dispatch(changeHotkey({ keyType, key }));
      setLocalStorageSettingsItem({
        keys: {
          ...keys,
          [keyType]: key,
        },
      });
    }
  };

  const onThemeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isSystemTheme) {
      const selectedTheme = event.target.checked ? ETheme.dark : ETheme.light;
      dispatch(changeTheme(selectedTheme));
      setLocalStorageSettingsItem({ theme: selectedTheme });
    }
  };

  const onToggleCardPatternHandler = () => {
    dispatch(togglePattern());
    setLocalStorageSettingsItem({ isPatternShown: !isPatternShown });
  };

  const onUseSystemThemeHandler = () => {
    dispatch(useSystemTheme());
    setLocalStorageSettingsItem({ isSystemTheme: !isSystemTheme, theme: undefined });
  };

  return (
    <>
      <Header title="Game Settings" />
      <Layout>
        <div className={classes.table}>
          <SettingsElement
            title="Music Volume"
            onChange={(event) => onVolumeChangeHandler('music', (event.target as HTMLInputElement).valueAsNumber)}
            val={musicVolume}
          />
          <SettingsElement
            title="Sounds Volume"
            onChange={(event) => onVolumeChangeHandler('sound', (event.target as HTMLInputElement).valueAsNumber)}
            val={soundVolume}
          />
          <SettingsElement
            title="Pause Hotkey"
            onKeyPress={(event) => onHotkeyChangeHandler('pause', event)}
            val={keys.pause}
          />
          <SettingsElement
            title="Reload Game Hotkey"
            onKeyPress={(event) => onHotkeyChangeHandler('reload', event)}
            val={keys.reload}
          />
          <SettingsElement
            title="Toggle Fullscreen Hotkey"
            onKeyPress={(event) => onHotkeyChangeHandler('fullscreen', event)}
            val={keys.fullscreen}
          />
          <SettingsElement
            title="Music Volume Hotkey"
            onKeyPress={(event) => onHotkeyChangeHandler('music', event)}
            val={keys.music}
          />
          <SettingsElement
            title="Sounds Volume Hotkey"
            onKeyPress={(event) => onHotkeyChangeHandler('sounds', event)}
            val={keys.sounds}
          />
          <SettingsElement title="Show Card Pattern" val={isPatternShown} onChange={onToggleCardPatternHandler} />
          <SettingsElement title="System Theme" val={isSystemTheme} onChange={onUseSystemThemeHandler} />
          {!isSystemTheme && (
            <SettingsElement title="Dark Theme" val={theme === ETheme.dark} onChange={onThemeChangeHandler} />
          )}
        </div>

        <Button className={classes.button} onClick={setDefaultSettingsHandler} icon={<Reset />}>
          Set Default
        </Button>
      </Layout>
      <Footer />
    </>
  );
};

export default Settings;
