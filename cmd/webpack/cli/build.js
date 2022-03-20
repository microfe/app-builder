#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

process.env.NODE_ENV = 'production';

process.on('unhandledRejection', err => {
    throw err;
});

process.title = 'webpack';

process.cliLogger = require('webpack-log')({
    name: 'webpack',
});

const compiler = require('./compiler');

const build = async (buildConfigs) => {
  try {
    await compiler({
      outputOptions: {
        color: true,
        dev: false,
        prod: true,
        interactive: false,
        progress: false
      },
      processingErrors: [],
      options: buildConfigs
    });
  } catch (error) {
    process.cliLogger.error(error);
    process.exit(1);
  }
};

module.exports = build;