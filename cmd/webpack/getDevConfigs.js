/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check

const path = require('path');
const webpack = require('webpack');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const WebpackBar = require('webpackbar');

const makeDefinitions = require('./utils/makeDefinitions');

/**
 * @param {{
 *  entry: string,
 *  port: number;
 *  host: string;
 *  devtool: string;
 *  defines: object;
 *  htmlOptions: object,
 *  plugins: object[]
 * }} options
 */
module.exports = (options) => {
  const { entry, port, host, devtool, defines, htmlOptions, plugins } = options;

  const baseConfigOptions = {
    htmlOptions: htmlOptions,
  };

  const baseConfigs = require('./base/baseConfigs')(baseConfigOptions);

  return {
    mode: 'development',
    devtool: devtool || 'inline-source-map',
    entry: [
      `webpack-dev-server/client?http://${host}:${port}`,
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      entry,
    ],
    output: {
      publicPath: '/',
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    optimization: {
      moduleIds: 'named',
      chunkIds: 'named',
    },
    plugins: [
      new webpack.DefinePlugin(makeDefinitions(defines)),
      new ErrorOverlayPlugin(),
      // @ts-ignore
      new WebpackBar({
        name: 'Development',
        color: '#FFFF00'
      }),
      ...baseConfigs.plugins,
      ...(plugins || [])
    ],
    module: {
      rules: [
        /** DEV */
        {
          test: /\.(css|sass|scss)$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader', options: { url: false } },
            {
              loader: 'resolve-url-loader'
            },
            {
              loader: 'sass-loader',
              options: {
                webpackImporter: true,
                sassOptions: {
                  includePaths: ['node_modules', 'libs/ui-kit/scss'],
                }
              }
            }]
        }, {
          test: /\.less$/i,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },

            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true
                }
              }
            }]
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            experimentalWatchApi: true,
            getCustomTransformers: () => ({
              before: [
                // @ts-ignore
                tsImportPluginFactory(/** options */),
              ],
            }),
            compilerOptions: {
              module: 'es2015'
            }
          },
          exclude: /node_modules/
        },
        baseConfigs.modules.rules.nameof,
        baseConfigs.modules.rules.webpack5fix,
        baseConfigs.modules.rules.html,
      ],
    },
    resolve: {
      ...baseConfigs.resolve,
      alias: {
        'react-dom': '@hot-loader/react-dom',
      },
    },
  };
};

