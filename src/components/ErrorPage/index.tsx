import React from 'react';

import Header from 'components/Header';
import Layout from 'components/Layout';

interface IProps {
  message: string;
}

const ErrorPage: React.FC<IProps> = ({ message }) => (
  <>
    <Header />
    <Layout fullWidth centered>
      <p>{message}</p>
    </Layout>
  </>
);

export default ErrorPage;
