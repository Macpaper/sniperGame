const express = require('express');
const app = express();

var port = process.env.PORT || 90

app.get('/', (req, res) => {
  res.send('<html><head></head><body><h1>HI DIE</h1></body></html>');
});

app.listen(port);

