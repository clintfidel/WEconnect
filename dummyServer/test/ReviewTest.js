import expect from 'expect';
import supertest from 'supertest';
import app from '../../server';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWx1ZSI6eyJpZCI6MSwiZnVsbG5hbWUiOiJGaWRlbGlzIENsaW50b24iLCJ1c2VybmFtZSI6IkNsaW50ZmlkZWwiLCJlbWFpbCI6IkNsaW50ZmlkZWxAZ21haWwuY29tIiwicGFzc3dvcmQiOiJjbGludDIwMTYifSwiZXhwaXJlc0luIjp7ImV4cCI6IjFociJ9LCJpYXQiOjE1MjA1ODk2MDJ9.7cQ1GiIDam2nG74oHeQkWc7OV_tcjMvj26SqDdltYlY';
describe('Review: ', () => {
  it('should create a new User', (done) => {
    supertest(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'testing',
        fullname: 'test user',
        email: 'testing@example.com',
        password: 'mypassword'
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('signed up successfully');
        done();
      });
  });
  it('should not create a new review for invalid business id', (done) => {
    supertest(app)
      .post('/api/v1/business/reviews/5')
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
  it('should create a new review for business', (done) => {
    supertest(app)
      .post('/api/v1/business/reviews/1')
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
});
