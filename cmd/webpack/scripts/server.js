#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

'use strict';

const argv = require('yargs').argv;

const http = require('http');
const fs = require('fs');
const path = require('path');

const host = argv.host || 'localhost';
const port = argv.port || 8080;
const publicDir = argv.publicDir || './dist';
const fallback = argv.fallback || 'index.html';

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm'
};

const server = http.createServer(function (request, response) {
  console.log('Request ', request.url);

  let filePath = publicDir + request.url;

  const ext = path.extname(filePath);
  const extname = String(ext).toLowerCase();

  let contentType = mimeTypes['.html'];

  if (mimeTypes[extname]) {
    contentType = mimeTypes[extname];
  } else {
    filePath = path.resolve(publicDir, fallback);
  }

  fs.readFile(filePath, function (error, content) {
    if (error) {
      response.writeHead(500);
      response.end(error.code);
      return;
    }

    response.writeHead(200, { 'Content-Type': contentType });
    response.end(content, 'utf-8');
  });
});

server.listen(port, host, () => {
  console.log(`HTTP server start at: http://${host}:${port}\n`);
});