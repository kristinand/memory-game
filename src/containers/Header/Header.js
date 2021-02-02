import React from 'react';
import classes from './Header.css'

const header = (props) => {
	return (
		<div className={classes.Header}>
			<span>level: {props.level}</span>
			<button onClick={() => props.changeLevel('inc')} style={{margin: '0 0.5em'}}>+</button>
			<button onClick={() => props.changeLevel('dec')} style={{margin: '0 0.5em'}}>-</button>
		</div>
	)
}

export default header;
