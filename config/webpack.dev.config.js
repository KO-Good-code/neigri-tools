const path = require('path');
const merge = require('webpack-merge');
const config = require('./webpack.config')
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(config,{
  mode: 'development',
  entry: './main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: './dist',
    // port: 3000,
    // host: '0.0.0.0'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new htmlWebpackPlugin({
      template: 'public/index.html'
    })
  ],
}) 
