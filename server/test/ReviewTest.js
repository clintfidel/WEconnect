import expect from 'expect';
import supertest from 'supertest';
import app from '../../server';

let token;
describe('Review: ', () => {
  it('should log a user in', (done) => {
    supertest(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'Fidelis',
        password: 'mypassword',
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        token = res.body.token;
        expect(res.body.message).toBe('logged in successfully');
        done();
      });
  });
  it('should create a new review for business', (done) => {
    supertest(app)
      .post('/api/v1/business/review/1')
      .send({
        content: 'testing',
        userId: '1',
        token: `${token}`
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('you have successfully reviewed this business');
        done();
      });
  });
  it('should not create a new review for invalid business id', (done) => {
    supertest(app)
      .post('/api/v1/business/review/5')
      .send({
        content: 'testing',
        userId: 1,
        token: `${token}`
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('You are currently making a bad request');
        done();
      });
  });
  it('should get all reviews for a business', (done) => {
    supertest(app)
      .get(`/api/v1/business/${1}/reviews`)
      .send({
        token: `${token}`
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.status).toBe('success');
        expect(res);
        done();
      });
  });
  it('should not get review for invalid business id', (done) => {
    supertest(app)
      .get('/api/v1/business/5/reviews')
      .send({
        token: `${token}`
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('You are currently making a bad request');
        done();
      });
  });
});
