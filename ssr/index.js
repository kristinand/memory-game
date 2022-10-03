import express from 'express';
import path from 'path';
import babelRegister from '@babel/register';
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

const app = express();
app.get(/\.(js|css|map|ico|png|opus|gif)$/, express.static(path.resolve('public')));

app.use('*', renderer);

app.listen('9000', () => {
  console.log('Express server started at <http://localhost:9000>');
});
