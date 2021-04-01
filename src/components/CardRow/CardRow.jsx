import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import classes from './CardRow.css';

const CardRow = ({ cards, onCardClick }) => (
  <div className={classes.CardRow}>
    {cards.map((card) => (
      <Card
        onCardClick={() => onCardClick(card.key)}
        key={card.key}
        color={card.color}
        pattern={card.pattern}
        coverColor={card.coverColor}
        status={card.status}
      />
    ))}
  </div>
);

export default CardRow;

CardRow.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCardClick: PropTypes.func.isRequired,
};
