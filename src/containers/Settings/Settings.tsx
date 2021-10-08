import React, { ElementType, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Switch from '@material-ui/core/Switch';

import Reset from 'assets/icons/reset.svg';
import menuSound from 'assets/menu-click.opus';
import Header from '../../components/Header/Header';
import IconButton from '../../components/IconButton/IconButton';

import { IState, ISettings, IKeys } from '../../entities/interfaces';
import * as actions from '../../store/actions';
import classes from './Settings.css';

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((store: IState) => store.settings);
  const [bgColor, setBgColor] = useState(state.bgColor);
  const sound = new Audio(menuSound);

  const setLocalStorageSettingsItem = (obj: Partial<ISettings>) => {
    const settingsData = { ...state, obj };
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

  const onBgColorChangeHandler = (value: string) => {
    if (value[0] !== '#' || value.length > 7) return;
    setBgColor(value);

    if (value.length === 7 || value.length === 4) {
      dispatch(actions.changeBgColor(value));
      setLocalStorageSettingsItem({ bgColor: value });
    }
  };

  const onToggleCardPatternHandler = () => {
    dispatch(actions.togglePattern());
    setLocalStorageSettingsItem({ isPatternShown: !state.isPatternShown });
  };

  return (
    <>
      <Header title="Game Settings" />
      <div className={classes.Settings}>
        <div className={classes.settingsElement}>
          <span>HEX Background Color</span>
          <div className={classes.inputContainer}>
            <input
              className={classes.input}
              type="text"
              onChange={(event) => onBgColorChangeHandler(event.target.value)}
              value={bgColor}
            />
          </div>
        </div>
        <div className={classes.settingsElement}>
          <span>Music Volume</span>
          <div className={classes.inputContainer}>
            <input
              className={classes.input}
              type="number"
              onChange={(event) => onVolumeChangeHandler('music', event.target.valueAsNumber)}
              value={state.musicVolume}
              max={1}
              min={0}
              step={0.1}
            />
          </div>
        </div>
        <div className={classes.settingsElement}>
          <span>Sounds Volume</span>
          <div className={classes.inputContainer}>
            <input
              className={classes.input}
              type="number"
              onChange={(event) => onVolumeChangeHandler('sound', event.target.valueAsNumber)}
              value={state.soundVolume}
              max={1}
              min={0}
              step={0.1}
            />
          </div>
        </div>
        <div className={classes.settingsElement}>
          <span>Pause Hotkey</span>
          <div className={classes.inputContainer}>
            <input
              className={classes.input}
              type="text"
              onChange={(event) => onHotkeyChangeHandler('pause', event.target.value)}
              value={state.keys.pause}
            />
          </div>
        </div>
        <div className={classes.settingsElement}>
          <span>Reload Game Hotkey</span>
          <div className={classes.inputContainer}>
            <input
              className={classes.input}
              type="text"
              onChange={(event) => onHotkeyChangeHandler('reload', event.target.value)}
              value={state.keys.reload}
            />
          </div>
        </div>
        <div className={classes.settingsElement}>
          <span>Toggle Fullscreen Hotkey</span>
          <div className={classes.inputContainer}>
            <input
              className={classes.input}
              type="text"
              onChange={(event) => onHotkeyChangeHandler('fullscreen', event.target.value)}
              value={state.keys.fullscreen}
            />
          </div>
        </div>
        <div className={classes.settingsElement}>
          <span>Music Volume Hotkey</span>
          <div className={classes.inputContainer}>
            <input
              className={classes.input}
              type="text"
              onChange={(event) => onHotkeyChangeHandler('music', event.target.value)}
              value={state.keys.music}
            />
          </div>
        </div>
        <div className={classes.settingsElement}>
          <span>Sounds Volume Hotkey</span>
          <div className={classes.inputContainer}>
            <input
              className={classes.input}
              type="text"
              onChange={(event) => onHotkeyChangeHandler('sounds', event.target.value)}
              value={state.keys.sounds}
            />
          </div>
        </div>
        <div className={classes.settingsElement}>
          <span>Card Pattern Enabled</span>
          <div className={classes.inputContainer}>
            <Switch checked={state.isPatternShown} onChange={onToggleCardPatternHandler} color="default" />
          </div>
        </div>
      </div>

      <div className={classes.buttonWrapper}>
        <IconButton onClick={setDefaultSettingsHandler} component={Reset as ElementType} text="Set Default" />
      </div>
    </>
  );
};

export default Settings;
