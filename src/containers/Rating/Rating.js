import React, { Fragment } from 'react';
import classes from './Rating.css';
import { formatTime } from '../../utils/functions';
import Header from '../Header/Header';

const Rating = () => {
  const today = new Date();
  let data = [
    { name: 'Bob', score: 123, date: today },
    { name: 'Tom', score: 243, date: today },
    { name: 'Jess', score: 231, date: today, current: true },
    { name: 'Lily', score: 100, date: today },
  ];

  data = data.sort((prev, cur) => prev.score - cur.score);

  const playersData = data.map((player, i) => {
    const playerClass = player.current ? [classes.player, classes.current].join(' ') : classes.player;
    const formattedDate = `${player.date.getDate().toString().padStart(2, 0)}-${(player.date.getMonth() + 1)
      .toString()
      .padStart(2, 0)}-${player.date.getFullYear()}
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
