import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import Header from '../../components/Header/Header';

import { IState } from '../../store/interfaces';
import api from '../../api/api';
import { formatTime } from '../../utils/functions';

import classes from './Rating.css';

const cx = classNames.bind(classes);

const Rating = () => {
  const { player: playerName } = useSelector((state: IState) => state);
  const [ratingData, setRatingData] = useState([]);
  let playersData: string | any[] = 'Loading...';

  useEffect(() => {
    const loadRatings = async () => {
      let ratings = await api.loadRatings();
      ratings = ratings.sort((prev, cur) => prev.score - cur.score);
      setRatingData(ratings);
    };

    loadRatings();
  }, []);

  if (ratingData.length) {
    playersData = ratingData.map((player, i) => {
      const playerClasses = cx({
        player: true,
        current: playerName === player.player,
      });

      return (
        <div key={player.player} className={playerClasses}>
          <span>{i + 1}</span>
          <span>{player.player}</span>
          <span>{formatTime(player.score)}</span>
          <span>{new Date(player.date).toLocaleString()}</span>
        </div>
      );
    });
  }

  return (
    <>
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
    </>
  );
};

export default Rating;
