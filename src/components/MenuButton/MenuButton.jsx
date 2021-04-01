import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import sound from '@assets/menu-click.opus';
import classes from './MenuButton.css';

const MenuButton = (props) => {
  const { path, title, onClick, disabled } = props;
  const clickSound = new Audio(sound);
  const soundVolume = useSelector((state) => state.settings.soundVolume);
  clickSound.volume = soundVolume;

  const onClickButtonHandler = () => {
    if (onClick) onClick();
    clickSound.currentTime = 0;
    clickSound.play();
  };

  return (
    <Link to={path} style={{ width: '100%' }}>
      <button type="button" disabled={disabled} onClick={onClickButtonHandler} className={classes.Button}>
        {title}
      </button>
    </Link>
  );
};

export default MenuButton;

MenuButton.defaultProps = {
  disabled: false,
  onClick: undefined,
};

MenuButton.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
