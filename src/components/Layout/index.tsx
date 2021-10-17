import React from 'react';
import classNames from 'classnames';
import classes from './classes.module.scss';

interface IProps {
  children: React.ReactNode;
  centered?: boolean;
}

const Layout: React.FC<IProps> = ({ children, centered = false }) => (
  <main className={classNames(classes.layout, { [classes.centered]: centered })}>
    <div>{children}</div>
  </main>
);

export default Layout;
