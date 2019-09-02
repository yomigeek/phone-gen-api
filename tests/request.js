import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.should();

chai.use(chaiHttp);

describe('Request Action API Tests', () => {
  it('should generate numbers on POST request', (done) => {
    chai.request(app)
      .post('/api/v1/request/generate')
      .send({
        quantity: 10,
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('statusCode');
        res.body.should.have.property('message');
        res.body.status.should.equal('success');
        done();
      });
  });

  it('should return a validation error on POST request with 0 quantity', (done) => {
    chai.request(app)
      .post('/api/v1/request/generate')
      .send({
        quantity: 0,
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('statusCode');
        res.body.should.have.property('errors');
        res.body.errors.quantity[0].should.equal('The quantity must be at least 1.');
        done();
      });
  });

});
