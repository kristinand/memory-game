import { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import instance from './instance';

const axiosBaseQuery = async ({
  url,
  method = 'GET',
  data,
  params,
}: AxiosRequestConfig): Promise<Partial<AxiosResponse>> => {
  try {
    const result = await instance.request({
      url,
      method,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      params,
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError as AxiosError;

    return {
      status: err.response?.status,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: err.response?.data,
    };
  }
};

export default axiosBaseQuery;
