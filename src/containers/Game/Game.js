import React, { useState, useEffect } from 'react';
import { getRandomNumber, shuffleList, generateRandomColor, listToArray } from '../../utils/functions';
import CardRow from '../../components/CardRow/CardRow';

const game = (props) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    console.log('effect');
    let cards = [];
    cards = fillCards(cards);
    cards = shuffleList(cards);
    cards = listToArray(cards, 4);
    console.log(cards);
    setCards(cards);
  }, []);

  const fillCards = (cards) => {
    let patterns = ['☯', '◑', '◐', '◒', '◓', '♡', '♥', '☁', '☀', '♨', '♦', '❀'];
    const coverColor = generateRandomColor(100, 170);

    for (let i = 0; i < props.level * 2; i++) {
      const color = generateRandomColor(5, 250);
      const patternNumber = getRandomNumber(0, patterns.length);
      const pattern = patterns[patternNumber];
      patterns = [...patterns.slice(0, patternNumber), ...patterns.slice(patternNumber + 1)];
      cards.push({ key: '1' + i, color: color, pattern: pattern, coverColor: coverColor });
      cards.push({ key: '2' + i, color: color, pattern: pattern, coverColor: coverColor });
    }
    return cards;
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', height: '70vh', justifyContent: 'center' }}>
      {cards.map((cardsRow, i) => <CardRow key={i} cards={cardsRow}/>)}
    </div>
  );
};

export default game;
