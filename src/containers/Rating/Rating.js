import React, { Fragment, useEffect, useState } from 'react';
import classes from './Rating.css';
import { useSelector } from 'react-redux';
import { formatTime } from '../../utils/functions';
import Header from '../../components/Header/Header';
import axios from 'axios';
import classNames from 'classnames/bind';

let cx = classNames.bind(classes);

const Rating = () => {
  const { player: playerName } = useSelector((state) => state);
  const [ratingData, setRatingData] = useState([]);
  let playersData = 'Loading...';

  const loadData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/rating');
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(async () => {
    let ratings = await loadData();
    ratings = ratings.sort((prev, cur) => prev.score - cur.score);
    setRatingData(ratings);
  }, []);

  if (ratingData.length > 0) {
    playersData = ratingData.map((player, i) => {
      const playerClasses = cx({
        player: true,
        current: playerName === player.player,
      });

      return (
        <div key={player._id} className={playerClasses}>
          <span>{i + 1}</span>
          <span>{player.player}</span>
          <span>{formatTime(player.score)}</span>
          <span>{new Date(player.date).toLocaleString()}</span>
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
