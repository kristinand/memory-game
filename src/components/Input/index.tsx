import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { selectTheme } from 'store/settings/slice';
import classes from './classes.module.scss';

interface IProps extends React.HTMLProps<HTMLInputElement> {
  withHelperText?: boolean;
  helperText?: string;
  ConatinerClassName?: string;
  className?: string;
}

const Input: React.FC<IProps> = ({ withHelperText = false, helperText, ConatinerClassName, className, ...other }) => {
  const theme = useSelector(selectTheme);

  return (
    <div className={classNames(classes.inputContainer, ConatinerClassName, { [classes.withHT]: withHelperText })}>
      <input
        className={classNames(className, classes.input, classes[theme], {
          [classes.danger]: helperText,
        })}
        autoComplete="off"
        {...other}
      />
      {other.type === 'checkbox' && (
        <span className={classNames(classes.checkmark, classes[theme])}>{other.checked ? 'ON' : 'OFF'}</span>
      )}
      {helperText && <p className={classes.helperText}>{helperText}</p>}
    </div>
  );
};

export default Input;
