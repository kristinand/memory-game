import React from 'react';
import Switch from '@material-ui/core/Switch';

import Input from 'components/Input';
import classes from './classes.module.scss';

interface IProps {
  title: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked?: boolean) => void;
  value?: number | string | boolean;
}

const SettingsElement: React.FC<IProps> = ({ title, onChange, value }) => {
  const getControl = () => {
    switch (typeof value) {
      case 'boolean':
        return <Switch checked={value} onChange={onChange} color="default" />;
      case 'number':
        return (
          <Input className={classes.input} type="number" onChange={onChange} value={value} max={1} min={0} step={0.1} />
        );
      default:
        return <Input className={classes.input} type="text" onChange={onChange} value={value} />;
    }
  };
  return (
    <div className={classes.settingsElement}>
      <span>{title}</span>
      {getControl()}
    </div>
  );
};

export default SettingsElement;
