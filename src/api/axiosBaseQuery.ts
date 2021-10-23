import { AxiosRequestConfig, AxiosError } from 'axios';
import instance from './instance';
import { IError, IResponse, ISuccess } from './entities';

const axiosBaseQuery = async <T = null>({
  url,
  method = 'GET',
  data,
  params,
}: AxiosRequestConfig): Promise<IResponse<T>> => {
  try {
    const result = await instance.request<ISuccess<T>>({
      url,
      method,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      params,
    });

    return result.data;
  } catch (axiosError) {
    const error = (axiosError as AxiosError<IError>).response.data;
    console.log(error);
    return error;
  }
};

export default axiosBaseQuery;
