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
import { ILoadRatingsResponse, IPlayerRatingResponse, IError } from '../../api/entities';
import api from '../../api/api';

import classes from './classes.module.scss';

const Rating: React.FC = () => {
  const limit = 10;
  const player = useSelector((state: IState) => state.game.player);
  const [page, setPage] = useState(1);
  const [ratingsData, setRatingsData] = useState<ILoadRatingsResponse>();
  const [errors, setErrors] = useState<IError>();
  const [playerRatingData, setPlayerRatingData] = useState<IPlayerRatingResponse>();

  useEffect(() => {
    const loadRatings = async () => {
      const ratings = await api.loadRatings({ page, limit });
      if (ratings.status === 'success') {
        setRatingsData(ratings.content);
      } else {
        setErrors(ratings);
      }

      if (page === 1) {
        const playerRating = await api.loadPlayerRating(player);
        if (playerRating.status === 'success') {
          setPlayerRatingData(playerRating.content);
        }
      }
    };

    void loadRatings();
  }, [page]);

  if (errors) {
    return <p>{errors.message}</p>;
  }

  return (
    <>
      <Header title="Rating" />
      <Layout>
        <p>
          Your position: {playerRatingData?.position || '—'} ({formatTime(playerRatingData?.rating?.score || 0)})
        </p>

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
                [classes.current]: player === playerRating.player,
              })}
            >
              <span>{page * limit - limit + (i + 1)}</span>
              <span>{playerRating.player}</span>
              <span>{formatTime(playerRating.score)}</span>
              <span>{new Date(playerRating.date).toLocaleString()}</span>
            </div>
          ))}
          {((!ratingsData && !errors) || ratingsData?.ratings.length < limit) &&
            Array(limit - (ratingsData?.ratings.length || 0))
              .fill(0)
              .map((row, i) => (
                <div key={Math.random()} className={classes.tableRow}>
                  <span>{page * limit - limit + (i + 1) + ratingsData?.ratings.length}</span>
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
