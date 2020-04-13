//During the automated test the env variable, We will set it to "test"
process.env.NODE_ENV = 'test';
process.env.MONGODB_URL =
  'mongodb://127.0.0.1:27017/rest-api-nodejs-mongodb-test';
process.env.JWT_KEY = 'asdqwe@@';
process.env.PORT = 4000;
const app = require('../../src/app'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);
//Export this to use in multiple files
module.exports = {
  request: request,
  app: app,
};
