const { chai, server } = require('./config');
const UserModel = require('../../src/models/User');

/**
 * Test cases to test all the authentication APIs
 * Covered Routes:
 * (1) Register Error
 * (2) Register
 * (3) Get Data
 */

describe('Auth', () => {
  // Before each test we empty the database
  before((done) => {
    UserModel.deleteMany({}, (err) => {
      done();
    });
  });

  // Prepare data for testing
  const testData = {
    name: 'test',
    password: 'Test@123',
    email: 'bhavin@test12345.com',
  };

  /*
   * Test the /POST route
   */
  describe('/POST Register', () => {
    it('It should send validation error for Register', (done) => {
      chai
        .request(server)
        .post('/user')
        .send({ email: testData.email })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  /*
   * Test the /POST route
   */
  describe('/POST Register', () => {
    it('It should Register user', (done) => {
      chai
        .request(server)
        .post('/user')
        .send(testData)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('name').eql(testData.name);
          testData.token = res.body.token;
          done();
        });
    });
  });

  /*
   * Test the /POST route
   */
  describe('/POST Register', () => {
    it('It should return user data', (done) => {
      chai
        .request(server)
        .post('/user/me')
        .send()
        .set('Authorization', 'Bearer ' + testData.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('name').eql(testData.name);
          done();
        });
    });
  });
});
