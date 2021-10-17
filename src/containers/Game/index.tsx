import React, { useState, useEffect, ElementType } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Autoplay from 'assets/icons/autoplay.svg';
import { musicURL } from 'constants/';
import { IState } from 'store/entities';
import { ICard, ECardStatus } from 'entities/';
import * as actions from 'store/game/actions';
import { listToArray, getRandomNumber } from 'utils/functions';

import IconButton from 'components/IconButton';
import Card from '../Card';
import GameControls from '../GameControls';

import classes from './classes.module.scss';

const Game: React.FC = () => {
  const gameState = useSelector((state: IState) => state.game);
  const musicVolume = useSelector((state: IState) => state.settings.musicVolume);
  const [musicSound] = useState(new Audio(musicURL));
  const [focusRef, setFocusRef] = useState<HTMLDivElement>();
  musicSound.volume = musicVolume;

  const dispatch = useDispatch();

  useEffect(() => {
    void musicSound.play();
    musicSound.loop = true;
    if (!gameState.cards.length) dispatch(actions.startGame());
    return () => musicSound.pause();
  }, []);

  const onCardSelectHandler = (key: string) => {
    focusRef.focus();
    const selectedCardIndex = gameState.cards.findIndex((card) => card.key === key);
    const openedCardIndex = gameState.cards.findIndex((card) => card.status === ECardStatus.Opened);
    const selectedCard = gameState.cards[selectedCardIndex];
    const openedCard = gameState.cards[openedCardIndex];

    if (selectedCard.status !== ECardStatus.Closed) return;

    // открытие первой карты
    if (openedCard === undefined) {
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

  const autoplay = (cards: ICard[]) => {
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
    autoplay(gameState.cards);
  };

  return (
    <>
      <GameControls getFocusRef={(ref) => setFocusRef(ref)} />
      <div className={classes.game}>
        {listToArray(gameState.cards, 4).map((cardsRow: ICard[]) => (
          <div className={classes.cardRow} key={cardsRow[0].key}>
            {cardsRow.map((card) => (
              <Card
                onCardClick={() => onCardSelectHandler(card.key)}
                key={card.key}
                color={card.color}
                pattern={card.pattern}
                status={card.status}
              />
            ))}
          </div>
        ))}
      </div>
      <div className={classes.autoplay}>
        {!gameState.score && !gameState.isAutoplay && (
          <IconButton onClick={onAutoplayHandler} text="Autoplay" component={Autoplay as ElementType} />
        )}
        {gameState.isAutoplay && <p>ai guesses the cards...</p>}
      </div>
    </>
  );
};

export default Game;
