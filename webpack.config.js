const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: ['@babel/polyfill', './server/index.js'],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'ssrBundle.js'
  },
  target: 'node',
  node: {
    __dirname: false
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['@babel/env', '@babel/react'],
          plugins: [
            'syntax-dynamic-import',
            'dynamic-import-node',
            'react-loadable/babel',
            '@babel/plugin-proposal-class-properties'
          ],
        }
      },
      {
        test: /\.css$/,
        loader: 'css-loader/locals'
      },
      {
        test: /\.(ttf|eot|otf|jpg|svg|png)$/,
        loader: 'file-loader',
        options: {
            name: '[path][name].[ext]'
        }
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url-loader?emitFile=false'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        REACT_APP_ETH_NETWORK: JSON.stringify(process.env.REACT_APP_ETH_NETWORK),
        PORT: JSON.stringify(process.env.PORT)
      },
    }),
  ],
}