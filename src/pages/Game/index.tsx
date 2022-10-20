import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ECardStatus, ICard } from 'types/';
import { listToArray } from 'utils/functions';
import { usePlayerData, useAudio } from 'utils/hooks';
import { selectGameData, startGame } from 'store/game/slice';
import { selectSettings } from 'store/settings/slice';
import Layout from 'components/Layout';
import Button from 'components/Button';
import Card from 'components/Card';
import GameControls from 'components/GameControls';
import { usePlay } from './usePlay';
import { useAutoplay } from './useAutoplay';
import classes from './classes.module.scss';

const Game: React.FC = () => {
  const { state } = useLocation() as { state: { isContinue: boolean } };
  const dispatch = useDispatch();
  const { cards, level, isAutoplay, score } = useSelector(selectGameData);
  const { musicVolume, soundVolume } = useSelector(selectSettings);
  const [focusRef, setFocusRef] = useState<HTMLDivElement>();
  const { deletePlayerData } = usePlayerData();
  const { onSelectCard, isGameStarted } = usePlay();
  const { start: startAutoplay, stop: stopAutoplay } = useAutoplay();
  const sound = useAudio('sound', { volume: soundVolume });
  const music = useAudio('music', { volume: musicVolume, loop: true }, true);

  useEffect(() => {
    music.volume = musicVolume;
  }, [musicVolume, music]);

  useEffect(() => {
    if (!state?.isContinue) {
      deletePlayerData('game');
      dispatch(startGame());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isContinue, dispatch]);

  const onCardSelectHandler = (selectedCard: ICard) => {
    focusRef.focus();

    if (selectedCard.status === ECardStatus.Closed && !isAutoplay) {
      sound.replay();
      onSelectCard(cards, selectedCard);
    }
  };

  return (
    <Layout
      fullWidth
      noBottomPadding
      showFooter={false}
      header={<GameControls getFocusRef={setFocusRef} isContinue={state.isContinue} isGameStarted={isGameStarted} />}
    >
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
  );
};

export default Game;
