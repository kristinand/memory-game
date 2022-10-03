const path = require('path');
const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const commonConfig = require('./webpack.common.js');

const config = {
  mode: process.env.NODE_ENV || 'none',
  target: 'node',
  entry: path.resolve(__dirname, 'ssr/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '',
  },
  externals: [nodeExternals()],
};

module.exports = merge(commonConfig, config);
