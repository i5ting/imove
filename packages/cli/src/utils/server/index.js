const express = require('express');
const bodyParser = require('body-parser');

const cachedServer = {};

const createServer = (port = 3500) => {
  if (cachedServer[port]) {
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
    console.log(`server starts successfully at ${port}!`);
  });
  return app;
};

module.exports = {
  createServer,
};
