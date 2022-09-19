import { createSlice } from '@reduxjs/toolkit';

import { ECardStatus, ICard } from 'entities/';
import { CARD_PATTERNS } from 'constants/';
import { shuffleList, getRandomNumber, getRandomColor } from 'utils/functions';
import { RootState } from '..';
import { saveScore } from './thunks/saveScore';

export interface IGame {
  isGamePaused: boolean;
  isAutoplay: boolean;
  level: number;
  cards: ICard[];
  score: number;
}

const createCards = (level: number): ICard[] => {
  let cards: ICard[] = [];

  let patterns = CARD_PATTERNS;
  const coverColor = getRandomColor();

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

const getInitialState = (): IGame => ({
  isGamePaused: true,
  isAutoplay: false,
  level: 1,
  cards: createCards(1),
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
      state.isGamePaused = true;
    },
    setIsGamePaused(state, { payload }: { payload: boolean }) {
      state.isGamePaused = payload;
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
  setIsGamePaused,
  updateCards,
  increaseCountBy1,
  saveCurrentScore,
  setAutoplay,
} = slice.actions;

export const selectGameData = (state: RootState): IGame => state.game;

export default slice.reducer;
