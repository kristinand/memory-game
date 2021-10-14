import { ICard } from 'entities/';
import { fillCards } from './fillCards';
import { shuffleList } from './shuffleList';

export const createCards = (level: number, coverColor: string): ICard[] => {
  let cards: ICard[] = [];
  cards = fillCards(cards, level, coverColor);
  cards = shuffleList(cards) as ICard[];
  return cards;
};
