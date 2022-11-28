'use strict';

require('dotenv').config();
const app = require('express')();
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const logger = require('./middleware/logger');
const notFound = require('./handlers/404');
const serverErr = require('./handlers/500');


app.use(cors());
// app.use(logger);

app.get('/', logger, (req, res, next) => {
  res.status(200).send('It lives!!!');
});

app.get('/bad', (req, res, next) => {
  next('Error...');
});

app.use('*', logger, notFound);
app.use(serverErr);

function start() {
  app.listen(PORT, () => console.log('listening on port: ', PORT));
}

module.exports = { start, app };