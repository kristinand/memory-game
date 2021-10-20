import { shuffleList, getRandomNumber, getRandomColor } from 'utils/functions';
import { CARD_PATTERNS } from 'constants/';
import { ECardStatus, ICard } from 'entities/';
import { IChangeCardStatus, IGame } from './entities';

export const createCards = (level: number, coverColor: string): ICard[] => {
  let cards: ICard[] = [];

  let patterns = CARD_PATTERNS;
  for (let i = 0; i < level * 2 + 2; i++) {
    const key1 = `${level}${i}${Math.ceil(Math.random() * 100000)}`;
    const key2 = `${level}${i}${Math.ceil(Math.random() * 100000)}`;
    const color = getRandomColor();
    const patternNumber = getRandomNumber(0, patterns.length);
    const pattern = patterns[patternNumber];
    patterns = [...patterns.slice(0, patternNumber), ...patterns.slice(patternNumber + 1)];
    const card = { color, pattern, coverColor, status: ECardStatus.Closed, count: 0 };
    cards.push({
      key: key1,
      pairKey: key2,
      ...card,
    });
    cards.push({
      key: key2,
      pairKey: key1,
      ...card,
    });
  }

  cards = shuffleList(cards);
  return cards;
};

export const updateCardStatus = (state: IGame, action: IChangeCardStatus): IGame => {
  const { selectedCard, oldCard, status } = action;
  let { cardsToWin } = state;

  if (status !== ECardStatus.Closed) {
    selectedCard.count += 1;
  }

  // in case of all statuses, selected card:
  selectedCard.status = status;

  // opened can be only one card
  if (status !== ECardStatus.Opened) {
    oldCard.status = status;
  }

  if (status === ECardStatus.Guessed) {
    cardsToWin -= 2;
  }
  return { ...state, cardsToWin, isGamePaused: false };
};

export const loadNextLevel = (state: IGame): IGame => {
  const nextLevel = state.level + 1;
  const coverColor = getRandomColor();
  const cards = createCards(nextLevel, coverColor);
  return {
    ...state,
    cards,
    level: nextLevel,
    coverColor,
    cardsToWin: cards.length,
    isGamePaused: true,
  };
};
