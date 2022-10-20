import React from 'react';
import { useSelector } from 'react-redux';
import { ECardStatus, ICard } from 'types/';
import { listToArray } from 'utils/functions';
import { useAudio } from 'utils/hooks';
import { selectGameData } from 'store/game/slice';
import { selectSettings } from 'store/settings/slice';
import Layout from 'components/Layout';
import Button from 'components/Button';
import Card from 'components/Card';
import GameControls from 'components/GameControls';
import { usePlay } from './usePlay';
import { useAutoplay } from './useAutoplay';
import classes from './classes.module.scss';

const Game: React.FC = () => {
  const { cards, level, isAutoplay, score } = useSelector(selectGameData);
  const { soundVolume } = useSelector(selectSettings);
  const { onSelectCard, isGameStarted } = usePlay();
  const { start: startAutoplay, stop: stopAutoplay } = useAutoplay();
  const sound = useAudio('sound', { volume: soundVolume });

  const onCardSelectHandler = (selectedCard: ICard) => {
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
      header={<GameControls isGameStarted={isGameStarted} />}
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
        <Button className={classes.autoplay} onClick={isAutoplay ? stopAutoplay : startAutoplay}>
          {isAutoplay ? 'Stop autoplay' : 'Watch how to play'}
        </Button>
      )}
    </Layout>
  );
};

export default Game;
