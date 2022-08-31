import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { MUSIC_URL } from 'constants/';
import { ICard, ECardStatus } from 'entities/';
import { listToArray, getRandomNumber } from 'utils/functions';
import { selectGameData, startGame, changeCardStatus, setAutoplay } from 'store/game/slice';
import { selectSettings } from 'store/settings/slice';
import { useLocalStorage } from 'utils/hooks';

import Layout from 'components/Layout';
import Button from 'components/Button';
import Card from '../Card';
import GameControls from '../GameControls';
import classes from './classes.module.scss';

const Game: React.FC = () => {
  const dispatch = useDispatch();
  const { cards, isAutoplay, level } = useSelector(selectGameData);
  const { musicVolume } = useSelector(selectSettings);
  const [focusRef, setFocusRef] = useState<HTMLDivElement>();
  const { deletePlayerData } = useLocalStorage();

  const musicSound = new Audio(MUSIC_URL);
  musicSound.volume = musicVolume;

  const onGameStart = () => {
    deletePlayerData('game');
    dispatch(startGame());
  };

  useEffect(() => {
    void musicSound.play();
    musicSound.loop = true;
    if (!cards.length) onGameStart();
    return () => musicSound.pause();
  }, []);

  const onCardSelectHandler = (selectedCard: ICard) => {
    focusRef.focus();

    // do not change status of already opened card
    if (selectedCard.status !== ECardStatus.Closed) return;

    const openedCardIndex = cards.findIndex(({ status }) => status === ECardStatus.Opened);
    const openedCard = cards[openedCardIndex];

    if (!openedCard) {
      dispatch(changeCardStatus({ status: ECardStatus.Opened, selectedCard }));
      return;
    }

    if (openedCard.pairKey === selectedCard.key) {
      dispatch(changeCardStatus({ status: ECardStatus.Guessed, selectedCard, oldCard: openedCard }));
    } else {
      dispatch(changeCardStatus({ status: ECardStatus.NotGuessed, selectedCard, oldCard: openedCard }));
      setTimeout(() => {
        dispatch(changeCardStatus({ status: ECardStatus.Closed, selectedCard, oldCard: openedCard }));
      }, 500);
    }
  };

  const autoplay = (allCards: ICard[], prevCard?: ICard, nextCard?: ICard) => {
    if (window.location.pathname !== '/game') {
      dispatch(setAutoplay(false));
      return;
    }

    if (allCards.length) {
      const closedCards = allCards.filter(({ status }) => status === ECardStatus.Closed);

      const chosenCard = nextCard || closedCards[getRandomNumber(0, closedCards.length)];

      // выбрали карту, ищем ее пару среди доступных карточек
      const pairCard = allCards.find(({ key }) => key === chosenCard.pairKey);

      setTimeout(() => {
        onCardSelectHandler(chosenCard);

        const notGuessedCards = allCards.filter(({ status }) => status !== ECardStatus.Guessed);

        // "запоминаем" карту, если число ее открытий (count) >= текущему ур.
        // или же она была открыта предыдущей, в ином случае, открываем любую карту.
        // уже угаданную парную карту не нужно ставить в следущую
        // eslint-disable-next-line no-param-reassign
        nextCard =
          (pairCard?.key === prevCard?.key || pairCard?.count >= level) && pairCard?.status !== ECardStatus.Guessed
            ? pairCard
            : undefined;

        autoplay(notGuessedCards, chosenCard, nextCard);
      }, 800);
    } else {
      setTimeout(() => {
        onGameStart();
      }, 800);
    }
  };

  const onAutoplayHandler = () => {
    dispatch(setAutoplay(true));
    autoplay(cards);
  };

  return (
    <>
      <GameControls getFocusRef={(ref) => setFocusRef(ref)} />
      <Layout fullWidth>
        <div className={classes.game}>
          {listToArray(cards, 4).map((cardsRow: ICard[]) => (
            <div key={cardsRow[0].key}>
              {cardsRow.map((card) => (
                <Card onCardClick={() => onCardSelectHandler(card)} key={card.key} card={card} />
              ))}
            </div>
          ))}
        </div>
        {level === 1 && !isAutoplay && <Button onClick={onAutoplayHandler}>See how to play</Button>}
      </Layout>
    </>
  );
};

export default Game;
