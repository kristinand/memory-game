import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import { listToArray } from '../../utils/functions';
import GameControls from './GameControls/GameControls';
import CardRow from '../../components/CardRow';
// import music from '@assets/music.opus';

const Game = () => {
  const [musicSound] = useState(new Audio('http://soundimage.org/wp-content/uploads/2017/05/High-Altitude-Bliss.mp3'));
  const state = useSelector((state) => state);
  const [focusRef, setFocusRef] = useState();
  musicSound.volume = state.settings.musicVolume;

  const dispatch = useDispatch();

  useEffect(() => {
    musicSound.play();
    musicSound.loop = true;
    return () => musicSound.pause();
  }, []);

  const onCardSelectHandler = (key) => {
    focusRef.focus();
    const selectedCardIndex = state.cards.findIndex((card) => card.key === key);
    const openedCardIndex = state.cards.findIndex((card) => card.status === 'opened');
    const selectedCard = state.cards[selectedCardIndex];
    const openedCard = state.cards[openedCardIndex];

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
      <GameControls getFocusRef={(ref) => setFocusRef(ref)} autoplay={() => {}} />
      <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', height: '70vh', justifyContent: 'center' }}>
        {listToArray(state.cards, 4).map((cardsRow, i) => (
          <CardRow key={i} cards={cardsRow} onCardClick={onCardSelectHandler} />
        ))}
      </div>
    </Fragment>
  );
};

export default Game;
