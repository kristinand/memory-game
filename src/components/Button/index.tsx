import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { selectTheme } from 'store/settings/slice';
import classes from './classes.module.scss';

interface IProps extends React.HTMLProps<HTMLButtonElement> {
  children?: React.ReactNode;
  icon?: React.ReactElement;
  className?: string;
}

const Button: React.FC<IProps> = ({ title, onClick, icon, children, className }) => {
  const theme = useSelector(selectTheme);

  return (
    <button
      type="button"
      title={title}
      className={classNames(classes.button, classes[theme], className)}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
