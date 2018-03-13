const express = require('express');
const routes = require('./routes');
const app = express();

routes.init(app);

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`API listening at http://${host}:${port}`);
});