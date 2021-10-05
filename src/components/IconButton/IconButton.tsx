import React, { useRef } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import classes from './IconButton.css';

interface IProps {
  title?: string;
  text?: string;
  color?: string;
  component: React.ElementType<any>;
  onClick: () => void;
}

const IconButton: React.FC<IProps> = ({ title, onClick, component, text, color }) => {
  const buttonRef = useRef(null);

  return (
    <button
      type="button"
      title={title}
      className={classes.button}
      onClick={onClick}
      ref={buttonRef}
      onMouseEnter={() => {
        buttonRef.current.style.color = color;
        buttonRef.current.style.backgroundColor = 'white';
      }}
      onMouseLeave={() => {
        buttonRef.current.style.color = 'black';
        buttonRef.current.style.backgroundColor = 'transparent';
      }}
    >
      <SvgIcon fontSize="large" component={component} viewBox="0 0 100 100" />
      {text && <span className={classes.btnText}>{text}</span>}
    </button>
  );
};

export default IconButton;
