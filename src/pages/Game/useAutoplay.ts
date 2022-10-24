import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAutoplay, selectGameData, startGame } from 'store/game/slice';
import { ICard, ECardStatus } from 'types/';
import { getRandomNumber } from 'utils/functions';
import { useTimer } from 'utils/hooks';
import { IDS_SUM } from 'utils/constants';
import { usePlay } from './usePlay';

type IUseAutoplay = () => {
  start: () => void;
  stop: () => void;
};

export const useAutoplay: IUseAutoplay = () => {
  const [prevCard, setPrevCard] = useState<ICard>();
  const [nextCard, setNextCard] = useState<ICard>();
  const { cards, isAutoplay, level } = useSelector(selectGameData);
  const { handleStart, handleReset, timer } = useTimer({ delay: 800 });
  const dispatch = useDispatch();
  const { onSelectCard } = usePlay();

  useEffect(() => {
    if (isAutoplay) {
      handleStart();
    } else {
      handleReset();
    }
    return () => handleReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutoplay]);

  useEffect(() => {
    if (isAutoplay) {
      autoplay();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  const start = () => {
    dispatch(setAutoplay(true));
  };

  const stop = () => {
    dispatch(startGame());
  };

  const autoplay = () => {
    const closedCards = cards.filter(({ status }) => status === ECardStatus.Closed);

    if (window.location.pathname !== '/game' || !closedCards.length) {
      stop();
      return;
    }

    const chosenCard = nextCard || closedCards[getRandomNumber(0, closedCards.length)];
    const pairCard = cards.find(({ id }) => id === IDS_SUM - chosenCard.id);

    onSelectCard(cards, chosenCard);

    const newNextCard =
      (pairCard?.count >= level || pairCard?.id === prevCard?.id) && pairCard?.status === ECardStatus.Closed
        ? pairCard
        : null;

    setPrevCard(chosenCard);
    setNextCard(newNextCard);
  };

  return {
    start,
    stop,
  };
};
