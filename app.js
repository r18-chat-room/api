const express = require('express');
const routes = require('./routes');
const mongooes = require('mongoose')
const app = express();
//const dbUrl = process.env.MONGOHQ_URL || 'mongodb://@localhost:27017/blog'

//连接数据库
//const db = mongooes.connect(dbUrl);

//app.use(bodyParser());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/v1/app/language/translate', routes.translate.ts)
app.post('/v1/app/language/speech', routes.translate.tts)

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`API listening at http://${host}:${port}`);
});