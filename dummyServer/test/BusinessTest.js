import expect from 'expect';
import supertest from 'supertest';
import app from '../../server';
import Business from '../dummyModels/BusinessModel';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWx1ZSI6eyJpZCI6MSwiZnVsbG5hbWUiOiJGaWRlbGlzIENsaW50b24iLCJ1c2VybmFtZSI6IkNsaW50ZmlkZWwiLCJlbWFpbCI6IkNsaW50ZmlkZWxAZ21haWwuY29tIiwicGFzc3dvcmQiOiJjbGludDIwMTYifSwiZXhwaXJlc0luIjp7ImV4cCI6IjFociJ9LCJpYXQiOjE1MjA1ODk2MDJ9.7cQ1GiIDam2nG74oHeQkWc7OV_tcjMvj26SqDdltYlY';

describe('WEconnect API: ', () => {
  describe('Business: ', () => {
    it('should create a new User', (done) => {
      supertest(app)
        .post('/api/v1/auth/signup')
        .send({
          username: 'tested',
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
    it('should not create a new Business without a token', (done) => {
      supertest(app)
        .post('/api/v1/business/')
        .send({
          businessName: 'testing',
          businessDetails: 'test user',
          businessLocation: 'Lagos',
          category: 'Technology',
          userId: 1
        })
        .expect(401)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('Access denied, Authentication token does not exist');
          done();
        });
    });
    it('should create new Business profile', (done) => {
      supertest(app)
        .post('/api/v1/business/')
        .send({
          businessName: 'testing',
          businessDetails: 'test user',
          businessLocation: 'Lagos',
          category: 'Food',
          userId: 1,
          token: `${token}`
        })
        .expect(201)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('you have successfully Registered this business');
          done();
        });
    });
    it('should not get Business with wrong id ', (done) => {
      supertest(app)
        .get(`/api/v1/business/${2}/business`)
        .send({
          token: `${token}`
        })
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('No business with that id found');
          done();
        });
    });
    it('should get one Business ', (done) => {
      supertest(app)
        .get(`/api/v1/business/${1}/business`)
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
    it('should get all Businesses ', (done) => {
      supertest(app)
        .get('/api/v1/business')
        .send({
          token: `${token}`
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.status).toBe('Success');
          expect(res);
          done();
        });
    });
    it('should not update budiness with invalid business id', (done) => {
      supertest(app)
        .put(`/api/v1/business/${4}/business`)
        .send({
          businessName: 'tested again',
          businessDetails: 'change test user',
          businessLocation: 'Abuja',
          category: 'Techn',
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
    it('should not update business with invalid user id', (done) => {
      supertest(app)
        .put(`/api/v1/business/${1}/business`)
        .send({
          businessName: 'tested again',
          businessDetails: 'change test user',
          businessLocation: 'Abuja',
          category: 'Technology',
          userId: 3,
          token: `${token}`
        })
        .expect(403)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('you cannot perform this action');
          done();
        });
    });
    it('should update user Business profile', (done) => {
      supertest(app)
        .put(`/api/v1/business/${1}/business`)
        .send({
          businessName: 'tested',
          businessDetails: 'change test user',
          businessLocation: 'Abuja',
          category: 'Technology',
          userId: 1,
          token: `${token}`
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('You have successfully updated your Business');
          done();
        });
    });
    it('should not delete invalid business id', (done) => {
      supertest(app)
        .delete(`/api/v1/business/${3}/business`)
        .send({
          token: `${token}`,
          userId: 1
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
    it('should not delete business with invalid user id', (done) => {
      supertest(app)
        .delete(`/api/v1/business/${1}/business`)
        .send({
          token: `${token}`,
          userId: 2
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
    it('should delete user Business ', (done) => {
      supertest(app)
        .delete(`/api/v1/business/${1}/business`)
        .send({
          token: `${token}`,
          userId: 1
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('Business deleted successfully');
          done();
        });
    });
  });
});
