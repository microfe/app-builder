#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
// @ts-check

module.exports = (definitionValues) => {
  return Object.keys(definitionValues).reduce(
    (definitionObj, key) => Object.assign(definitionObj, { [key]: JSON.stringify(definitionValues[key]) }), {});
};