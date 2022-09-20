import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IErrorResponse, ServerResponse, ServerError } from './types';
import instance from './instance';

export const HandleResponseErrors: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const responseInterceptor = instance.interceptors.response.use(
      (res: ServerResponse<IErrorResponse>) => res,
      (err: ServerError<IErrorResponse>) => {
        const message = err.response?.data?.message || err.message || 'Something went wrong';
        toast.error(message, {
          theme: 'colored',
          position: 'bottom-right',
          hideProgressBar: true,
          closeOnClick: true,
          draggable: false,
        });
      },
    );

    return () => {
      if (responseInterceptor) {
        instance.interceptors.response.eject(responseInterceptor);
      }
    };
  }, [dispatch]);

  return <ToastContainer limit={1} style={{ marginBottom: '50px' }} />;
};
