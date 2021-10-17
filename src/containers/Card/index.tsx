import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { ECardStatus } from 'entities/';
import { IState } from 'store/entities';
import audio from 'assets/card-click.opus';
import classes from './classes.module.scss';

interface IProps {
  status: ECardStatus;
  color: string;
  pattern: string;
  onCardClick: () => void;
}

const Card: React.FC<IProps> = ({ status, onCardClick, color, pattern }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { soundVolume, isPatternShown, theme } = useSelector((state: IState) => state.settings);
  const { coverColor } = useSelector((state: IState) => state.game);
  const clickAudio = new Audio(audio);

  useEffect(() => {
    if (status === ECardStatus.Closed) {
      setIsOpen(false);
    } else {
      clickAudio.volume = soundVolume;
      void clickAudio.play();
      setIsOpen(true);
    }
  }, [status]);

  return (
    <button
      type="button"
      onClick={onCardClick}
      className={classNames(classes.card, classes[theme], { [classes.opened]: isOpen })}
    >
      <div className={classes.cardCover} style={{ backgroundColor: coverColor }}>
        <span>?</span>
      </div>
      <div className={classes.cardFace} style={{ backgroundColor: color }}>
        {isPatternShown && <span className={classes.pattern}>{pattern}</span>}
      </div>
    </button>
  );
};

export default Card;
