import React, { Fragment } from 'react';
import classes from './Rating.css';
import { formatTime } from '../../utils/functions';
import Header from '../Header/Header';

let ratingData = [
	{ name: 'Bob', score: 261, date: new Date('2020','02','20', '11','12') },
	{ name: 'Tom', score: 297, date: new Date('2021','01','02', '13','34') },
	{ name: 'Jess', score: 212, date: new Date('2019','05','12', '12','01') },
	{ name: 'Lily', score: 184, date: new Date('2020','11','31', '23','42') },
];

const Rating = () => {
  ratingData = ratingData.sort((prev, cur) => prev.score - cur.score);

  const playersData = ratingData.map((player, i) => {
    const playerClass = player.current ? [classes.player, classes.current].join(' ') : classes.player;
    const formattedDate = `${player.date.getDate().toString().padStart(2, 0)}.${(player.date.getMonth() + 1)
      .toString()
      .padStart(2, 0)}.${player.date.getFullYear()}
    ${player.date.getHours().toString().padStart(2, 0)}:${player.date.getMinutes().toString().padStart(2, 0)}`;
    return (
      <div key={player.name} className={playerClass}>
        <span>{i + 1}</span>
        <span>{player.name}</span>
        <span>{formatTime(player.score)}</span>
        <span>{formattedDate}</span>
      </div>
    );
  });

  return (
    <Fragment>
      <Header title="Rating" />
      <div className={classes.Rating}>
        <div className={classes.header}>
          <span>Position</span>
          <span>Name</span>
          <span>Completed Time</span>
          <span>Date</span>
        </div>
        {playersData}
      </div>
    </Fragment>
  );
};

export default Rating;
