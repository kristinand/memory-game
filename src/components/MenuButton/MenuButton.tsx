import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import sound from 'assets/menu-click.opus';
import { IState } from '../../entities/interfaces';
import classes from './MenuButton.css';

interface IProps {
  path: string;
  title: string;
  disabled?: boolean;
  onClick?: () => void;
}

const MenuButton: React.FC<IProps> = ({ path, title, onClick, disabled }) => {
  const clickSound = new Audio(sound);
  const soundVolume = useSelector((state: IState) => state.settings.soundVolume);
  clickSound.volume = soundVolume;

  const onClickButtonHandler = () => {
    onClick && onClick();
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
