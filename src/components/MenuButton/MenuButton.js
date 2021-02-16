import React from 'react';
import { Link } from 'react-router-dom';
import classes from './MenuButton.css';

const menuButton = (props) => {
	return (
		<Link to={props.path} style={{width: '100%'}}>
			<button disabled={props.disabled} onClick={props.onClick} className={classes.Button}>{props.title}</button>
		</Link>
	)
}

export default menuButton;
