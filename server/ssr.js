require('ignore-styles');

require('@babel/register')({
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

require('./renderReact.js');
