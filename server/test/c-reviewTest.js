import expect from 'expect';
import supertest from 'supertest';
import app from '../../server';

let token;
let businessId;
let businessId2;

const wrongId = Number(10);

describe('Review: ', () => {
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
  it('should create new Business profile', (done) => {
    supertest(app)
      .post('/api/v1/businesses/')
      .send({
        name: 'testing',
        details: 'test user',
        location: 'Lagos',
        categoryId: 1,
        token: `${token}`
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        businessId = parseInt(res.body.businessProfile.id, 10);
        expect(res.body.message).toBe('Business created successfully');
        done();
      });
  });
  it('should create new Business profile', (done) => {
    supertest(app)
      .post('/api/v1/businesses/')
      .send({
        name: '9mobile',
        details: 'this is a new business',
        location: 'wakanda',
        categoryId: 3,
        token: `${token}`
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        businessId2 = parseInt(res.body.businessProfile.id, 10);
        expect(res.body.message).toBe('Business created successfully');
        done();
      });
  });
  it('should not create a new review for invalid business id', (done) => {
    supertest(app)
      .post(`/api/v1/businesses/${wrongId}/reviews/`)
      .send({
        comments: 'lovely app',
        token: `${token}`
      })
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('No business with that Id found');
        done();
      });
  });
  it('should create a new review for business', (done) => {
    supertest(app)
      .post(`/api/v1/businesses/${businessId}/reviews/`)
      .send({
        comments: 'I am amazed at the idea',
        token: `${token}`
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('You have successfully reviewed this business');
        done();
      });
  });
  it('should not get review for invalid business id', (done) => {
    supertest(app)
      .get(`/api/v1/businesses/${wrongId}/reviews`)
      .send({
        token: `${token}`
      })
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('No business Found');
        done();
      });
  });
  it('should no review for business with no review', (done) => {
    supertest(app)
      .get(`/api/v1/businesses/${businessId2}/reviews`)
      .send({
        token: `${token}`
      })
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('No review found for this business');
        done();
      });
  });
  it('should get all reviews for a business', (done) => {
    supertest(app)
      .get(`/api/v1/businesses/${businessId}/reviews`)
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
