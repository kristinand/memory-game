import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import classes from './Settings.css';
import Header from '../../components/Header/Header';
import menuSound from '@assets/menu-click.opus'

const Settings = () => {
  const sound = new Audio(menuSound);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const onVolumeChangeHandler = (type, value) => {
    if (value < 0 || value > 1 || isNaN(+value)) return;
    dispatch(actions.changeVolume(type, +value));
    sound.volume = value;
    sound.currentTime = 0;
    sound.play();
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
      </div>
    </Fragment>
  );
};

export default Settings;
