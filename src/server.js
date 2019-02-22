const app = require('./app');
const http = require('http');

const mongoose = require('mongoose');

const server = http.createServer(app);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-sud5s.mongodb.net/${
      process.env.DB_NAME
    }`,
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connected to database'))
  .catch(error => console.log(error));

server.listen(process.env.PORT || 3001, () => {
  console.log(`server listening on port ${process.env.PORT || 3001}`);
});
