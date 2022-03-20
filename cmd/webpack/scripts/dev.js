#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

'use strict';

const path = require('path');

const runDevServer = require('../utils/runDevServer');
const getDevConfigs = require('../getDevConfigs');

const args = process.argv.slice(2);
const configName = args[1];

if (!configName) {
    console.log('Missing config file path!');
    process.exit();
}

const configFile = path.resolve(process.cwd(), configName);

const option = require(configFile);
const buildConfigs = getDevConfigs(option);

runDevServer(buildConfigs, option.host, option.port);