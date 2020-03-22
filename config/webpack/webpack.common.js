const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const basePath = `${__dirname}/../..`;
const Dotenv = require('dotenv-webpack');

module.exports = {
  context: path.join(basePath, 'src'),
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      common: path.join(basePath, 'src/common/'),
      api: path.join(basePath, 'src/api/'),
      styles: path.join(basePath, 'src/styles/'),
    }
  },
  entry: ['./index.tsx'],
  output: {
    path: path.join(basePath, 'dist'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
      {
        test: /\.(png|jpg|ico|gif)?$/,
        loader: 'url-loader?limit=10000',
      },
      {
        include: /node_modules\/react-dom/,
        test: /\.jsx?$/,
        use: {
          loader: 'react-hot-loader/webpack',
          options: {
            noRegister: true,
          },
        },
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: 'index.html', //Name of template in ./src
      hash: true
    }),
    new Dotenv(),
  ]
};
