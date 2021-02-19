import React, { useRef } from 'react';
import classes from './IconButton.css';
import SvgIcon from '@material-ui/core/SvgIcon';

const IconButton = (props) => {
  const buttonRef = useRef(null);

  return (
    <span
      title={props.title}
      className={classes.button}
      onClick={props.onClick}
      ref={buttonRef}
      onMouseEnter={() => {
        buttonRef.current.style.color = props.color;
        buttonRef.current.style.backgroundColor = 'white';
      }}
      onMouseLeave={() => {
        buttonRef.current.style.color = 'black';
        buttonRef.current.style.backgroundColor = 'transparent';
      }}
    >
      <SvgIcon
        style={{ color: props.buttonColor }}
        component={props.component}
        style={{ fontSize: '1.8rem' }}
        viewBox="0 0 100 100"
      />
      <span style={{fontSize: '1.1rem'}}>{props.text}</span>
    </span>
  );
};

export default IconButton;
