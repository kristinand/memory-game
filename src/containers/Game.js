import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../store/actions';
import { listToArray } from '../utils/functions';
import Header from './GameHeader/GameHeader';
import CardRow from '../components/CardRow';
import music from '@assets/music.opus';

const game = () => {
  const [musicSound] = useState(new Audio(music));
  const { cards, musicVolume } = useSelector((state) => state);
  musicSound.volume = musicVolume;

  const dispatch = useDispatch();

  useEffect(() => {
    musicSound.play();
    musicSound.loop = true;
    return () => {
      musicSound.pause();
    }
  }, []);

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
    <Fragment>
      <Header />
      <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', height: '70vh', justifyContent: 'center' }}>
        {listToArray(cards, 4).map((cardsRow, i) => (
          <CardRow key={i} cards={cardsRow} onCardClick={onCardSelectHandler} />
        ))}
      </div>
    </Fragment>
  );
};

export default game;
