import React from 'react';
import classes from './classes.module.scss';

interface IProps {
  centered?: boolean;
}

const Spinner: React.FC<IProps> = () => (
  <div className={classes.ring}>
    <div />
    <div />
    <div />
  </div>
);

export default Spinner;
