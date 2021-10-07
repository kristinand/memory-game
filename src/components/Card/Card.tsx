import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import audio from 'assets/card-click.opus';
import { ECardStatus } from '../../entities/enums';
import { IState } from '../../entities/interfaces';
import classes from './Card.css';

const cx = classNames.bind(classes);

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
      clickAudio.play();
      setIsOpen(true);
    }
  }, [status]);

  const cardClass = cx({
    Card: true,
    opened: isOpen,
    closed: !isOpen,
  });

  return (
    <div className={classes.wrapper}>
      <div onClick={onCardClick} className={cardClass}>
        <div className={classes.CardCover} style={{ backgroundColor: coverColor }}>
          <span>?</span>
        </div>
        <div className={classes.CardColor} style={{ backgroundColor: color }}>
          {isPatternShown && <span className="pattern">{pattern}</span>}
        </div>
      </div>
    </div>
  );
};

export default Card;
