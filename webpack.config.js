const path = require('path');
const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('.'),
    filename: 'index_bundle.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
    ],
  },
  plugins: process.env.NODE_ENV === 'production'
    ? [HtmlWebpackPluginConfig]
    : [HtmlWebpackPluginConfig, DashboardPlugin()],
  devtool: 'inline-source-map',
};
