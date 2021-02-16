import React from 'react';
import classes from './Header.css';
import { useHistory } from 'react-router-dom';
import Back from '@assets/icons/left.svg';
import IconButton from '../../components/IconButton';

const Header = (props) => {
  const history = useHistory();
  return (
    <div className={classes.Header}>
      <span className={classes.button}>
        <IconButton component={Back} text="Back to Menu" onClick={() => history.push('/')} />
      </span>
      <span className={classes.title}>{props.title}</span>
    </div>
  );
};

export default Header;
