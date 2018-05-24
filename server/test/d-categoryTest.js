import expect from 'expect';
import supertest from 'supertest';
import app from '../../server';

let token;

describe('Category ', () => {
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
  it('get all categories in database  ', (done) => {
    supertest(app)
      .get('/api/v1/business/category')
      .send({
        token: `${token}`
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.Categories).toBe(res.body.Categories);
        done();
      });
  });
});
