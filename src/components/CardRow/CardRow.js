import React from 'react';
import Card from '../Card/Card';

const cardRow = (props) => {
  return (
    <div style={{ display: 'flex', gap: '1rem', flex: '1', maxHeight: '250px', justifyContent: 'space-between' }}>
      {props.cards.map((card) => (
        <Card key={card.key} color={card.color} pattern={card.pattern} coverColor={card.coverColor} />
      ))}
    </div>
  );
};

export default cardRow;
