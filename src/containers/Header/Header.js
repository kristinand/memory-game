import React, { useEffect, useState } from 'react';
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
  return (
    <div className={classes.Header}>
      <span>
        <span onClick={() => props.changeLevel('dec')}>{'<'}</span>
        <span className={classes.level}>level: {props.level}</span>
        <span onClick={() => props.changeLevel('inc')}>{'>'}</span>
      </span>

      <span className={classes.right}>
        <IconButton color={props.buttonColor} component={Play} />
        <IconButton color={props.buttonColor} component={Pause} />
        <IconButton color={props.buttonColor} component={Refresh} />
        <IconButton color={props.buttonColor} component={Screen} />
        <IconButton color={props.buttonColor} component={Sound2} />
        <IconButton color={props.buttonColor} component={Music2} />
      </span>
    </div>
  );
};

export default header;
