import React, { useRef } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import classes from './classes.module.scss';

interface IProps {
  title?: string;
  text?: string;
  color?: string;
  component: React.ElementType;
  onClick: () => void;
}

const IconButton: React.FC<IProps> = ({ title, onClick, component, text, color }) => {
  const buttonRef = useRef(null);

  const setButtonColors = (textColor = 'black', bgColor = 'transparent') => {
    const button = buttonRef.current as HTMLButtonElement;
    button.style.color = textColor;
    button.style.backgroundColor = bgColor;
  };

  return (
    <button
      type="button"
      title={title}
      className={classes.button}
      onClick={onClick}
      ref={buttonRef}
      onMouseEnter={() => setButtonColors(color, 'white')}
      onMouseLeave={() => setButtonColors()}
    >
      <SvgIcon fontSize="large" component={component} viewBox="0 0 100 100" />
      {text && <span className={classes.btnText}>{text}</span>}
    </button>
  );
};

export default IconButton;
