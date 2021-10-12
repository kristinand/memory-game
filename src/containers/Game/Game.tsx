import React, { useState, useEffect, ElementType } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Autoplay from 'assets/icons/autoplay.svg';
import { musicURL } from 'constants/';
import GameControls from './GameControls/GameControls';
import CardRow from '../../components/CardRow/CardRow';
import IconButton from '../../components/IconButton/IconButton';

import { ICard, IState } from '../../entities/interfaces';
import { ECardStatus } from '../../entities/enums';
import * as actions from '../../store/game/actions';
import { listToArray, getRandomNumber } from '../../utils/functions';
import classes from './Game.css';

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
          <CardRow key={cardsRow[0].key} cards={cardsRow} onCardClick={onCardSelectHandler} />
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
