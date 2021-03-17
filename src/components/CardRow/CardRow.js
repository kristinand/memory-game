import React from 'react';
import Card from '../Card/Card';
import classes from './CardRow.css'

const CardRow = (props) => {
  return (
    <div className={classes.CardRow}>
      {props.cards.map((card) => (
        <Card
          onCardClick={() => props.onCardClick(card.key)}
          key={card.key}
          color={card.color}
          pattern={card.pattern}
          coverColor={card.coverColor}
          status={card.status}
        />
      ))}
    </div>
  );
};

export default CardRow;
