import React, { useRef } from 'react';
import styled from 'styled-components';
import SvgIcon from '@material-ui/core/SvgIcon';

const Button = styled.span`
  position: relative;
  cursor: pointer;
  padding: 0.2em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  transform-style: preserve-3d;
  transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1);
  }
  &:hover ${Back} {
    position: relative;
    background-color: #fff;
    border-radius: 0.2em;
    &::before {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #eee;
      border-radius: inherit;
      box-shadow: 0 0.1em 0.1em 0 hsla(0, 0%, 30%, 0.3);
      transform: translate3d(0, 0.25rem, -1em);
      transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
  }
  &:active ${Back} {
    transform: translate(0em, 0.25rem);
    &::before {
      box-shadow: 0 0 hsla(0, 0%, 30%, 0.3);
      transform: translate3d(0, 0, -1em);
    }
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
      <span style={{fontSize: '1rem'}}>{props.text}</span>
      {props.color ? <Back /> : ''}
    </Button>
  );
};

export default iconButton;
