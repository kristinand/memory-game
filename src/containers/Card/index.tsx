import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { ECardStatus, ICard } from 'entities/';
import { IState } from 'store/entities';
import audio from 'assets/card-click.opus';
import classes from './classes.module.scss';

interface IProps {
  card: ICard;
  onCardClick: () => void;
}

const Card: React.FC<IProps> = ({ card, onCardClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { soundVolume, isPatternShown, theme } = useSelector((state: IState) => state.settings);
  const clickAudio = new Audio(audio);

  useEffect(() => {
    if (card.status === ECardStatus.Closed) {
      setIsOpen(false);
    } else {
      clickAudio.volume = soundVolume;
      void clickAudio.play();
      setIsOpen(true);
    }
  }, [card.status]);

  return (
    <div className={classNames(classes.card, { [classes.opened]: isOpen })}>
      <button
        type="button"
        onClick={card.status === ECardStatus.Closed ? onCardClick : undefined}
        className={classNames(classes.innerCard, classes[theme], { [classes.opened]: isOpen })}
      >
        <div className={classes.cardCover} style={{ backgroundColor: card.coverColor }}>
          <span>?</span>
        </div>
        <div className={classes.cardFace} style={{ backgroundColor: card.color }}>
          {isPatternShown && <span className={classes.pattern}>{card.pattern}</span>}
        </div>
      </button>
    </div>
  );
};

export default Card;
