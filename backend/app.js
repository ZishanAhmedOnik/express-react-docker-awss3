const express = require('express')
require('dotenv').config()
const cors = require('cors');

const index = require('./routes/index')
const aws = require('./routes/aws');

const app = express()
const port = process.env.PORT

app.use(cors());

app.use('/', index);
app.use('/aws', aws);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})