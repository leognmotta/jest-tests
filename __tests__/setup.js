require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const mongoose = require('mongoose');

beforeEach(function(done) {
  /*
    Define clearDB function that will loop through all 
    the collections in our mongoose connection and drop them.
  */
  function clearDB() {
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].deleteOne(function() {});
    }
    return done();
  }

  /*
    If the mongoose connection is closed, 
    start it up using the test url and database name
    provided by the node runtime ENV
  */
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(`mongodb://localhost:27017/${process.env.TEST_SUITE}`, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    mongoose.connection
      .once('open', () => clearDB())
      .on('error', error => {
        console.warn('Error : ', error);
      });
  } else {
    return clearDB();
  }
});

afterEach(function(done) {
  mongoose.disconnect();
  return done();
});

afterAll(done => {
  return done();
});

module.exports = function clearDB() {
  for (var i in mongoose.connection.collections) {
    mongoose.connection.collections[i].deleteOne(function() {});
  }
  return done();
};
