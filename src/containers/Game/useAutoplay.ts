import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAutoplay, selectGameData, startGame, setIsGamePaused } from 'store/game/slice';
import { ICard, ECardStatus } from 'entities/';
import { getRandomNumber } from 'utils/functions';
import { useTimer } from 'utils/hooks';
import { usePlay } from './usePlay';

type IUseAutoplay = () => {
  start: () => void;
  stop: () => void;
};

export const useAutoplay: IUseAutoplay = () => {
  const [prevCard, setPrevCard] = useState<ICard>();
  const [nextCard, setNextCard] = useState<ICard>();
  const { cards, isAutoplay, isGamePaused, level } = useSelector(selectGameData);
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
  }, [isAutoplay]);

  useEffect(() => {
    if (isAutoplay) {
      autoplay();
    }
  }, [timer]);

  const start = () => {
    dispatch(setAutoplay(true));
    if (isGamePaused) dispatch(setIsGamePaused(false));
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
    const pairCard = cards.find(({ key }) => key === chosenCard.pairKey);

    onSelectCard(cards, chosenCard);

    const newNextCard =
      (pairCard?.count >= level || pairCard?.key === prevCard?.key) && pairCard?.status === ECardStatus.Closed
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
