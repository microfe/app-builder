#!/usr/bin/env node
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
// @ts-check

const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const WebpackBar = require('webpackbar');

const makeDefinitions = require('./utils/makeDefinitions');

module.exports = function getBuildConfig(options) {
  const { htmlOptions } = options;

  const baseConfigOptions = {
    htmlOptions: htmlOptions,
  };

  const baseConfigs = require('./base/baseConfigs')(baseConfigOptions);

  const plugins = [
    // @ts-ignore
    new WebpackBar({
      name: 'Build Production'
    }),
    ...baseConfigs.plugins,
  ];

  const definitions = options.definitions && makeDefinitions(options.definitions);
  if (definitions) {
    plugins.push(new webpack.DefinePlugin(definitions));
  }

  if (options.analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  plugins.push(
    new ForkTsCheckerWebpackPlugin({})
  );

  plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash:8].css',
      chunkFilename: '[id].[chunkhash:8].css',
    })
  );

  if (options.sourceMap) {
    plugins.push(
      new webpack.SourceMapDevToolPlugin({
        filename: '[file].map[query]',
        exclude: [/vendor/, /runtime/],
      })
    );
  }

  plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: baseConfigs.staticDirName,
          to: baseConfigs.staticDirName,
        }
      ]
    })
  );

  plugins.push(
    new WorkboxPlugin.GenerateSW({
      navigateFallback: '/index.html',
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|gif|jpg|svg|tff|otf|woff|woff2|eot|json)$/g,
          handler: 'CacheFirst',
          options: {
            cacheName: 'runtimeCachingAssets',
            expiration: {
              maxAgeSeconds: 30 * 24 * 60 * 60,
            },
          },
        },
        {
          urlPattern: /\.*/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'runtimeCaching',
            expiration: {
              maxAgeSeconds: 24 * 60 * 60,
            },
          },
        },
      ],
      exclude: [/runtime\.(.*)\.js$/],
      clientsClaim: true,
      skipWaiting: true,
    })
  );

  return {
    mode: 'production',
    stats: {
      colors: true,
      chunks: true,
    },
    entry: {
      app: options.entry || './index',
    },
    output: {
      ...baseConfigs.output,
      filename: '[id].[chunkhash:8].js',
      chunkFilename: '[id].[chunkhash:8].js',
    },
    performance: {
      hints: false
    },
    optimization: {
      moduleIds: 'named',
      chunkIds: 'named',
      minimizer: [
        new TerserPlugin({
          parallel: true
        }),
        new CssMinimizerPlugin(),
      ],
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'all',
            maxSize: 244000,
            enforce: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
    plugins: plugins,
    module: {
      rules: [
        {
          test: /\.(css|sass|scss)$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        },
        {
          test: /\.less$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true
                }
              }
            }
          ]
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        baseConfigs.modules.rules.nameof,
        baseConfigs.modules.rules.webpack5fix,
        baseConfigs.modules.rules.html,
      ],
    },
    resolve: {
      ...baseConfigs.resolve,
      alias: options.alias,
    },
  };
};
