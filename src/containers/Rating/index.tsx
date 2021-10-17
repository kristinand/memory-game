import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Footer from 'components/Footer';

import { IRating } from 'entities/';
import { IState } from 'store/entities';
import { formatTime } from 'utils/functions';
import api from '../../api/api';

import classes from './classes.module.scss';

const Rating: React.FC = () => {
  const playerName = useSelector((state: IState) => state.game.player);
  const [ratings, setRatings] = useState<IRating[]>([]);

  useEffect(() => {
    const loadRatings = async () => {
      let result = await api.loadRatings();
      result = result.sort((prev, cur) => prev.score - cur.score);
      setRatings(result);
    };

    void loadRatings();
  }, []);

  return (
    <>
      <Header title="Rating" />
      <Layout>
        <div className={classes.table}>
          <div className={classes.tableHeader}>
            <span>Position</span>
            <span>Name</span>
            <span>Completed Time</span>
            <span>Date</span>
          </div>
          {ratings.map((playerRating, i) => (
            <div
              key={playerRating.player}
              className={classNames({
                [classes.tableRow]: true,
                [classes.current]: playerName === playerRating.player,
              })}
            >
              <span>{i + 1}</span>
              <span>{playerRating.player}</span>
              <span>{formatTime(playerRating.score)}</span>
              <span>{new Date(playerRating.date).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default Rating;
