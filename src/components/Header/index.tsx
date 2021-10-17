import React, { ElementType } from 'react';
import { useHistory } from 'react-router-dom';

import Back from 'assets/icons/left.svg';
import IconButton from '../IconButton';
import classes from './classes.module.scss';

interface IProps {
  title: string;
}

const Header: React.FC<IProps> = ({ title }) => {
  const history = useHistory();
  return (
    <header className={classes.header}>
      <IconButton
        className={classes.button}
        component={Back as ElementType}
        text="Back to Menu"
        onClick={() => history.push('/')}
      />
      <h2>{title}</h2>
    </header>
  );
};

export default Header;
