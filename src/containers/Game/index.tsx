import React, { useState, useEffect, ElementType } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Autoplay from 'assets/icons/autoplay.svg';
import { musicURL } from 'constants/';
import { IState } from 'store/entities';
import { ICard, ECardStatus } from 'entities/';
import * as actions from 'store/game/actions';
import { listToArray, getRandomNumber } from 'utils/functions';

import Layout from 'components/Layout';
import Button from 'components/Button';
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

  const onCardSelectHandler = (selectedCard: ICard) => {
    focusRef.focus();

    // do not change status of already opened card
    if (selectedCard.status !== ECardStatus.Closed) return;

    const openedCardIndex = gameState.cards.findIndex((card) => card.status === ECardStatus.Opened);
    const openedCard = gameState.cards[openedCardIndex];

    if (!openedCard) {
      dispatch(actions.changeCardStatus(ECardStatus.Opened, selectedCard));
      return;
    }

    if (openedCard.pairKey === selectedCard.key) {
      dispatch(actions.changeCardStatus(ECardStatus.Guessed, selectedCard, openedCard));
    } else {
      dispatch(actions.changeCardStatus(ECardStatus.NotGuessed, selectedCard, openedCard));
      setTimeout(() => {
        dispatch(actions.changeCardStatus(ECardStatus.Closed, selectedCard, openedCard));
      }, 500);
    }
  };

  const autoplay = (cards: ICard[], prevCard?: ICard, nextCard?: ICard) => {
    if (window.location.pathname !== '/game') {
      dispatch(actions.setAutoplay(false));
      return;
    }

    if (cards.length) {
      const closedCards = cards.filter((card) => card.status === ECardStatus.Closed);

      const chosenCard = nextCard || closedCards[getRandomNumber(0, closedCards.length)];

      // выбрали карту, ищем ее пару среди доступных карточек
      const pairCard = cards.find((card) => card.key === chosenCard.pairKey);

      setTimeout(() => {
        onCardSelectHandler(chosenCard);

        const notGuessedCards = cards.filter((card) => card.status !== ECardStatus.Guessed);

        // "запоминаем" карту, если число ее открытий (count) >= текущему ур.
        // или же она была открыта предыдущей, в ином случае, открываем любую карту.
        // уже угаданную парную карту не нужно ставить в следущую
        // eslint-disable-next-line no-param-reassign
        nextCard =
          (pairCard?.key === prevCard?.key || pairCard?.count >= gameState.level) &&
          pairCard?.status !== ECardStatus.Guessed
            ? pairCard
            : undefined;

        autoplay(notGuessedCards, chosenCard, nextCard);
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
      <Layout fullWidth centered>
        <div className={classes.game}>
          {listToArray(gameState.cards, 4).map((cardsRow: ICard[]) => (
            <div key={cardsRow[0].key}>
              {cardsRow.map((card) => (
                <Card
                  onCardClick={() => onCardSelectHandler(card)}
                  key={card.key}
                  color={card.color}
                  pattern={card.pattern}
                  status={card.status}
                />
              ))}
            </div>
          ))}
        </div>
        {!gameState.score && !gameState.isAutoplay && (
          <Button onClick={onAutoplayHandler} icon={Autoplay as ElementType}>
            Autoplay
          </Button>
        )}
      </Layout>
    </>
  );
};

export default Game;
