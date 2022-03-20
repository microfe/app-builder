#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

'use strict';

const getBuildConfigs = require('../getBuildConfigs');
const build = require('../cli/build');

const option = {
  entry: 'index.ts',
  analyzer: true
};

const buildConfigs = getBuildConfigs(option);

build(buildConfigs);