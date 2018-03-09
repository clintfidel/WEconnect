import expect from 'expect';
import supertest from 'supertest';
import app from '../../server';
import Users from '../dummyModels/UserModel';

let token;
describe('WEconnect API: ', () => {
  describe('user Authentication: ', () => {
    it('Should return 200 for the default route', (done) => {
      supertest(app)
        .get('/')
        .end((err, res) => {
          expect(res.status).toEqual(200);
          done();
        });
    });
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
    it('should log an existing user in', (done) => {
      supertest(app)
        .post('/api/v1/auth/login')
        .send({
          username: 'Clintfidel',
          password: 'clint2016'
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
    it('should not log  user in with invalid details', (done) => {
      supertest(app)
        .post('/api/v1/auth/login')
        .send({
          username: 'Clint',
          password: 'clint2016'
        })
        .expect(401)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('invalid credentials');
          done();
        });
    });
    it('should not log  user in with incorrect password', (done) => {
      supertest(app)
        .post('/api/v1/auth/login')
        .send({
          username: 'Clintfidel',
          password: 'clint2019'
        })
        .expect(403)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('password provided does not match username');
          done();
        });
    });
    describe('Update user Profile Success: ', () => {
      it('should return error message for unauthorized user', (done) => {
        supertest(app)
          .put('/api/v1/auth/updateProfile/4')
          .send({
            username: 'Fidelis',
            fullname: 'test user2',
            email: 'testing2@example.com',
            password: 'mypassword',
            token: `${token}`
          })
          .expect(403)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.body.message).toBe('Unauthorized User!');
            done();
          });
      });
    });
    it('should successfully update a users profile', (done) => {
      supertest(app)
        .put(`/api/v1/auth/updateProfile/${1}`)
        .send({
          username: 'Fidelis',
          fullname: 'test user2',
          email: 'testing2@example.com',
          password: 'mypassword',
          token: `${token}`
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('user profile updated successfully');
          done();
        });
    });
  });
  describe('Get all user sucess: ', () => {
    it('should successfully get all registered users', (done) => {
      supertest(app)
        .get('/api/v1/auth/')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.status).toEqual(200);
          done();
        });
    });
    it('should return list of all users', (done) => {
      supertest(app)
        .get('/api/v1/auth/')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.status).toBe('Success');
          expect(res.body.Users).toEqual(Users);
          done();
        });
    });
  });
});
