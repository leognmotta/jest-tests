const http = require('http');

const mongoose = require('mongoose');

const app = require('./app');

const server = http.createServer(app);

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-sud5s.mongodb.net/${
    process.env.DB_NAME
  }`,
  { useNewUrlParser: true, useCreateIndex: true }
);

mongoose.connection
  .once('open', () => console.log('connected to database'))
  .on('error', error => console.warn('Error : ', error));

server.listen(process.env.PORT || 3001, () => {
  console.log(`server listening to port ${process.env.PORT || 3001}`);
});
