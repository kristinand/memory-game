import { createSlice } from '@reduxjs/toolkit';

import { ECardStatus, ICard } from 'types/';
import { CARD_PATTERNS } from 'utils/constants';
import { shuffleList, getRandomNumber, getRandomColor } from 'utils/functions';
import { RootState } from '..';
import { saveScore } from './thunks/saveScore';

export interface IGame {
  isAutoplay: boolean;
  level: number;
  cards: ICard[];
  score: number;
}

const createCards = (level = 1): ICard[] => {
  const cards: ICard[] = [];
  const coverColor = getRandomColor();
  const cardPairsNumber = level * 2 + 2;
  let patterns = CARD_PATTERNS;

  for (let i = 0; i < cardPairsNumber; i++) {
    const color = getRandomColor();
    const patternNumber = getRandomNumber(0, patterns.length);
    const pattern = patterns[patternNumber];
    patterns = [...patterns.slice(0, patternNumber), ...patterns.slice(patternNumber + 1)];
    const card = { color, pattern, coverColor, status: ECardStatus.Closed, count: 0 };
    cards.push({
      id: `${i}${level}1`,
      ...card,
    });
    cards.push({
      id: `${i}${level}2`,
      ...card,
    });
  }

  return shuffleList(cards);
};

const getInitialState = (): IGame => ({
  isAutoplay: false,
  level: 1,
  cards: createCards(),
  score: 0,
});

export const slice = createSlice({
  name: 'game',
  initialState: getInitialState(),
  reducers: {
    loadLocalGameData(state, { payload }: { payload: Partial<IGame> }) {
      return { ...state, ...payload };
    },
    startGame() {
      return getInitialState();
    },
    loadNextLevel(state) {
      const nextLevel = state.level + 1;
      state.cards = createCards(nextLevel);
      state.level = nextLevel;
    },
    updateCards(state, { payload }: { payload: { status: ECardStatus; indexes: number[] } }) {
      const { status, indexes } = payload;
      indexes.forEach((index) => {
        state.cards[index].status = status;
      });
    },
    increaseCountBy1(state, { payload }: { payload: number }) {
      state.cards[payload].count += 1;
    },
    saveCurrentScore(state, { payload }: { payload: number }) {
      state.score = payload;
    },
    setAutoplay(state, { payload }: { payload: boolean }) {
      state.isAutoplay = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveScore.fulfilled, () => {
      // TODO:
    });
  },
});

export const {
  loadLocalGameData,
  startGame,
  loadNextLevel,
  updateCards,
  increaseCountBy1,
  saveCurrentScore,
  setAutoplay,
} = slice.actions;

export const selectGameData = (state: RootState): IGame => state.game;

export default slice.reducer;
