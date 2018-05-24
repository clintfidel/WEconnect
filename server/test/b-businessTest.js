import expect from 'expect';
import supertest from 'supertest';
import app from '../../server';

let userToken;
let businessId = +2;
const wrongId = '7';
describe('WEconnect API: ', () => {
  describe('Business: ', () => {
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
          userToken = res.body.data.token;
          expect(res.body.message).toBe('Logged In Successfully');
          done();
        });
    });
    it('should not create a new Business without a userToken', (done) => {
      supertest(app)
        .post('/api/v1/businesses')
        .send({
          name: 'testing',
          details: 'test user',
          location: 'Lagos',
          categoryId: 2,
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
        .post('/api/v1/businesses/')
        .send({
          name: 'New salary',
          details: 'Old English lufu "love, affection, friendliness," from Proto-Germanic *lubo (cf. Old High German liubi "joy," German Liebe "love;" Old Norse, Old Frisian, Dutch lof; German Lob "praise;" Old Saxon liof, Old Frisian liaf, Dutch lief, Old High German liob, German lieb, Gothic liufs "dear, beloved").',
          location: 'Lagos',
          categoryId: 1,
          token: `${userToken}`
        })
        .expect(201)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          businessId = Number(res.body.businessProfile.id);
          expect(res.body.message).toBe('Business created successfully');
          done();
        });
    });
    it('should not create new Business profile with invalid category id', (done) => {
      supertest(app)
        .post('/api/v1/businesses')
        .send({
          name: 'One More Salary',
          details: 'Old English lufu "love, affection, friendliness," from Proto-Germanic *lubo (cf. Old High German liubi "joy," German Liebe "love;" Old Norse, Old Frisian, Dutch lof; German Lob "praise;" Old Saxon liof, Old Frisian liaf, Dutch lief, Old High German liob, German lieb, Gothic liufs "dear, beloved").',
          location: 'Lagos',
          categoryId: 'boy',
          token: `${userToken}`
        })
        .expect(409)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('category Id has to be numeric value');
          done();
        });
    });
    it('should not get Business with wrong id ', (done) => {
      supertest(app)
        .get(`/api/v1/businesses/${wrongId}`)
        .send({
          token: `${userToken}`
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
    it('should get one Business ', (done) => {
      supertest(app)
        .get(`/api/v1/businesses/${businessId}`)
        .send({
          token: `${userToken}`
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('Business found!');
          expect(res);
          done();
        });
    });
    it('should not be able to get user business for unavailabe page', (done) => {
      supertest(app)
        .get('/api/v1/businesses/user?pageNum=5')
        .send({
          token: `${userToken}`
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
    it('should not be able get business for unavailabe page', (done) => {
      supertest(app)
        .get('/api/v1/businesses/?pageNum=4')
        .send({
          token: `${userToken}`
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
    it('should not create new business profile with invalid category id', (done) => {
      supertest(app)
        .post('/api/v1/businesses/')
        .send({
          name: 'One salary',
          details: 'Old English lufu "love, affection, friendliness," from Proto-Germanic *lubo (cf. Old High German liubi "joy," German Liebe "love;" Old Norse, Old Frisian, Dutch lof; German Lob "praise;" Old Saxon liof, Old Frisian liaf, Dutch lief, Old High German liob, German lieb, Gothic liufs "dear,beloved").',
          location: 'Lagos',
          categoryId: 60,
          token: `${userToken}`
        })
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('No category with that Id found! pls select from 1-7');
          done();
        });
    });
    
    it('should be able to get business by page', (done) => {
      supertest(app)
        .get('/api/v1/businesses?pageNum=1')
        .send({
          token: `${userToken}`
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body);
          done();
        });
    });
    it('should not update business with invalid business id', (done) => {
      supertest(app)
        .put(`/api/v1/businesses/${wrongId}`)
        .send({
          name: 'tested again',
          details: 'change test user',
          location: 'Abuja',
          categoryId: 5,
          token: `${userToken}`
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
    it('should not update business with invalid user id', (done) => {
      supertest(app)
        .put(`/api/v1/businesses/${businessId}`)
        .send({
          name: 'tested again',
          details: 'change test user',
          location: 'Osun',
          categoryId: 6,
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVJbiI6eyJleHAiOjE1MjE1MDUxOTR9LCJjdXJyZW50VXNlciI6eyJpZCI6MywiZnVsbG5hbWUiOiJ0ZXN0IHVzZXIiLCJ1c2VybmFtZSI6IkZpZGVsaXMiLCJlbWFpbCI6InRlc3RpbmcyQGV4YW1wbGUuY29tIiwiYWN0aXZlIjpudWxsfSwiaWF0IjoxNTIxNTAxNTk0fQ.aXsILPoa3xHNHLPuiIxYnD-ksMHcZ55PEBDjyJRS4gE'
        })
        .expect(403)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('Invalid User! you can only make changes to your own Business');
          done();
        });
    });
    it('should update user Business profile', (done) => {
      supertest(app)
        .put(`/api/v1/businesses/${businessId}`)
        .send({
          name: 'MyBusiness',
          details: 'change test Business',
          location: 'Antatctica',
          categoryId: 7,
          token: `${userToken}`
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('Business successfully edited');
          done();
        });
    });
    it('should not delete business with invalid business id', (done) => {
      supertest(app)
        .delete(`/api/v1/businesses/${wrongId}`)
        .send({
          token: `${userToken}`
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
    it('should not delete business with invalid user id', (done) => {
      supertest(app)
        .delete(`/api/v1/businesses/${businessId}`)
        .send({
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVJbiI6eyJleHAiOjE1MjE1MDUxOTR9LCJjdXJyZW50VXNlciI6eyJpZCI6MywiZnVsbG5hbWUiOiJ0ZXN0IHVzZXIiLCJ1c2VybmFtZSI6IkZpZGVsaXMiLCJlbWFpbCI6InRlc3RpbmcyQGV4YW1wbGUuY29tIiwiYWN0aXZlIjpudWxsfSwiaWF0IjoxNTIxNTAxNTk0fQ.aXsILPoa3xHNHLPuiIxYnD-ksMHcZ55PEBDjyJRS4gE',
        })
        .expect(403)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('Invalid User! you can only make changes to your own Business');
          done();
        });
    });
    it('should delete user Business ', (done) => {
      supertest(app)
        .delete(`/api/v1/businesses/${businessId}`)
        .send({
          token: `${userToken}`
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
    it('should not get all Businesses ', (done) => {
      supertest(app)
        .get('/api/v1/businesses/')
        .send({
          token: `${userToken}`
        })
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('No business found');
          done();
        });
    });
    it('should be able to get user business by page', (done) => {
      supertest(app)
        .get('/api/v1/businesses/user?pageNum=1')
        .send({
          token: `${userToken}`
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body);
          done();
        });
    });
  });
});

