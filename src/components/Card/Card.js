import React, {  useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import classes from './Card.css';
import audio from '@assets/card-click.opus';

let cx = classNames.bind(classes);

const Card = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { soundVolume, isPatternShown } = useSelector((state) => state.settings);
  const clickAudio = new Audio(audio);

  useEffect(() => {
    if (props.status === 'closed') {
      setIsOpen(false);
    } else {
      clickAudio.volume = soundVolume;
      clickAudio.play();
      setIsOpen(true);
    }
  }, [props.status]);

  const cardClass = cx({
    Card: true,
    opened: isOpen,
    closed: !isOpen
  })

  return (
    <div className={classes.wrapper}>
      <div onClick={props.onCardClick} className={cardClass}>
        <div className={classes.CardCover} style={{ backgroundColor: props.coverColor }}>
          <span>?</span>
        </div>
        <div className={classes.CardColor} style={{ backgroundColor: props.color }}>
          {isPatternShown ? <span className={'pattern'}>{props.pattern}</span> : ''}
        </div>
      </div>
    </div>
  );
};

export default Card;
