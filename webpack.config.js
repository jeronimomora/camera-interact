const path = require('path');
const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const indexConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: false,
});
const demoConfig = new HtmlWebpackPlugin({
  template: './src/full_camera_demo.html',
  filename: 'full_camera_demo.html',
  inject: false,
});

module.exports = {
  entry: {
    index: './src/index.js',
    full_camera_demo: './src/full_camera_demo.js',
  },
  output: {
    path: path.resolve('.'),
    filename: '[name]_bundle.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
    ],
  },
  plugins: process.env.NODE_ENV === 'production'
    ? [indexConfig, demoConfig]
    : [indexConfig, demoConfig, new DashboardPlugin()],
  devtool: 'inline-source-map',
};
