import { AxiosRequestConfig, AxiosResponse } from 'axios';
import instance from './instance';

export const request = <T>(config: AxiosRequestConfig): Promise<T> =>
  instance(config).then((response: AxiosResponse<T>) => response.data);
