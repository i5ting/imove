/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const bodyParser = require('body-parser');
const open = require('open');

const DEFAULT_PORT = 3500;
const cachedServer = {};

function openBrowserIfNeeded(url, needOpen = false) {
  if (needOpen) {
    open(url);
  }
}

const createServer = (port = DEFAULT_PORT, needOpen = false) => {
  const url = `http://127.0.0.1:${port}`;
  if (cachedServer[port]) {
    openBrowserIfNeeded(url, needOpen);
    return cachedServer[port];
  }
  const app = express();
  cachedServer[port] = app;

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
  });
  app.listen(port, () => {
    console.log(`server starts at ${url}`);
    openBrowserIfNeeded(url, needOpen);
  });
  return app;
};

module.exports = {
  DEFAULT_PORT,
  createServer,
};
