import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { IErrorResponse, ServerResponse, ServerError } from './entities';
import instance from './instance';

export const HandleResponseErrors: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const responseInterceptor = instance.interceptors.response.use(
      (res: ServerResponse<IErrorResponse>) => res,
      (err: ServerError<IErrorResponse>) => {
        const message = err.response?.data?.message || err.message || 'Something went wrong';
        // TODO: заменить
        alert(message);
      },
    );

    return () => {
      if (responseInterceptor) {
        instance.interceptors.response.eject(responseInterceptor);
      }
    };
  }, [dispatch]);

  return <></>;
};
