import React from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import useTimer from '../../hooks/useTimer';
import { formatTime } from '../../utils/functions';
import classes from './Header.css';
import IconButton from '../../components/IconButton';
import Refresh from '@assets/icons/refresh.svg';
import Pause from '@assets/icons/pause.svg';
import Play from '@assets/icons/play.svg';
import Screen from '@assets/icons/screen.svg';
import Sound2 from '@assets/icons/sound2.svg';
import Music2 from '@assets/icons/music2.svg';

const header = (props) => {
  const dispatch = useDispatch();
  const { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset } = useTimer(0);

  const onChangeLevelHandler = (param) => {
    dispatch(actions.changeLevel(param))
  };

  return (
    <div className={classes.Header}>
      <span>
        <span onClick={() => onChangeLevelHandler('dec')}>{'<'}</span>
        <span className={classes.level}>level: {props.level}</span>
        <span onClick={() => onChangeLevelHandler('inc')}>{'>'}</span>
      </span>

      <span className={classes.right}>
        <span className={classes.timer}>{formatTime(timer)}</span>
        {isPaused ? (
          <IconButton onClick={handleResume} color={props.buttonColor} component={Play} />
        ) : (
          <IconButton onClick={handlePause} color={props.buttonColor} component={Pause} />
        )}
        <IconButton
          onClick={() => {
            handleReset();
            handleStart();
          }}
          color={props.buttonColor}
          component={Refresh}
        />
        <IconButton color={props.buttonColor} component={Screen} />
        <IconButton color={props.buttonColor} component={Sound2} />
        <IconButton color={props.buttonColor} component={Music2} />
      </span>
    </div>
  );
};

export default React.memo(header);
