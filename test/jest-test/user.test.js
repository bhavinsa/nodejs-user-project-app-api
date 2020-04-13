const { request } = require('./config');
const UserModel = require('../../src/models/User');

beforeAll(() => {
  // Clears the database and adds some testing data.
  // Jest will wait for this promise to resolve before running tests.
  return UserModel.deleteMany({}, (err) => {});
});

// Prepare data for testing
const testData = {
  name: 'test',
  password: 'Test@123',
  email: 'bhavin@3test.com',
};

it('gets the test endpoint', async (done) => {
  const response = await request.post('/user').send(testData);
  expect(response.status).toBe(201);
  expect(response.body.name).toBe(testData.name);
  done();
});
