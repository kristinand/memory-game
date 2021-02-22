import React, { Fragment, useEffect, useState } from 'react';
import classes from './Rating.css';
import { useSelector } from 'react-redux';
import { formatTime } from '../../utils/functions';
import Header from '../../components/Header/Header';
import axios from 'axios';

let ratingDemoData = [
  { _id: "1", player: 'Hacker', score: 110, date: new Date() },
  { _id: "2", player: 'Bob', score: 261, date: new Date('2020', '02', '20', '11', '12') },
  { _id: "3", player: 'Tom', score: 297, date: new Date('2021', '01', '02', '13', '34') },
  { _id: "4", player: 'Jess', score: 212, date: new Date('2019', '05', '12', '12', '01') },
  { _id: "5", player: 'Lily', score: 184, date: new Date('2020', '11', '31', '23', '42') },
];

const Rating = () => {
  const { player: playerName, score, isGameEnded } = useSelector((state) => state);
  const [ratingData, setRatingData] = useState([]);
  let playersData = 'Loading...';

  const loadDataFromServer = async () => {
    try {
      const res = await axios.get('http://localhost:5000/rating');
      return res.data;
    } catch (err) {
      if (score > 0 && isGameEnded) {
        const data = { _d: "0", player: playerName, score, date: new Date() };
        const playerIndex = ratingDemoData.findIndex((player) => player.player === playerName);
        if (playerIndex >= 0) ratingDemoData[playerIndex] = data;
        else ratingDemoData.push(data);
      }
      return ratingDemoData;
    }
  };

  useEffect(async () => {
    let data = await loadDataFromServer();
    setRatingData(data.sort((prev, cur) => prev.score - cur.score));
  }, []);

  if (ratingData.length > 0) {
    playersData= ratingData.map((player, i) => {
      const playerClass = playerName === player.player ? [classes.player, classes.current].join(' ') : classes.player;
      player.date = new Date(player.date);
      const formattedDate = `${player.date.getDate().toString().padStart(2, 0)}.${(player.date.getMonth() + 1)
        .toString()
        .padStart(2, 0)}.${player.date.getFullYear()}
      ${player.date.getHours().toString().padStart(2, 0)}:${player.date.getMinutes().toString().padStart(2, 0)}`;
      return (
        <div key={player._id} className={playerClass}>
          <span>{i + 1}</span>
          <span>{player.player}</span>
          <span>{formatTime(player.score)}</span>
          <span>{formattedDate}</span>
        </div>
      );
    });
  }



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
