import expect from 'expect';
import supertest from 'supertest';
import app from '../../server';

let token;
let businessId = +2;
let businessId2 = +10;
let reviewId = 1;

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
        details: 'Old English lufu "love, affection, friendliness," from Proto-Germanic *lubo (cf. Old High German liubi "joy," German Liebe "love;" Old Norse, Old Frisian, Dutch lof; German Lob "praise;" Old Saxon liof, Old Frisian liaf, Dutch lief, Old High German liob, German lieb, Gothic liufs "dear, beloved").',
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
        rate: 1,
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
  it('should return No review for business with no review', (done) => {
    supertest(app)
      .get(`/api/v1/businesses/${businessId2}/reviews?pageNum=1`)
      .send({
        token: `${token}`
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.reviews.rows).toBe(res.body.reviews.rows);
        done();
      });
  });
  it('should create a new review for business', (done) => {
    supertest(app)
      .post(`/api/v1/businesses/${businessId}/reviews/`)
      .send({
        comments: 'I am amazed at the idea',
        rate: 4,
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
  it('should update review for business', (done) => {
    supertest(app)
      .put(`/api/v1/businesses/${reviewId}/reviews`)
      .send({
        comments: 'great business',
        rate: 5,
        token: `${token}`
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('You have successfully updated this review');
        done();
      });
  });
  it('should not update review for invalid review Id ', (done) => {
    supertest(app)
      .put(`/api/v1/businesses/${businessId2}/reviews`)
      .send({
        comments: 'great business',
        rate: 5,
        token: `${token}`
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('review Id not found');
        done();
      });
  });
  it('should No business found for this page', (done) => {
    supertest(app)
      .get(`/api/v1/businesses/${businessId}/reviews?pageNum=2`)
      .send({
        token: `${token}`
      })
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Sorry no business found for this page');
        done();
      });
  });
  it('should get all reviews for a business', (done) => {
    supertest(app)
      .get(`/api/v1/businesses/${businessId}/reviews?pageNum=1`)
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
