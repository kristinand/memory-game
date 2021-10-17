import React, { ElementType } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import Switch from '@material-ui/core/Switch';

import Reset from 'assets/icons/reset.svg';
import menuSound from 'assets/menu-click.opus';
import Layout from 'components/Layout';
import Header from 'components/Header';
import Footer from 'components/Footer';
import IconButton from 'components/IconButton';

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
    const settingsData = { ...state, ...obj };
    localStorage.setItem('settingsData', JSON.stringify(settingsData));
  };

  const setDefaultSettingsHandler = () => {
    dispatch(actions.setDefaultSettings());
    localStorage.removeItem('settingsData');
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
    const theme = checked ? ETheme.dark : ETheme.light;
    dispatch(actions.changeTheme(theme));
    setLocalStorageSettingsItem({ theme });
  };

  const onToggleCardPatternHandler = () => {
    dispatch(actions.togglePattern());
    setLocalStorageSettingsItem({ isPatternShown: !state.isPatternShown });
  };

  return (
    <>
      <Header title="Game Settings" />
      <Layout>
        <div className={classes.table}>
          <div className={classes.tableRow}>
            <span>Music Volume</span>
            <div className={classes.inputContainer}>
              <input
                className={classNames(classes.input, classes[state.theme])}
                type="number"
                onChange={(event) => onVolumeChangeHandler('music', event.target.valueAsNumber)}
                value={state.musicVolume}
                max={1}
                min={0}
                step={0.1}
              />
            </div>
          </div>
          <div className={classes.tableRow}>
            <span>Sounds Volume</span>
            <div className={classes.inputContainer}>
              <input
                className={classNames(classes.input, classes[state.theme])}
                type="number"
                onChange={(event) => onVolumeChangeHandler('sound', event.target.valueAsNumber)}
                value={state.soundVolume}
                max={1}
                min={0}
                step={0.1}
              />
            </div>
          </div>
          <div className={classes.tableRow}>
            <span>Pause Hotkey</span>
            <div className={classes.inputContainer}>
              <input
                className={classNames(classes.input, classes[state.theme])}
                type="text"
                onChange={(event) => onHotkeyChangeHandler('pause', event.target.value)}
                value={state.keys.pause}
              />
            </div>
          </div>
          <div className={classes.tableRow}>
            <span>Reload Game Hotkey</span>
            <div className={classes.inputContainer}>
              <input
                className={classNames(classes.input, classes[state.theme])}
                type="text"
                onChange={(event) => onHotkeyChangeHandler('reload', event.target.value)}
                value={state.keys.reload}
              />
            </div>
          </div>
          <div className={classes.tableRow}>
            <span>Toggle Fullscreen Hotkey</span>
            <div className={classes.inputContainer}>
              <input
                className={classNames(classes.input, classes[state.theme])}
                type="text"
                onChange={(event) => onHotkeyChangeHandler('fullscreen', event.target.value)}
                value={state.keys.fullscreen}
              />
            </div>
          </div>
          <div className={classes.tableRow}>
            <span>Music Volume Hotkey</span>
            <div className={classes.inputContainer}>
              <input
                className={classNames(classes.input, classes[state.theme])}
                type="text"
                onChange={(event) => onHotkeyChangeHandler('music', event.target.value)}
                value={state.keys.music}
              />
            </div>
          </div>
          <div className={classes.tableRow}>
            <span>Sounds Volume Hotkey</span>
            <div className={classes.inputContainer}>
              <input
                className={classNames(classes.input, classes[state.theme])}
                type="text"
                onChange={(event) => onHotkeyChangeHandler('sounds', event.target.value)}
                value={state.keys.sounds}
              />
            </div>
          </div>
          <div className={classes.tableRow}>
            <span>Card Pattern Enabled</span>
            <div className={classes.inputContainer}>
              <Switch checked={state.isPatternShown} onChange={onToggleCardPatternHandler} color="default" />
            </div>
          </div>
          <div className={classes.tableRow}>
            <span>Activate Dark Theme</span>
            <div className={classes.inputContainer}>
              <Switch checked={state.theme === ETheme.dark} onChange={onThemeChangeHandler} color="default" />
            </div>
          </div>
        </div>

        <IconButton
          className={classes.button}
          onClick={setDefaultSettingsHandler}
          component={Reset as ElementType}
          text="Set Default"
        />
      </Layout>
      <Footer />
    </>
  );
};

export default Settings;
