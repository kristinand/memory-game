import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import SvgIcon from '@material-ui/core/SvgIcon';

import { IState } from 'store/entities';
import classes from './classes.module.scss';

interface IProps {
  title?: string;
  text?: string;
  component: React.ElementType;
  onClick: () => void;
  className?: string;
}

const IconButton: React.FC<IProps> = ({ title, onClick, component, text, className }) => {
  const { theme } = useSelector((store: IState) => store.settings);

  return (
    <button
      type="button"
      title={title}
      className={classNames(classes.button, classes[theme], className)}
      onClick={onClick}
    >
      <SvgIcon fontSize="large" component={component} viewBox="0 0 100 100" />
      {text && <span className={classes.buttonText}>{text}</span>}
    </button>
  );
};

export default IconButton;
