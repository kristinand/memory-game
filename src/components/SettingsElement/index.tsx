import React from 'react';

import Input from 'components/Input';
import classes from './classes.module.scss';

interface IProps extends React.HTMLProps<HTMLInputElement> {
  title: string;
  val: number | string | boolean;
}

const SettingsElement: React.FC<IProps> = ({ title, val, ...other }) => {
  const getProps = (): React.HTMLProps<HTMLInputElement> => {
    switch (typeof val) {
      case 'boolean':
        return { type: 'checkbox', checked: val, ...other };
      case 'number':
        return { type: 'number', value: val, min: 1, max: 0, step: 0.1, className: classes.input, ...other };
      default:
        return { type: 'text', value: val, className: classes.input, ...other };
    }
  };

  return (
    <div className={classes.settingsElement}>
      <span>{title}</span>
      <Input {...getProps()} />
    </div>
  );
};

export default SettingsElement;
