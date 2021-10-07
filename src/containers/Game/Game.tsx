import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Autoplay from 'assets/icons/autoplay.svg';
import { musicURL } from 'constants/';
import GameControls from './GameControls/GameControls';
import CardRow from '../../components/CardRow/CardRow';
import IconButton from '../../components/IconButton/IconButton';

import { IState } from '../../entities/interfaces';
import { ECardStatus } from '../../entities/enums';
import * as actions from '../../store/actions';
import { listToArray, getRandomNumber } from '../../utils/functions';
import classes from './Game.css';

const Game: React.FC = () => {
  const state = useSelector((store: IState) => store);
  const [musicSound] = useState(new Audio(musicURL));
  const [focusRef, setFocusRef] = useState<HTMLDivElement>();
  musicSound.volume = state.settings.musicVolume;

  const dispatch = useDispatch();

  useEffect(() => {
    musicSound.play();
    musicSound.loop = true;
    if (!state.cards.length) dispatch(actions.startGame());
    return () => musicSound.pause();
  }, []);

  const onCardSelectHandler = (key) => {
    focusRef.focus();
    const selectedCardIndex = state.cards.findIndex((card) => card.key === key);
    const openedCardIndex = state.cards.findIndex((card) => card.status === ECardStatus.Opened);
    const selectedCard = state.cards[selectedCardIndex];
    const openedCard = state.cards[openedCardIndex];

    if (selectedCard.status !== ECardStatus.Closed) return;

    // открытие первой карты
    if (openedCard === undefined && selectedCard.status !== ECardStatus.Guessed) {
      dispatch(actions.changeCardStatus(ECardStatus.Opened, selectedCardIndex));
      return;
    }

    if (openedCard.key.slice(1) === key.slice(1)) {
      dispatch(actions.changeCardStatus(ECardStatus.Guessed, selectedCardIndex, openedCardIndex));
    } else {
      dispatch(actions.changeCardStatus(ECardStatus.NotGuessed, selectedCardIndex, openedCardIndex));
      setTimeout(() => {
        dispatch(actions.changeCardStatus(ECardStatus.Closed, selectedCardIndex, openedCardIndex));
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
    if (chosenCard && chosenCard.status !== ECardStatus.Closed) {
      chosenCard = cards.find((card) => card.status === ECardStatus.Closed);
    }
    const cardsStatus = cards.map((card) => card.status);
    if (chosenCard && (cardsStatus.includes(ECardStatus.Closed) || cardsStatus.includes(ECardStatus.NotGuessed))) {
      setTimeout(() => {
        onCardSelectHandler(chosenCard.key);
        autoplay(cards.filter((card) => card.status !== ECardStatus.Guessed));
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
    <>
      <GameControls getFocusRef={(ref) => setFocusRef(ref)} />
      <div className={classes.game}>
        {listToArray(state.cards, 4).map((cardsRow) => (
          <CardRow key={cardsRow[0].key} cards={cardsRow} onCardClick={onCardSelectHandler} />
        ))}
      </div>
      <div className={classes.autoplay}>
        {!state.score && !state.isAutoplay && (
          <IconButton onClick={onAutoplayHandler} text="Autoplay" component={Autoplay} />
        )}
        {state.isAutoplay && <p>ai guesses the cards...</p>}
      </div>
    </>
  );
};

export default Game;
