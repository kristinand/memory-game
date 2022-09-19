import { AxiosRequestConfig, AxiosPromise, AxiosResponse, AxiosError } from 'axios';

export interface ISuccessResponse<T = null> {
  status: 'success';
  content: T;
}

export interface IErrorResponse {
  status: 'fail' | 'error';
  message: string;
  stack?: string;
  error?: Error;
}

export type ServerRequestConfig = AxiosRequestConfig;
export type ServerResponse<T> = AxiosResponse<T>;
export type ServerPromise<T> = AxiosPromise<T>;
export type ServerError<T> = AxiosError<T>;

export interface IRating {
  _id: string;
  player: string;
  date: string;
  score: number;
}

export interface IGetRatingsRequest {
  page?: number;
  limit?: number;
}

export interface ISavePlayerScoreRequest {
  player: string;
  score: number;
}

export interface IPlayerRatingResponse {
  rating: IRating;
  position: number;
}

export interface IGetRatingsResponse {
  ratings: IRating[];
  total: number;
}
