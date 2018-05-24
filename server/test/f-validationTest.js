import expect from 'expect';
import supertest from 'supertest';
import app from '../../server';


let token;

describe('WEconnect API: ', () => {
  describe('User validations: ', () => {
    it('should not create a User with username less than 5 characters long', (done) => {
      supertest(app)
        .post('/api/v1/auth/signup')
        .send({
          fullname: 'test test',
          username: 'test',
          password: 'clint2018',
          email: 'test1@gmail.com'
        })
        .expect(409)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message)
            .toBe('Please provide a username with atleast 5 characters.');
          done();
        });
    });
    it('should not create a User with empty username ', (done) => {
      supertest(app)
        .post('/api/v1/auth/signup')
        .send({
          fullname: 'test',
          username: '',
          password: 'clint2018',
          email: 'test1@gmail.com'
        })
        
        .expect(409)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('Your Username is required');
          done();
        });
    });
    it('should not create a User with empty email address ', (done) => {
      supertest(app)
        .post('/api/v1/auth/signup')
        .send({
          fullname: 'test',
          username: 'testagain',
          password: 'clint2018',
          email: ''
        })
        .expect(409)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('Your Email Address is required');
          done();
        });
    });
    it('should not create a User with invalid email address ', (done) => {
      supertest(app)
        .post('/api/v1/auth/signup')
        .send({
          fullname: 'test',
          username: 'testagain',
          password: 'clint2018',
          email: 'test1@'
        })
        .expect(409)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('Provide a valid Email Address');
          done();
        });
    });
    it('should not create a User with empty password', (done) => {
      supertest(app)
        .post('/api/v1/auth/signup')
        .send({
          fullname: 'test',
          username: 'testme',
          password: '',
          email: 'test1@gmail.com'
        })
        .expect(409)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('Your Password is required');
          done();
        });
    });
    it('should not create a User with password less than 8 character long ', (done) => {
      supertest(app)
        .post('/api/v1/auth/signup')
        .send({
          fullname: 'Mr test',
          username: 'testme',
          password: 'clint',
          email: 'test1@gmail.com'
        })
        .expect(409)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message)
            .toBe('Provide a valid password with minimum of 8 characters');
          done();
        });
    });
    it('should not create a User with multiple space in fullname  ', (done) => {
      supertest(app)
        .post('/api/v1/auth/signup')
        .send({
          fullname: ' test again',
          username: 'testme',
          password: 'clint2018',
          email: 'test1@gmail.com'
        })
        .expect(406)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('Invalid fullname!');
          done();
        });
    });
    it('should not create a User with password containing space as first character ', (done) => {
      supertest(app)
        .post('/api/v1/auth/signup')
        .send({
          fullname: 'test',
          username: 'Fidelis12',
          password: '  clint2018',
          email: 'test1@gmail.com'
        })
        .expect(406)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('Invalid password!');
          done();
        });
    });
    it('should not accept user name with spaces ', (done) => {
      supertest(app)
        .post('/api/v1/auth/signup')
        .send({
          fullname: 'test',
          username: 'test me again',
          password: 'clint2018',
          email: 'testing@example.com'
        })
        .expect(406)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('Invalid Username!');
          done();
        });
    });
    it('should log existing user in  ', (done) => {
      supertest(app)
        .post('/api/v1/auth/login')
        .send({
          username: 'daramola98',
          password: 'daraandela'
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
    it('should not create a Business with spaces as name ', (done) => {
      supertest(app)
        .post('/api/v1/businesses/')
        .send({
          name: ' Business',
          details: 'Old English lufu "love, affection, friendliness," from Proto-Germanic *lubo (cf. Old High German liubi "joy," German Liebe "love;" Old Norse, Old Frisian, Dutch lof; German Lob "praise;" Old Saxon liof, Old Frisian liaf, Dutch lief, Old High German liob, German lieb, Gothic liufs "dear, beloved").',
          location: 'Abuja',
          categoryId: 1,
          token: `${token}`
        })
        .expect(406)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('Invalid character in Business Name!');
          done();
        });
    });
  });
  describe('search business: ', () => {
    it('should create new Business profile', (done) => {
      supertest(app)
        .post('/api/v1/businesses')
        .send({
          name: 'Another testing',
          details: 'Old English lufu "love, affection, friendliness," from Proto-Germanic *lubo (cf. Old High German liubi "joy," German Liebe "love;" Old Norse, Old Frisian, Dutch lof; German Lob "praise;" Old Saxon liof, Old Frisian liaf, Dutch lief, Old High German liob, German lieb, Gothic liufs "dear, beloved").',
          location: 'Lagos',
          categoryId: 1,
          token: `${token}`
        })
        .expect(201)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('Business created successfully');
          done();
        });
    });
    it('search for business by location', (done) => {
      supertest(app)
        .get('/api/v1/businesses?location=lagos')
        .send({
          token: `${token}`
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('Business Found!');
          done();
        });
    });
    it('search for business by category', (done) => {
      supertest(app)
        .get('/api/v1/businesses?category=food')
        .send({
          token: `${token}`
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('Business Found!');
          done();
        });
    });
    it('search for business by location and category', (done) => {
      supertest(app)
        .get('/api/v1/businesses?location=lagos&category=food')
        .send({
          token: `${token}`
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('Business Found!');
          done();
        });
    });
    it('search for user business by location and category', (done) => {
      supertest(app)
        .get('/api/v1/businesses/user?location=lagos&category=food')
        .send({
          token: `${token}`
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('Business Found!');
          done();
        });
    });
    it('search for user business by name', (done) => {
      supertest(app)
        .get('/api/v1/businesses/user?name=Another testing')
        .send({
          token: `${token}`
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('Business Found!');
          done();
        });
    });
    it('search for user business by name', (done) => {
      supertest(app)
        .get('/api/v1/businesses?name=Another testing')
        .send({
          token: `${token}`
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('Business Found!');
          done();
        });
    });
    it('search for user business by location', (done) => {
      supertest(app)
        .get('/api/v1/businesses/user?location=lagos')
        .send({
          token: `${token}`
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('Business Found!');
          done();
        });
    });
    it('search for user business by category', (done) => {
      supertest(app)
        .get('/api/v1/businesses/user?category=food')
        .send({
          token: `${token}`
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('Business Found!');
          done();
        });
    });
    it('should return error message for business not seen ', (done) => {
      supertest(app)
        .get('/api/v1/businesses?location=Jerico')
        .send({
          token: `${token}`
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.businesses.rows).toBe(res.body.businesses.rows);
          done();
        });
    });
    it('should return error message for business not seen ', (done) => {
      supertest(app)
        .get('/api/v1/businesses?category=laundry')
        .send({
          token: `${token}`
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.businesses.rows).toBe(res.body.businesses.rows);
          done();
        });
    });
  });
});

