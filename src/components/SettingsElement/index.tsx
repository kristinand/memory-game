import React from 'react';

import Input from 'components/Input';
import classes from './classes.module.scss';

interface IProps extends React.HTMLProps<HTMLInputElement> {
  title: string;
  val: number | string | boolean;
}

const SettingsElement: React.FC<IProps> = ({ title, val, ...other }) => {
  let props = {
    className: classes.input,
    ...other,
  };
  switch (typeof val) {
    case 'boolean':
      props = { ...props, type: 'checkbox', checked: val };
      break;
    case 'number':
      props = { ...props, type: 'number', value: val, min: 1, max: 0, step: 0.1 };
      break;
    default:
      props = { ...props, type: 'text', value: val };
  }

  return (
    <div className={classes.settingsElement}>
      <span>{title}</span>
      <Input {...props} />
    </div>
  );
};

export default SettingsElement;
