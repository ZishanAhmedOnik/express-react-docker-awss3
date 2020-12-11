const mongoose = require('mongoose');

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

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db');
})

mongoose.connection.on('err', (err) => {
    console.log(err.message);
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected.');
})

process.on('SIGINT', () => {
    mongoose.connection.close()
        .then(() => {
            process.exit(0);
        })
})