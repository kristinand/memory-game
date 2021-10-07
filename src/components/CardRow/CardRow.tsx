import React from 'react';

import { ICard } from 'entities/interfaces';
import Card from '../Card/Card';
import classes from './CardRow.css';

interface IProps {
  cards: ICard[];
  onCardClick: (key: string) => void;
}

const CardRow: React.FC<IProps> = ({ cards, onCardClick }) => (
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
