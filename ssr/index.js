import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import babelRegister from '@babel/register';
import cookieParser from 'cookie-parser';
import proxy from 'express-http-proxy';
import 'ignore-styles';
import renderer from './renderReact';

babelRegister({
  ignore: [/(node_module)/],
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-react',
  ],
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  plugins: [
    [
      'file-loader',
      {
        name: '[hash].[ext]',
        extensions: ['png', 'jpg', 'jpeg', 'gif', 'opus'],
      },
    ],
    ['babel-plugin-webpack-alias', { config: '../webpack.config.js' }],
    '@babel/plugin-transform-runtime',
  ],
});

dotenv.config({ path: path.resolve('.env') });

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(
    '/api',
    proxy(`http://localhost:${process.env.PORT}}/api`),
  );
}
app.use(cookieParser());
app.get(/\.(js|css|map|ico|png|opus|gif)$/, express.static(path.resolve('public')));

app.use('*', renderer);

app.listen('9000', () => {
  console.log('Express server started at <http://localhost:9000>');
});
