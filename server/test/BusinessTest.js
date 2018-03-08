import expect from 'expect';
import supertest from 'supertest';
import app from '../../server';
import Business from '../dummyModels/BusinessModel';

let token;

describe('WEconnect API: ', () => {
  describe('Business: ', () => {
    it('should create a new User', (done) => {
      supertest(app)
        .post('/auth/signup')
        .send({
          fullname: 'test test',
          username: 'test me',
          password: 'clint2018',
          email: 'test1@gmail.com'
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
    it('should log a user in', (done) => {
      supertest(app)
        .post('/auth/login')
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
    it('should not create a new Business without a token', (done) => {
      supertest(app)
        .post('/business/')
        .send({
          businessName: 'testing',
          businessDetails: 'test user',
          businessLocation: 'Lagos',
          categoryId: 1,
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
        .post('/business/')
        .send({
          businessName: 'testing',
          businessDetails: 'test user',
          businessLocation: 'Lagos',
          categoryId: 1,
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
        .get(`/business/${2}/business`)
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
        .get(`/business/${1}/business`)
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
        .get('/business')
        .send({
          token: `${token}`
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.status).toBe('Success');
          expect(res.body.Business).toEqual(Business);
          done();
        });
    });
    it('should update user Business profile', (done) => {
      supertest(app)
        .put(`/business/${1}/business`)
        .send({
          businessName: 'tested',
          businessDetails: 'change test user',
          businessLocation: 'Abuja',
          categoryId: 2,
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
    it('should not update invalid business id', (done) => {
      supertest(app)
        .put(`/business/${4}/business`)
        .send({
          businessName: 'tested',
          businessDetails: 'change test user',
          businessLocation: 'Abuja',
          categoryId: 2,
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
    it('should delete user Business ', (done) => {
      supertest(app)
        .delete(`/business/${1}/business`)
        .send({
          token: `${token}`
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res);
          done();
        });
    });
    it('should not delete invalid business id', (done) => {
      supertest(app)
        .delete(`/business/${3}/business`)
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
});
