import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';
import classes from './IconButton.css';

const IconButton = (props) => {
  const { title, onClick, component, text, color } = props;

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
      <SvgIcon
        fontSize="large"
        component={component}
        viewBox="0 0 100 100"
      />
      {text && <span className={classes.btnText}>{text}</span>}
    </button>
  );
};

export default IconButton;

IconButton.defaultProps = {
  title: undefined,
  color: undefined,
  text: undefined,
};

IconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  component: PropTypes.func.isRequired,
  title: PropTypes.string,
  color: PropTypes.string,
  text: PropTypes.string,
};
