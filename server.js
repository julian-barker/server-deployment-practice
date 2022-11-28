'use strict';

require('dotenv').config();
const app = require('express')();
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const logger = require('./middleware/logger');
const notFound = require('./handlers/404');
const serverErr = require('./handlers/500');


app.use(cors()); // use cors as middleware


// home route
app.get('/', logger, (req, res, next) => {
  res.status(200).send('It lives!!!');
});

// example bad route to force error
app.get('/bad', (req, res, next) => {
  next('Error...');
});

// 404 error for all other routes
app.use('*', logger, notFound);

// error handler
app.use(serverErr);

function start() {
  app.listen(PORT, () => console.log('listening on port: ', PORT));
}

module.exports = { start, app };