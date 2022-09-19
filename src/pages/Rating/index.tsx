import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import Back from 'assets/icons/left.svg';
import Forth from 'assets/icons/right.svg';
import Layout from 'components/Layout';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Button from 'components/Button';

import { formatTime } from 'utils/functions';
import { selectPlayerName } from 'store/auth/slice';
import { selectAllRatings, selectPlayerRating } from 'store/rating/slice';
import { getRating, getAllRatings } from 'store/rating/thunks/';
import classes from './classes.module.scss';

const limit = 10;

const Rating: React.FC = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const player = useSelector(selectPlayerName);
  const allRatings = useSelector(selectAllRatings);
  const playerRating = useSelector(selectPlayerRating);

  useEffect(() => {
    void dispatch(getRating(player));
  }, [dispatch, player]);

  useEffect(() => {
    void dispatch(getAllRatings({ page, limit }));
  }, [page, dispatch]);

  return (
    <>
      <Header title="Rating" />
      <Layout>
        <p>
          Your position: {playerRating?.position || '—'} ({formatTime(playerRating?.rating?.score || 0)})
        </p>

        <div className={classes.table}>
          <div className={classes.tableHeader}>
            <span>Position</span>
            <span>Name</span>
            <span>Completed Time</span>
            <span>Date</span>
          </div>
          {allRatings?.ratings.map((rating, i) => (
            <div
              key={rating.player}
              className={classNames({
                [classes.tableRow]: true,
                [classes.current]: player === rating.player,
              })}
            >
              <span>{page * limit - limit + (i + 1)}</span>
              <span>{rating.player}</span>
              <span>{formatTime(rating.score)}</span>
              <span>{new Date(rating.date).toLocaleString()}</span>
            </div>
          ))}
          {allRatings?.ratings.length < limit &&
            Array.from(Array(limit - (allRatings?.ratings.length ?? 0)).keys()).map((row) => (
              <div key={row} className={classes.tableRow}>
                <span>{page * limit - limit + (row + 1) + (allRatings?.ratings.length ?? 0)}</span>
                <span>—</span>
                <span>—</span>
                <span>—</span>
              </div>
            ))}
          <div className={classes.tableFooter}>
            {page > 1 && (
              <Button
                className={classes.backwardButton}
                icon={<Back />}
                title={`${page - 1}`}
                onClick={() => setPage((prev) => prev - 1)}
              />
            )}
            {page * 10 < allRatings?.total && (
              <Button
                className={classes.forwardButton}
                icon={<Forth />}
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
