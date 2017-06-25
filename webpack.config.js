'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
  return {
    entry: {
      app: path.join(__dirname, './src/app.js')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['es2015', 'react']
              }
            }
          ]
        },
        {
          exclude: /\.js$/,
          use: [
            {
              loader: 'file-loader'
            }
          ]
        }
      ]
    },
    plugins: [new HtmlWebpackPlugin()]
  };
};
