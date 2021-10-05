export interface IState {
  level: number;
  cards: any[];
  coverColor: string;
  cardsToWin: null | number;
  isGamePaused: boolean;
  isGameEnded: boolean;
  isLoggedIn: boolean;
  isAutoplay: boolean;
  player: string;
  score: number;
  levels: number;
  settings: ISettings;
}

interface ISettings {
  bgColor: string;
  isPatternShown: boolean;
  musicVolume: number;
  soundVolume: number;
  keys: IKeys;
}

interface IKeys {
  music: string;
  sounds: string;
  reload: string;
  fullscreen: string;
  pause: string;
}
