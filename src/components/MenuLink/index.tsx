import React from 'react';
import { useSelector } from 'react-redux';
import { Link, LinkProps } from 'react-router-dom';
import classNames from 'classnames';

import { selectTheme } from 'store/settings/slice';
import classes from './classes.module.scss';

interface IProps extends LinkProps {
  title: string;
  disabled?: boolean;
}

const MenuLink: React.FC<IProps> = ({ title, disabled, to, ...linkProps }) => {
  const theme = useSelector(selectTheme);

  return (
    <Link
      to={!disabled && to}
      className={classNames(classes.link, classes[theme], disabled && classes.disabled)}
      {...linkProps}
    >
      {title}
    </Link>
  );
};

export default MenuLink;
