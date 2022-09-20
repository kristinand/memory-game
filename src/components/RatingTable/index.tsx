import React from 'react';
import classNames from 'classnames';
import { IGetRatingsResponse } from 'api/types';
import Back from 'assets/icons/left.svg';
import Forth from 'assets/icons/right.svg';
import Button from 'components/Button';
import { formatTime } from 'utils/functions';
import classes from './classes.module.scss';

interface IProps {
  player: string;
  allRatings: IGetRatingsResponse | null;
  limit: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const RaingTable: React.FC<IProps> = ({ player, allRatings, limit, page, setPage }) => (
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
);

export default RaingTable;
