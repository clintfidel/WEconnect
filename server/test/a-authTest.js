import expect from 'expect';
import supertest from 'supertest';
import app from '../../server';


let token;
describe('WEconnect API: ', () => {
  describe('user Authentication: ', () => {
    it('Should return 200 for the default route', (done) => {
      supertest(app)
        .get('/api/v1')
        .end((err, res) => {
          expect(res.status).toEqual(200);
          done();
        });
    });
    it('should create a new User', (done) => {
      supertest(app)
        .post('/api/v1/auth/signup')
        .send({
          username: 'clintclint',
          fullname: 'Fidelis clinton',
          email: 'clint@example.com',
          password: 'clint2016'
        })
        .expect(201)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('Signed up successfully');
          done();
        });
    });
    it('should create a new User', (done) => {
      supertest(app)
        .post('/api/v1/auth/signup')
        .send({
          username: 'daramola98',
          fullname: 'daramola ajiboye',
          email: 'dara@live.com',
          password: 'daraandela'
        })
        .expect(201)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('Signed up successfully');
          done();
        });
    });
    it('should not create user with existing user name', (done) => {
      supertest(app)
        .post('/api/v1/auth/signup')
        .send({
          username: 'clintclint',
          fullname: 'Fidelis clinton',
          email: 'clint1@example.com',
          password: 'clint2016',
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
    it('should not create user with existing email address', (done) => {
      supertest(app)
        .post('/api/v1/auth/signup')
        .send({
          username: 'clintclint1',
          fullname: 'Fidelis clinton',
          email: 'clint@example.com',
          password: 'clint2016'
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
    it('should not log  user in with invalid details', (done) => {
      supertest(app)
        .post('/api/v1/auth/login')
        .send({
          username: 'Clint',
          password: 'clint2016'
        })
        .expect(403)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('Invalid Credentials.');
          done();
        });
    });
    it('should not log  user in with incorrect password', (done) => {
      supertest(app)
        .post('/api/v1/auth/login')
        .send({
          username: 'clintclint',
          password: 'clint2019'
        })
        .expect(403)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('Invalid Credentials.');
          done();
        });
    });
    it('should log existing user in  ', (done) => {
      supertest(app)
        .post('/api/v1/auth/login')
        .send({
          username: 'clintclint',
          password: 'clint2016'
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          token = res.body.data.token;
          expect(res.body.message).toBe('Logged In Successfully');
          done();
        });
    });
    it('should not log user with empty details  ', (done) => {
      supertest(app)
        .post('/api/v1/auth/login')
        .send({
          username: '',
          password: ''
        })
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('Please provide your username or password to login');
          done();
        });
    });
    it('should create a new User', (done) => {
      supertest(app)
        .post('/api/v1/auth/signup')
        .send({
          username: 'clintfidel',
          fullname: 'Fidelis clint',
          email: 'clint.fidel@andela.com',
          password: 'clint2018'
        })
        .expect(201)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('Signed up successfully');
          done();
        });
    });
    describe('Update user Profile Success: ', () => {
      it('should return error message for unauthenticated  user', (done) => {
        supertest(app)
          .put('/api/v1/auth/editprofile/')
          .send({
            username: 'Fidelis',
            fullname: 'test user',
            email: 'testing2@example.com',
            password: 'mypassword',
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
    });

    it('should successfully update a users profile', (done) => {
      supertest(app)
        .put('/api/v1/auth/editprofile')
        .send({
          username: 'Fidelis',
          fullname: 'test user',
          email: 'testing2@example.com',
          password: 'mypassword',
          token: `${token}`
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('profile edited successfully!!!');
          done();
        });
    });
  });
});
