#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
// @ts-check

const path = require('path');

const { IgnorePlugin } = require('webpack');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const staticDirName = 'static';
const outputDirName = 'dist';

const outputPath = path.join(process.cwd(), outputDirName);

module.exports = (options) => {
  const { htmlOptions } = options;

  return {
    staticDirName,
    output: {
      clean: true,
      publicPath: '/',
      path: outputPath
    },
    modules: {
      rules: {
        nameof: {
          test: /\.tsx?$/i,
          use: ['ts-nameof-loader']
        },
        webpack5fix: {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false
          }
        },
        html: {
          test: /\.html$/i,
          loader: 'html-loader',
        }
      }
    },
    plugins: [
      new IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      }),
      new HtmlWebpackPlugin({
        inject: 'body',
        ...htmlOptions
      })
    ],
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.ts', '.tsx', '.json', 'html'],
      plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })]
    }
  };
};