import React, { useState, useEffect } from 'react';
import { getRandomNumber, shuffleList, generateRandomColor, listToArray } from '../../utils/functions';
import CardRow from '../../components/CardRow';

const game = (props) => {
  const [cards, setCards] = useState([]);
  const [openCard, setOpenCard] = useState('');

  useEffect(() => {
    let cards = [];
    cards = fillCards(cards);
    cards = shuffleList(cards);

    setCards(cards);
    setOpenCard('');
  }, [props.level]);

  const fillCards = (cards) => {
    let patterns = ['☯', '◑', '◐', '◒', '◓', '♡', '♥', '☁', '☀', '♨', '♦', '❀'];

    for (let i = 0; i < props.level * 2; i++) {
      const color = generateRandomColor();
      const keyPart = Math.ceil(Math.random() * 100000);
      const patternNumber = getRandomNumber(0, patterns.length);
      const pattern = patterns[patternNumber];
      patterns = [...patterns.slice(0, patternNumber), ...patterns.slice(patternNumber + 1)];
      cards.push({
        key: '1' + props.level + i + keyPart,
        color: color,
        pattern: pattern,
        coverColor: props.coverColor,
        isOpen: false,
        isGuessed: false,
      });
      cards.push({
        key: '2' + props.level + i + keyPart,
        color: color,
        pattern: pattern,
        coverColor: props.coverColor,
        isOpen: false,
        isGuessed: false,
      });
    }
    return cards;
  };

  const onCardSelectHandler = (key) => {
    const selectedCard = cards[cards.findIndex((card) => card.key === key)];
    if (selectedCard.isGuessed || selectedCard.isOpen) return;

    if (!openCard && !selectedCard.isOpen) {
      setOpenCard(key);
      selectedCard.isOpen = true;
      return;
    }

    const oldCard = cards[cards.findIndex((card) => card.key === openCard)];
    if (openCard.slice(1) == key.slice(1)) {
      selectedCard.isOpen = true;
      oldCard.isGuessed = true;
      selectedCard.isGuessed = true;
      setOpenCard('');
    } else {
      oldCard.isOpen = false;
      selectedCard.isOpen = true;
      setOpenCard(key);
    }
    // console.log(cards);
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', height: '70vh', justifyContent: 'center' }}>
      {listToArray(cards, 4).map((cardsRow, i) => (
        <CardRow key={i} cards={cardsRow} onCardClick={onCardSelectHandler} />
      ))}
    </div>
  );
};

export default game;
