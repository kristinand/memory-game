import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classes from './MenuButton.css';
import sound from '@assets/menu-click.opus';

const menuButton = (props) => {
	const clickSound = new Audio(sound);
	const soundVolume = useSelector((store) => store.soundVolume);
  clickSound.volume = soundVolume;

	const onClickButtonHandler = () => {
		if (props.onClick) {
			props.onClick();
		}
		clickSound.currentTime = 0;
		clickSound.play();
	}

	return (
		<Link to={props.path} style={{width: '100%'}}>
			<button disabled={props.disabled} onClick={onClickButtonHandler} className={classes.Button}>{props.title}</button>
		</Link>
	)
}

export default menuButton;
