import React from 'react';
import classNames from 'classnames';
import classes from './classes.module.scss';

interface IProps {
  children: React.ReactNode;
  centered?: boolean;
  fullWidth?: boolean;
}

const Layout: React.FC<IProps> = ({ children, centered = false, fullWidth = false }) => (
  <main className={classNames(classes.layout, { [classes.centered]: centered, [classes.fullWidth]: fullWidth })}>
    <>{children}</>
  </main>
);

export default Layout;
