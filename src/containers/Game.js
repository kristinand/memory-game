import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../store/actions';
import { listToArray } from '../utils/functions';
import CardRow from '../components/CardRow';

const game = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards);

  const onCardSelectHandler = (key) => {
    const selectedCardIndex = cards.findIndex((card) => card.key === key);
    const openedCardIndex = cards.findIndex((card) => card.status === 'opened');
    const selectedCard = cards[selectedCardIndex];
    const openedCard = cards[openedCardIndex];

    // избегаем нажатия, если карта не закрыта
    if (selectedCard.status !== 'closed') return;

    // открытие первой карты
    if (openedCard === undefined && selectedCard.status !== 'guessed') {
      dispatch(actions.changeCardStatus('opened', selectedCardIndex));
      return;
    }

    if (openedCard.key.slice(1) == key.slice(1)) {
      dispatch(actions.changeCardStatus('guessed', selectedCardIndex, openedCardIndex));
    } else {
      dispatch(actions.changeCardStatus('not-guessed', selectedCardIndex, openedCardIndex));
      setTimeout(() => {
        dispatch(actions.changeCardStatus('closed', selectedCardIndex, openedCardIndex));
      }, 500);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', height: '70vh', justifyContent: 'center' }}>
      {listToArray(cards, 4).map((cardsRow, i) => (
        <CardRow key={i} cards={cardsRow} onCardClick={onCardSelectHandler} />
      ))}
    </div>
  );
};

export default game;
