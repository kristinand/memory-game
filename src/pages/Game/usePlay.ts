import { useDispatch } from 'react-redux';
import { updateCards, increaseCountBy1 } from 'store/game/slice';
import { IDS_SUM } from 'utils/constants';
import { ICard, ECardStatus } from 'types/';

const getCardsStatus = (selectedCardId: number, oldCardId?: number): ECardStatus => {
  switch (oldCardId) {
    case undefined:
      return ECardStatus.Opened;
    case IDS_SUM - selectedCardId:
      return ECardStatus.Guessed;
    default: {
      return ECardStatus.NotGuessed;
    }
  }
};

type IUsePlay = () => {
  onSelectCard: (cards: ICard[], selectedCard: ICard) => void;
};

export const usePlay: IUsePlay = () => {
  const dispatch = useDispatch();

  const onSelectCard = (cards: ICard[], selectedCard: ICard) => {
    if (selectedCard.status !== ECardStatus.Closed) return;

    const selectedCardIndex = cards.findIndex(({ id }) =>  id === selectedCard.id);
    const openedCardIndex = cards.findIndex(({ status }) => status === ECardStatus.Opened);

    if (selectedCardIndex < 0) return;

    dispatch(increaseCountBy1(selectedCardIndex));

    const status = getCardsStatus(selectedCard.id, cards[openedCardIndex]?.id);
    const indexes = openedCardIndex >= 0 ? [selectedCardIndex, openedCardIndex] : [selectedCardIndex];

    dispatch(updateCards({ status, indexes }));

    setTimeout(() => {
      if (status === ECardStatus.NotGuessed) {
        dispatch(updateCards({ status: ECardStatus.Closed, indexes }));
      }
    }, 500);
  };

  return {
    onSelectCard
  };
};
