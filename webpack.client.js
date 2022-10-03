const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const config = {
  entry: ['@babel/polyfill', './index.tsx'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[hash].js',
    publicPath: '',
  },
  devServer: {
    port: 3000,
    open: false,
    historyApiFallback: true,
    contentBase: './',
    hot: true,
  },
  devtool: 'eval-cheap-module-source-map',
};

module.exports = merge(commonConfig, config);
