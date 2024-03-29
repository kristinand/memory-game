const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: ['@babel/polyfill', './index.tsx'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[hash].js',
    assetModuleFilename: '[name][ext]',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
    alias: {
      api: path.resolve(__dirname, 'src/api/'),
      assets: path.resolve(__dirname, 'src/assets/'),
      utils: path.resolve(__dirname, 'src/utils/'),
      types: path.resolve(__dirname, 'src/types/'),
      pages: path.resolve(__dirname, 'src/pages/'),
      components: path.resolve(__dirname, 'src/components/'),
      store: path.resolve(__dirname, 'src/store/'),
      styles: path.resolve(__dirname, 'src/styles/'),
    },
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'index.html',
      collapseWhitespace: process.env.NODE_ENV === 'production',
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve(__dirname, 'src/assets/favicon.png'), to: path.resolve(__dirname, 'public') }],
    }),
  ],
  devServer: {
    port: 3000,
    open: false,
    historyApiFallback: true,
    contentBase: './',
    hot: true,
  },
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(s[ac]ss)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-modules-typescript-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|opus)$/,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: 'asset/inline',
      },
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
