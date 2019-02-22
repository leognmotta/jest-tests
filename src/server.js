const app = require('./app');
const http = require('http');

const mongoose = require('mongoose');

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-sud5s.mongodb.net/${
      process.env.DB_NAME
    }`,
    { useNewUrlParser: true, useCreateIndex: true }
  )
  .then(() => console.log('Connected to database'))
  .catch(error => console.log(error));

const server = http.createServer(app);

server.listen(process.env.PORT || 3001, () => {
  console.log(`server listening on port ${process.env.PORT || 3001}`);
});
