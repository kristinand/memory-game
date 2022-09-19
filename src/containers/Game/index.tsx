import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ECardStatus, ICard } from 'entities/';
import { listToArray } from 'utils/functions';
import { selectGameData, setIsGamePaused, startGame } from 'store/game/slice';
import { selectSettings } from 'store/settings/slice';
import { usePlayerData, useAudio } from 'utils/hooks';

import Layout from 'components/Layout';
import Button from 'components/Button';
import Card from '../Card';
import GameControls from '../GameControls';
import { usePlay } from './usePlay';
import { useAutoplay } from './useAutoplay';
import classes from './classes.module.scss';

const Game: React.FC = () => {
  const dispatch = useDispatch();
  const { cards, level, isAutoplay, isGamePaused, score } = useSelector(selectGameData);
  const { musicVolume, soundVolume } = useSelector(selectSettings);
  const [focusRef, setFocusRef] = useState<HTMLDivElement>();
  const { deletePlayerData } = usePlayerData();
  const { onSelectCard } = usePlay();
  const { start: startAutoplay, stop: stopAutoplay } = useAutoplay();
  const sound = useAudio('sound', { volume: soundVolume });
  const music = useAudio('music', { volume: musicVolume, loop: true }, true);

  useEffect(() => {
    music.volume = musicVolume;
  }, [musicVolume, music]);

  const resetGame = () => {
    deletePlayerData('game');
    dispatch(startGame());
  };

  useEffect(() => {
    if (!cards.length) resetGame();
  }, []);

  const onCardSelectHandler = (selectedCard: ICard) => {
    focusRef.focus();

    if (selectedCard.status === ECardStatus.Closed && !isAutoplay) {
      if (isGamePaused) dispatch(setIsGamePaused(false));
      sound.replay();
      onSelectCard(cards, selectedCard);
    }
  };

  return (
    <>
      <GameControls getFocusRef={setFocusRef} />
      <Layout fullWidth noBottomPadding>
        <div className={classes.game}>
          {listToArray(cards, 4).map((cardsRow: ICard[]) => (
            <div key={cardsRow[0].key}>
              {cardsRow.map((card) => (
                <Card onClick={() => onCardSelectHandler(card)} key={card.key} card={card} />
              ))}
            </div>
          ))}
        </div>
        {((level === 1 && !score && !isAutoplay) || isAutoplay) && (
          <Button onClick={isAutoplay ? stopAutoplay : startAutoplay}>
            {isAutoplay ? 'Stop autoplay' : 'Watch how to play'}
          </Button>
        )}
      </Layout>
    </>
  );
};

export default Game;
