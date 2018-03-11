import expect from 'expect';
import supertest from 'supertest';
import app from '../../server';

describe('Business: ', () => {
  it('should fail to authenticate token', (done) => {
    supertest(app)
      .get('/api/v1/business?category=2')
      .send({
        token: '$ggggfejgfjjbvjbbvbjebf.uhvhehgvygyuf.ihfihiuhfivibviu'
      })
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Failed to Authenticate Token');
        done();
      });
  });
});
