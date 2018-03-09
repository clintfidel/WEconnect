import expect from 'expect';
import supertest from 'supertest';
import app from '../../server';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWx1ZSI6eyJpZCI6MSwiZnVsbG5hbWUiOiJGaWRlbGlzIENsaW50b24iLCJ1c2VybmFtZSI6IkNsaW50ZmlkZWwiLCJlbWFpbCI6IkNsaW50ZmlkZWxAZ21haWwuY29tIiwicGFzc3dvcmQiOiJjbGludDIwMTYifSwiZXhwaXJlc0luIjp7ImV4cCI6IjFociJ9LCJpYXQiOjE1MjA1ODk2MDJ9.7cQ1GiIDam2nG74oHeQkWc7OV_tcjMvj26SqDdltYlY';

describe('WEconnect API: ', () => {
  describe('User validations: ', () => {
    // it('should create a User with username less than 5 characters long', (done) => {
    //   supertest(app)
    //     .post('/api/v1/auth/signup')
    //     .send({
    //       fullname: 'test test',
    //       username: 'test',
    //       password: 'clint2018',
    //       email: 'test1@gmail.com'
    //     })
    //     .expect(409)
    //     .end((err, res) => {
    //       if (err) {
    //         return done(err);
    //       }
    //       expect(res.body.error.msg)
    // .toBe('Please provide a username with atleast 5 characters.');
    //       done();
    //     });
    // });
    // it('should create a User with empty username ', (done) => {
    //   supertest(app)
    //     .post('/api/v1/auth/signup')
    //     .send({
    //       fullname: 'test',
    //       username: '',
    //       password: 'clint2018',
    //       email: 'test1@gmail.com'
    //     })
    //     .expect(409)
    //     .end((err, res) => {
    //       if (err) {
    //         return done(err);
    //       }
    //       expect(res.body.error.msg).toBe('Your Username is required');
    //       done();
    //     });
    // });
    // it('should create a User with empty email address ', (done) => {
    //   supertest(app)
    //     .post('/api/v1/auth/signup')
    //     .send({
    //       fullname: 'test',
    //       username: 'test again',
    //       password: 'clint2018',
    //       email: ''
    //     })
    //     .expect(409)
    //     .end((err, res) => {
    //       if (err) {
    //         return done(err);
    //       }
    //       expect(res.body.error.msg).toBe('Your Email Address is required');
    //       done();
    //     });
    // });
    // it('should create a User with invalid email address ', (done) => {
    //   supertest(app)
    //     .post('/api/v1/auth/signup')
    //     .send({
    //       fullname: 'test',
    //       username: ' test again',
    //       password: 'clint2018',
    //       email: 'test1@'
    //     })
    //     .expect(409)
    //     .end((err, res) => {
    //       if (err) {
    //         return done(err);
    //       }
    //       expect(res.body.error.msg).toBe('Provide a valid a Email Address');
    //       done();
    //     });
    // });
    // it('should create a User with empty password', (done) => {
    //   supertest(app)
    //     .post('/api/v1/auth/signup')
    //     .send({
    //       fullname: 'test',
    //       username: 'test me',
    //       password: '',
    //       email: 'test1@gmail.com'
    //     })
    //     .expect(409)
    //     .end((err, res) => {
    //       if (err) {
    //         return done(err);
    //       }
    //       expect(res.body.error.msg).toBe('Your Password is required');
    //       done();
    //     });
    // });
    // it('should create a User with password less than 8 character long ', (done) => {
    //   supertest(app)
    //     .post('/api/v1/auth/signup')
    //     .send({
    //       fullname: 'test',
    //       username: 'test me',
    //       password: 'clint',
    //       email: 'test1@gmail.com'
    //     })
    //     .expect(409)
    //     .end((err, res) => {
    //       if (err) {
    //         return done(err);
    //       }
    //       expect(res.body.error.msg)
    // .toBe('Provide a valid password with minimum of 8 characters');
    //       done();
    //     });
    // });
    // it('should create a User  ', (done) => {
    //   supertest(app)
    //     .post('/api/v1/auth/signup')
    //     .send({
    //       fullname: 'test',
    //       username: 'test me',
    //       password: 'clint2018',
    //       email: 'test1@gmail.com'
    //     })
    //     .expect(201)
    //     .end((err, res) => {
    //       if (err) {
    //         return done(err);
    //       }
    //       expect(res.body.message).toBe('signed up successfully');
    //       done();
    //     });
    // });
    it('should not create a User with an existing username ', (done) => {
      supertest(app)
        .post('/api/v1/auth/signup')
        .send({
          fullname: 'test',
          username: 'Fidelis',
          password: 'clint2018',
          email: 'test1@gmail.com'
        })
        .expect(409)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('username already exist');
          done();
        });
    });
    it('should not create a User existing email address ', (done) => {
      supertest(app)
        .post('/api/v1/auth/signup')
        .send({
          fullname: 'test',
          username: 'test me again',
          password: 'clint2018',
          email: 'testing2@example.com'
        })
        .expect(409)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('email already exist');
          done();
        });
    });
    it('should not create a Business existing Business name ', (done) => {
      supertest(app)
        .post('/api/v1/business/')
        .send({
          businessName: 'tested',
          businessDetails: 'change test user',
          businessLocation: 'Abuja',
          categoryId: 2,
          userId: 1,
          token: `${token}`
        })
        .expect(409)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('business name already exist');
          done();
        });
    });
  });
  describe('search business: ', () => {
    it('search for business by location', (done) => {
      supertest(app)
        .get('/api/v1/business?location=Abuja')
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
    it('search for business by category', (done) => {
      supertest(app)
        .get('/api/v1/business?category=2')
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
    it('should return error message for business not seen ', (done) => {
      supertest(app)
        .get('/api/v1/business?location=Germany')
        .send({
          token: `${token}`
        })
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('No match found');
          done();
        });
    });
    it('should return error message for business not seen ', (done) => {
      supertest(app)
        .get('/api/v1/business?category=5')
        .send({
          token: `${token}`
        })
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('No match found');
          done();
        });
    });
  });
});

