import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import { ECardStatus } from 'entities/';
import { IState } from 'store/entities';
import audio from 'assets/card-click.opus';
import classes from './classes.module.scss';

interface IProps {
  status: ECardStatus;
  coverColor: string;
  color: string;
  pattern: string;
  onCardClick: () => void;
}

const Card: React.FC<IProps> = ({ status, onCardClick, coverColor, color, pattern }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { soundVolume, isPatternShown } = useSelector((state: IState) => state.settings);
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
    <div className={classes.wrapper}>
      <button
        type="button"
        onClick={onCardClick}
        className={classNames(classes.Card, { [classes.cardOpened]: isOpen })}
      >
        <div className={classes.CardCover} style={{ backgroundColor: coverColor }}>
          <span>?</span>
        </div>
        <div className={classes.CardColor} style={{ backgroundColor: color }}>
          {isPatternShown && <span className={classes.pattern}>{pattern}</span>}
        </div>
      </button>
    </div>
  );
};

export default Card;
