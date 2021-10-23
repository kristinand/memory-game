import { IRating } from 'entities';

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

export interface ILoadRatingsResponse {
  ratings: IRating[];
}
