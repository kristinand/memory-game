import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from 'components/Layout';
import RatingTable from 'components/RatingTable';
import Spinner from 'components/Spinner';
import { formatTime } from 'utils/functions';
import { selectPlayerName } from 'store/auth/slice';
import { selectAllRatings, selectPlayerRating, selectIsLoading } from 'store/rating/slice';
import { getRating, getAllRatings } from 'store/rating/thunks/';

const limit = 10;

const Rating: React.FC = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const player = useSelector(selectPlayerName);
  const allRatings = useSelector(selectAllRatings);
  const playerRating = useSelector(selectPlayerRating);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (player) {
      void dispatch(getRating(player));
    }
  }, [dispatch, player]);

  useEffect(() => {
    void dispatch(getAllRatings({ page, limit }));
  }, [dispatch, page]);

  return (
    <Layout title="Rating">
      <p>
        Your position: {playerRating?.position || '—'} ({formatTime(playerRating?.rating?.score || 0)})
      </p>

      {isLoading ? (
        <Spinner />
      ) : (
        <RatingTable limit={limit} page={page} setPage={setPage} player={player} allRatings={allRatings} />
      )}
    </Layout>
  );
};

export default Rating;
