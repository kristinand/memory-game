import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import { listToArray, getRandomNumber } from '../../utils/functions';
import GameControls from './GameControls/GameControls';
import CardRow from '../../components/CardRow';
import IconButton from '../../components/IconButton/IconButton';
import Autoplay from '@assets/icons/autoplay.svg';

const Game = () => {
  const [musicSound] = useState(new Audio('http://soundimage.org/wp-content/uploads/2017/05/High-Altitude-Bliss.mp3'));
  const state = useSelector((state) => state);
  const [focusRef, setFocusRef] = useState();
  musicSound.volume = state.settings.musicVolume;

  const dispatch = useDispatch();

  useEffect(() => {
    musicSound.play();
    musicSound.loop = true;
    if (state.cards.length === 0) dispatch(actions.startGame());
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

  const autoplay = (cards) => {
    if (window.location.pathname !== '/game') {
      dispatch(actions.setAutoplay(false));
      return;
    }
    const chosenCardIndex = getRandomNumber(0, cards.length);
    let chosenCard = cards[chosenCardIndex];
    if (chosenCard && chosenCard.status !== 'closed') {
      chosenCard = cards.find((card) => card.status === 'closed');
    }
    const cardsStatus = cards.map((card) => card.status);
    if (chosenCard && (cardsStatus.includes('closed') || cardsStatus.includes('not-guessed'))) {
      setTimeout(() => {
        onCardSelectHandler(chosenCard.key);
        autoplay(cards.filter((card) => card.status !== 'guessed'));
      }, 800);
    } else {
      setTimeout(() => {
        dispatch(actions.startGame());
      }, 800);
    }
  };

  const onAutoplayHandler = () => {
    dispatch(actions.setAutoplay(true));
    autoplay(state.cards);
  };

  return (
    <Fragment>
      <GameControls getFocusRef={(ref) => setFocusRef(ref)} />
      <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', height: '70vh', justifyContent: 'center' }}>
        {listToArray(state.cards, 4).map((cardsRow, i) => (
          <CardRow key={i} cards={cardsRow} onCardClick={onCardSelectHandler} />
        ))}
      </div>
      <div style={{ textAlign: 'center' }}>
        {state.score === 0 && !state.isAutoplay ? (
          <IconButton onClick={onAutoplayHandler} text="Autoplay" component={Autoplay} />
        ) : (
          ''
        )}
        { state.isAutoplay ? <p>ai guesses the cards...</p> : '' }
      </div>
    </Fragment>
  );
};

export default Game;
