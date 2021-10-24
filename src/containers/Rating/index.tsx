import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import Back from 'assets/icons/left.svg';
import Forth from 'assets/icons/right.svg';
import Layout from 'components/Layout';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Button from 'components/Button';

import { formatTime } from 'utils/functions';
import { IState } from 'store/entities';
import { ILoadRatingsResponse } from '../../api/entities';
import api from '../../api/api';

import classes from './classes.module.scss';

const Rating: React.FC = () => {
  const playerName = useSelector((state: IState) => state.game.player);
  const [page, setPage] = useState(1);
  const [ratingsData, setRatingsData] = useState<ILoadRatingsResponse>();

  useEffect(() => {
    const loadRatings = async () => {
      const result = await api.loadRatings({ page });
      if (result.status === 'success') {
        setRatingsData(result.content);
      }
    };

    void loadRatings();
  }, [page]);

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
          {ratingsData?.ratings.map((playerRating, i) => (
            <div
              key={playerRating.player}
              className={classNames({
                [classes.tableRow]: true,
                [classes.current]: playerName === playerRating.player,
              })}
            >
              <span>{page * 10 - 10 + (i + 1)}</span>
              <span>{playerRating.player}</span>
              <span>{formatTime(playerRating.score)}</span>
              <span>{new Date(playerRating.date).toLocaleString()}</span>
            </div>
          ))}
          {ratingsData?.ratings.length < 10 &&
            Array(10 - ratingsData?.ratings.length)
              .fill(0)
              .map((row, i) => (
                <div key={Math.random()} className={classes.tableRow}>
                  <span>{page * 10 - 10 + (i + 1) + ratingsData?.ratings.length}</span>
                  <span>—</span>
                  <span>—</span>
                  <span>—</span>
                </div>
              ))}
          <div className={classes.tableFooter}>
            {page > 1 && (
              <Button
                className={classes.backwardButton}
                icon={Back as React.ElementType}
                title={`${page - 1}`}
                onClick={() => setPage((prev) => prev - 1)}
              />
            )}
            {page * 10 < ratingsData?.total && (
              <Button
                className={classes.forwardButton}
                icon={Forth as React.ElementType}
                title={`${page + 1}`}
                onClick={() => setPage((prev) => prev + 1)}
              />
            )}
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default Rating;
