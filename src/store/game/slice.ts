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

interface IChangeCardStatus {
  status: ECardStatus;
  selectedCard: ICard;
  oldCard?: ICard;
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

const updateCardStatus = (state: IGame, action: IChangeCardStatus): ICard[] => {
  const { selectedCard, oldCard, status } = action;
  const { cards } = state;

  const selectedCardId = cards.findIndex(({ key }) => key === selectedCard.key);

  if (status !== ECardStatus.Closed) {
    cards[selectedCardId].count += 1;
  }

  // in case of all statuses, selected card:
  cards[selectedCardId].status = status;

  // opened can be only one card
  if (oldCard && status !== ECardStatus.Opened) {
    const oldCardId = cards.findIndex(({ key }) => key === oldCard.key);
    cards[oldCardId].status = status;
  }

  return cards;
};

const initialState: IGame = {
  isGamePaused: true,
  isAutoplay: false,
  level: 1,
  cards: createCards(1),
  score: 0,
};

export const slice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    loadLocalGameData(state, { payload }: { payload: Partial<IGame> }) {
      return { ...state, ...payload };
    },
    startGame() {
      return initialState;
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
    changeCardStatus(state, { payload }: { payload: IChangeCardStatus }) {
      state.cards = updateCardStatus(state, payload);
      state.isGamePaused = false;
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
  changeCardStatus,
  saveCurrentScore,
  setAutoplay,
} = slice.actions;

export const selectGameData = (state: RootState): IGame => state.game;

export default slice.reducer;
