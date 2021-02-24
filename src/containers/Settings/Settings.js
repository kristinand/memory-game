import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import classes from './Settings.css';
import Header from '../../components/Header/Header';
import menuSound from '@assets/menu-click.opus';
import Reset from '@assets/icons/reset.svg';
import IconButton from '../../components/IconButton/IconButton';
import Switch from '@material-ui/core/Switch';

const Settings = () => {
  const sound = new Audio(menuSound);
  const state = useSelector((state) => state.settings);
  const [bgColor, setBgColor] = useState(state.bgColor);

  let settingsData = { ...state };
  const saveLocalData = (key, value) => {
    settingsData = {
      ...settingsData,
      [key]: value
    }
    localStorage.setItem('settingsData', JSON.stringify(settingsData));
  }

  const dispatch = useDispatch();

  const onVolumeChangeHandler = (type, value) => {
    if (value < 0 || value > 1 || isNaN(+value)) return;
    dispatch(actions.changeVolume(type, +value));
    sound.volume = value;
    sound.currentTime = 0;
    sound.play();
    saveLocalData(type + 'Volume', +value);
  };

  const onHotkeyChangeHandler = (keyType, value) => {
    if (value.length > 1) value = value.slice(1);
    if (Object.values(state.keys).includes(value)) return;
    dispatch(actions.changeHotkey(keyType, value));
    saveLocalData('keys', {
      ...state.keys,
      [keyType]: value,
    })
  };

  const setDefaultSettingsHandler = () => {
    dispatch(actions.setDefaultSettings());
    localStorage.removeItem('settingsData');
  };

  const changeBgColorHandler = (value) => {
    if (value[0] !== '#' || value.length > 7) return;
    setBgColor(value);
    if (value.length === 7 || value.length === 4) {
      dispatch(actions.changeBgColor(value));
    }
    saveLocalData('bgColor', value);
  };

  const onToggleCardPatternHandler = () => {
    dispatch(actions.togglePattern());
    saveLocalData('isPatternShown', !state.isPatternShown);
  }

  return (
    <Fragment>
      <Header title="Game Settings" />
      <div className={classes.Settings}>
        <div className={classes.settingsElement}>
          <span>HEX Background Color</span>
          <div className={classes.inputContainer}>
            <input
              className={classes.input}
              type="text"
              onChange={(event) => changeBgColorHandler(event.target.value)}
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
              onChange={(event) => onVolumeChangeHandler('music', event.target.value)}
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
              onChange={(event) => onVolumeChangeHandler('sound', event.target.value)}
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
            <Switch checked={state.isPatternShown} onChange={onToggleCardPatternHandler} color="default"/>
          </div>
        </div>
      </div>

      <div className={classes.buttonWrapper}>
        <IconButton onClick={setDefaultSettingsHandler} component={Reset} text="Set Default" />
      </div>
    </Fragment>
  );
};

export default Settings;
