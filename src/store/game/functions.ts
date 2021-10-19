import { shuffleList, getRandomNumber, getRandomColor } from 'utils/functions';
import { cardPatterns } from 'constants/';
import { ECardStatus, ICard } from 'entities/';
import { IChangeCardStatus, IGame, ILoadLevel } from './entities';

export const createCards = (level: number, coverColor: string): ICard[] => {
  let cards: ICard[] = [];

  let patterns = cardPatterns;
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

  // in case of all statuses, selected card:
  selectedCard.status = status;
  selectedCard.count += 1;

  // opened can be only one card
  if (status !== ECardStatus.Opened) {
    oldCard.status = status;
  }

  if (status === ECardStatus.Guessed) {
    cardsToWin -= 2;
  }
  return { ...state, cardsToWin, isGamePaused: false };
};

export const loadLevel = (state: IGame, { param }: ILoadLevel): IGame => {
  let { level } = state;
  if (param === 'inc') {
    level += 1;
  } else if (param === 'dec') {
    level -= 1;
  }
  const coverColor = getRandomColor(40, 40, 60, 60);
  const cards = createCards(level, state.coverColor);
  return {
    ...state,
    cards,
    level,
    coverColor,
    cardsToWin: cards.length,
    isGamePaused: true,
  };
};

export const startGame = (state: IGame): IGame => {
  localStorage.removeItem('gameData');
  const coverColor = getRandomColor(40, 40, 60, 60);
  const cards = createCards(1, coverColor);
  return {
    ...state,
    coverColor,
    cards,
    cardsToWin: cards.length,
    level: 1,
    score: 0,
    isGamePaused: true,
    isGameEnded: false,
    isAutoplay: false,
  };
};
