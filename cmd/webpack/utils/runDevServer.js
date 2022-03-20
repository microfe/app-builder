#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
// @ts-check

const path = require('path');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const checkPortTaken = require('./checkPortTaken');

/**
 * @param {object} config
 * @param {string} host
 * @param {number} port
 */
function run(config, host, port) {
  const compiler = webpack(config);
  const devServerConfig = {
    host: host,
    port: port,
    historyApiFallback: true,
    hot: 'only',
    liveReload: false,
    allowedHosts: 'all',
    static: {
      directory: path.join(process.cwd(), 'static'),
      publicPath: '/static',
    },
    devMiddleware: {
      stats: {
        colors: true,
        hash: false,
        version: true,
        timings: true,
        assets: false,
        chunks: false,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        errors: true,
        errorDetails: true,
        warnings: true,
        publicPath: false,
        entrypoints: false
      },
    },
    client: {
      overlay: true,
      progress: true
    }
  };

  const devServer = new WebpackDevServer(devServerConfig, compiler);

  /**
   * @param {Error} err
   */
  function onload(err) {
    if (err) {
      console.log(err);
    }

    if (process.env.NODE_ENV === 'TEST') {
      process.exit();
    }
  }

  devServer.start(port, host, onload);
}

/**
 * @param {object} config
 * @param {string} host
 * @param {number} port
 */
function runDevServer(config, host, port) {
  const useHost = host || config.host;
  const usePort = port || config.port;

  checkPortTaken(
    port,
    (isTaken) => {
      if (isTaken) {
        console.warn(`Port ${port} ready taken!`);
        return void runDevServer(config, useHost, usePort + 1);
      }

      run(config, useHost, usePort);
    }
  );
}

module.exports = runDevServer;
