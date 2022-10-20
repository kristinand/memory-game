import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCards, increaseCountBy1 } from 'store/game/slice';
import { ICard, ECardStatus } from 'types/';

const getCardsStatus = (selectedCardKey: string, oldCardKey?: string): ECardStatus => {
  switch (oldCardKey) {
    case undefined:
      return ECardStatus.Opened;
    case selectedCardKey:
      return ECardStatus.Guessed;
    default: {
      return ECardStatus.NotGuessed;
    }
  }
};

type IUsePlay = () => {
  isGameStarted: boolean;
  onSelectCard: (cards: ICard[], selectedCard: ICard) => void;
};

export const usePlay: IUsePlay = () => {
  const dispatch = useDispatch();
  const [isGameStarted, setIsGameStarted] = useState(false);

  const onSelectCard = (cards: ICard[], selectedCard: ICard) => {
    if (selectedCard.status !== ECardStatus.Closed) return;
    if (!isGameStarted) setIsGameStarted(true);

    const selectedCardIndex = cards.findIndex(({ key }) => key === selectedCard.key);
    const openedCardIndex = cards.findIndex(({ status }) => status === ECardStatus.Opened);

    if (selectedCardIndex < 0) return;

    dispatch(increaseCountBy1(selectedCardIndex));

    const status = getCardsStatus(selectedCard.key, cards[openedCardIndex]?.pairKey);
    const indexes = openedCardIndex >= 0 ? [selectedCardIndex, openedCardIndex] : [selectedCardIndex];

    dispatch(updateCards({ status, indexes }));

    setTimeout(() => {
      if (status === ECardStatus.NotGuessed) {
        dispatch(updateCards({ status: ECardStatus.Closed, indexes }));
      }
    }, 500);
  };

  return {
    onSelectCard,
    isGameStarted,
  };
};
