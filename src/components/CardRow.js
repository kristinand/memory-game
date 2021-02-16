import React from 'react';
import Card from './Card/Card';

const styles = {
  display: 'flex',
  gap: '1rem',
  flex: 1,
  maxHeight: '250px',
  justifyContent: 'space-between',
};

const cardRow = (props) => {
  return (
    <div style={styles}>
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

export default cardRow;
