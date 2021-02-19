import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import classes from './Settings.css';
import Header from '../../components/Header/Header';
import menuSound from '@assets/menu-click.opus';
import Reset from '@assets/icons/reset.svg';
import IconButton from '../../components/IconButton/IconButton';

const Settings = () => {
  const sound = new Audio(menuSound);
  const state = useSelector((state) => state);
  const [hotkeys, setHotkeys] = useState(state.keys);
  const dispatch = useDispatch();

  const onVolumeChangeHandler = (type, value) => {
    if (value < 0 || value > 1 || isNaN(+value)) return;
    dispatch(actions.changeVolume(type, +value));
    localStorage.setItem(type, value);
    sound.volume = value;
    sound.currentTime = 0;
    sound.play();
  };

  const onHotkeyChangeHandler = (keyType, value) => {
    if (value.length > 1) value = value.slice(1);
    if (Object.values(hotkeys).includes(value)) return;
    setHotkeys({ ...hotkeys, [keyType]: value });
    dispatch(actions.changeHotkey(keyType, value));
  };

  const onChangeMaxLevelHandler = (value) => {
    if (value < 5 || value > 10) return;
    dispatch(actions.changeGameLevels(+value));
  };

  const setDefaultSettingsHandler = () => {
    dispatch(actions.setDefaultSettings());
  };

  return (
    <Fragment>
      <Header title="Settings" />
      <div className={classes.Settings}>
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
              value={hotkeys.pause}
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
              value={hotkeys.reload}
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
              value={hotkeys.fullscreen}
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
              value={hotkeys.music}
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
              value={hotkeys.sounds}
            />
          </div>
        </div>
        <div className={classes.settingsElement}>
          <span>
            Increase Max Game Level*
            <br />
            <small>*experimental option</small>
          </span>
          <div className={classes.inputContainer}>
            <input
              className={classes.input}
              type="number"
              onChange={(event) => onChangeMaxLevelHandler(event.target.value)}
              value={state.levels}
              max={10}
              min={5}
              step={1}
            />
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
