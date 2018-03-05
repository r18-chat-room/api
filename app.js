const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`API listening at http://${host}:${port}`);
});