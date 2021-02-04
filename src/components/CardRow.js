import React from 'react';
import styled from 'styled-components';
import Card from './Card/Card';

const CardRow = styled.div`
  display: flex;
  gap: 1rem;
  flex: 1;
  max-height: 250px;
  justifycontent: space-between;
`;

const cardRow = (props) => {
  return (
    <CardRow>
      {props.cards.map((card) => (
        <Card key={card.key} color={card.color} pattern={card.pattern} coverColor={card.coverColor} />
      ))}
    </CardRow>
  );
};

export default cardRow;
