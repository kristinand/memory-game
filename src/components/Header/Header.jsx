import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Back from '@assets/icons/left.svg';
import classes from './Header.css';
import IconButton from '../IconButton/IconButton';

const Header = ({ title }) => {
  const history = useHistory();
  return (
    <div className={classes.Header}>
      <span className={classes.button}>
        <IconButton component={Back} text="Back to Menu" onClick={() => history.push('/')} />
      </span>
      <span className={classes.title}>{title}</span>
    </div>
  );
};

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
