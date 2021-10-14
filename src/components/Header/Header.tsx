import React, { ElementType } from 'react';
import { useHistory } from 'react-router-dom';

import Back from 'assets/icons/left.svg';
import IconButton from '../IconButton/IconButton';
import classes from './classes.module.scss';

interface IProps {
  title: string;
}

const Header: React.FC<IProps> = ({ title }) => {
  const history = useHistory();
  return (
    <div className={classes.Header}>
      <span className={classes.button}>
        <IconButton component={Back as ElementType} text="Back to Menu" onClick={() => history.push('/')} />
      </span>
      <span className={classes.title}>{title}</span>
    </div>
  );
};

export default Header;
