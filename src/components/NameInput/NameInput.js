import React from 'react';
import classes from './NameInput.css';

const Input = (props) => {
  let inputClasses = props.isHelperTextVisible ? [classes.input, classes.inputDanger].join(' ') : classes.input;
  return (
    <div className={classes.inputContainer}>
      <input
        className={inputClasses}
        type="text"
        id="name"
        value={props.player}
        onChange={(event) => props.onInputValueChangeHandler(event.target.value)}
        placeholder="Your name"
        autoComplete="off"
      />
      {props.isHelperTextVisible ? <p className={classes.helperText}>Please, enter your name</p> : ''}
    </div>
  );
};

export default Input;
