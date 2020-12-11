const express = require('express')
require('dotenv').config()
const cors = require('cors');
const morgan = require('morgan');
const createError = require('http-errors');

const index = require('./routes/index');
const aws = require('./routes/aws');
const AuthRoute = require('./routes/auth/Auth');
const app = express()
const port = process.env.PORT

require('./helpers/init_mongodb');

app.use(cors());
app.use(morgan('dev'));

app.use('/', index);
app.use('/aws', aws);
app.use('/auth', AuthRoute);

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})