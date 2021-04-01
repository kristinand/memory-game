import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import audio from '@assets/card-click.opus';
import classes from './Card.css';

const cx = classNames.bind(classes);

const Card = (props) => {
  const { status, onCardClick, coverColor, color, pattern } = props;

  const [isOpen, setIsOpen] = useState(false);
  const { soundVolume, isPatternShown } = useSelector((state) => state.settings);
  const clickAudio = new Audio(audio);

  useEffect(() => {
    if (status === 'closed') {
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
          {isPatternShown ? <span className="pattern">{pattern}</span> : ''}
        </div>
      </div>
    </div>
  );
};

export default Card;

Card.propTypes = {
  color: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  coverColor: PropTypes.string.isRequired,
  pattern: PropTypes.string.isRequired,
  onCardClick: PropTypes.func.isRequired,
};
