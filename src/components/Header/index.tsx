import React from 'react';
import { useHistory } from 'react-router-dom';

import Back from 'assets/icons/left.svg';
import Button from '../Button';
import classes from './classes.module.scss';

interface IProps {
  title?: string;
}

const Header: React.FC<IProps> = ({ title = '' }) => {
  const history = useHistory();
  return (
    <header className={classes.header}>
      <Button className={classes.button} icon={<Back />} onClick={() => history.push('/')}>
        Back to Menu
      </Button>
      <h2>{title}</h2>
    </header>
  );
};

export default Header;
