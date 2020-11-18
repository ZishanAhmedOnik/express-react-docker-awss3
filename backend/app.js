const express = require('express')
require('dotenv').config()
const cors = require('cors');
const mongoose = require('mongoose');

const index = require('./routes/index')
const aws = require('./routes/aws');

const app = express()
const port = process.env.PORT

app.use(cors());

let mongoURI = `mongodb://mongodb/${process.env.MONGODB_DB_NAME}`;
mongoose.connect(mongoURI, {
  auth: {
    user: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD
  },
  authSource: "admin",
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(
  () => {
    console.log('Connected to mongodb')
  },
  (err) => {
    console.log(err);
  }
)

app.use('/', index);
app.use('/aws', aws);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})