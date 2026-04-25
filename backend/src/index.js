const express = require('express');

const db = require('./config/db');
const { port } = require('./config/config');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});