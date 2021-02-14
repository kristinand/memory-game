import React from 'react';
import classes from './Menu.css';
import MenuButton from '../../components/MenuButton/MenuButton';

const menu = (props) => {
  return (
		<div className={classes.Menu}>
			<MenuButton onClick={() => {}} title="New Game" />
			<MenuButton onClick={() => {}} disabled={true} title="Continue" />
			<MenuButton onClick={() => {}} title="Rating" />
			<MenuButton onClick={() => {}} title="Settings" />
		</div>
	);
};

export default menu;
