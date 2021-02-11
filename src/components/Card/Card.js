import React, { useRef, useEffect } from 'react';
import classes from './Card.css';

const card = (props) => {
  const cardRef = useRef();

  useEffect(() => {
    props.status === 'closed' ?  closeCard(cardRef.current) : openCard(cardRef.current);
  }, [props.status]);

  const openCard = (card) => {
    card.style.transform = 'rotateY(180deg)';
    card.style.boxShadow = '-2px 2px 0.1em 3px hsla(0, 0%, 70%, 0.3)';
  };

  const closeCard = (card) => {
    card.style.transform = 'rotateY(0deg)';
    card.style.boxShadow = '2px 2px 0.1em 3px hsla(0, 0%, 70%, 0.3)';
  };

  return (
    <div className={classes.wrapper}>
      <div ref={cardRef} onClick={props.onCardClick} className={['Card', classes.Card].join(' ')}>
        <div className={classes.CardCover} style={{ backgroundColor: props.coverColor }}>
          <span>?</span>
        </div>
        <div className={classes.CardColor} style={{ backgroundColor: props.color }}>
          <span className={'pattern'}>{props.pattern}</span>
        </div>
      </div>
    </div>
  );
};

export default card;
