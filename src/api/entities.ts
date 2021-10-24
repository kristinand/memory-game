export interface ISuccess<T = null> {
  status: 'success';
  content: T;
}

export interface IError {
  status: 'fail' | 'error';
  message: string;
  stack?: string;
  error?: Error;
}

export type IResponse<T = null> = ISuccess<T> | IError;

export interface IRating {
  _id: string;
  player: string;
  date: string;
  score: number;
}

export interface IPlayerRatingResponse {
  rating: IRating;
  position: number;
}

export interface ILoadRatingsResponse {
  ratings: IRating[];
  total: number;
}
