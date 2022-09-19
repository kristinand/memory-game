import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { selectSettings } from 'store/settings/slice';
import { useAudio } from 'utils/hooks';
import classes from './classes.module.scss';

interface IProps {
  path: string;
  title: string;
  disabled?: boolean;
  onClick?: () => void;
}

const MenuButton: React.FC<IProps> = ({ path, title, onClick, disabled }) => {
  const { soundVolume, theme } = useSelector(selectSettings);
  const sound = useAudio('sound', { volume: soundVolume });

  const onClickButtonHandler = () => {
    if (onClick) onClick();
    sound.replay();
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
