import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import SvgIcon from '@material-ui/core/SvgIcon';

import { IState } from 'store/entities';
import classes from './classes.module.scss';

interface IProps extends React.HTMLProps<HTMLButtonElement> {
  children?: React.ReactNode;
  icon?: React.ElementType;
  className?: string;
}

const Button: React.FC<IProps> = ({ title, onClick, icon, children, className }) => {
  const { theme } = useSelector((store: IState) => store.settings);

  return (
    <button
      type="button"
      title={title}
      className={classNames(classes.button, classes[theme], className)}
      onClick={onClick}
    >
      {icon && <SvgIcon fontSize="large" component={icon} viewBox="0 0 100 100" />}
      {children}
    </button>
  );
};

export default Button;
