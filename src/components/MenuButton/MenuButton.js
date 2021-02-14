import React from 'react';
import classes from './MenuButton.css'

const menuButton = (props) => {
	return (
		<button disabled={props.disabled} onClick={props.onClick} className={classes.Button}>{props.title}</button>
	)
}

export default menuButton;
