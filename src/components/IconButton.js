import React, { useRef } from 'react';
import styled from 'styled-components';
import SvgIcon from '@material-ui/core/SvgIcon';

const Button = styled.span`
  position: relative;
  cursor: pointer;
  padding: 0.2em;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.1s ease-in-out;
  &:hover ${Back} {
    position: relative;
    background-color: #fff;
    box-shadow: 2px 2px 0.1em 1px hsla(0, 0%, 30%, 0.3);
    border-radius: 0.2em;
  }
  &:active ${Back} {
    top: 2px;
    box-shadow: 0px 0px 1px 0px hsla(0, 0%, 30%, 0.3);
  }
`;

const Back = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const iconButton = (props) => {
  const buttonRef = useRef(null);

  return (
    <Button
      onClick={props.onClick}
      ref={buttonRef}
      onMouseEnter={() => {
        buttonRef.current.style.color = props.color;
      }}
      onMouseLeave={() => {
        buttonRef.current.style.color = 'black';
      }}
    >
      <SvgIcon
        style={{ color: props.buttonColor }}
        component={props.component}
        style={{ fontSize: '1.8rem' }}
        viewBox="0 0 100 100"
      />
      {props.color ? <Back /> : ''}
    </Button>
  );
};

export default iconButton;
