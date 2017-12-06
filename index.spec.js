import request from 'supertest';
import { expect } from 'chai';

import app from './app';

describe('access homepage test', () => {
  it('homepage respond ', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        done();
      });
  });
});
