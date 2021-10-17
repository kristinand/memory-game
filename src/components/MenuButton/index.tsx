import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { IState } from 'store/entities';
import sound from 'assets/menu-click.opus';
import classes from './classes.module.scss';

interface IProps {
  path: string;
  title: string;
  disabled?: boolean;
  onClick?: () => void;
}

const MenuButton: React.FC<IProps> = ({ path, title, onClick, disabled }) => {
  const clickSound = new Audio(sound);
  const { soundVolume, theme } = useSelector((state: IState) => state.settings);
  clickSound.volume = soundVolume;

  const onClickButtonHandler = async () => {
    if (onClick) onClick();
    clickSound.currentTime = 0;
    await clickSound.play();
  };

  return (
    <Link to={path} className={classes.link}>
      <button
        type="button"
        disabled={disabled}
        onClick={onClickButtonHandler}
        className={classNames(classes.button, classes[theme])}
      >
        {title}
      </button>
    </Link>
  );
};

export default MenuButton;
