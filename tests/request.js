import { describe, it } from 'mocha';
import fs from 'fs';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import storageFilePath from '../storage/path';

chai.should();

chai.use(chaiHttp);

let maximumValue;

let minimumValue;

describe('Request Action API Tests', () => {
  before((done) => {
    fs.unlinkSync(storageFilePath)
    done();
  });

  it('should return 404 on non-existing route on POST request', (done) => {
    chai.request(app)
      .post('/api/v1/request/nonexist')
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('statusCode');
        res.body.should.have.property('message');
        done();
      });
  });

  it('should return 200 on entry route on GET request', (done) => {
    chai.request(app)
      .get('/api/v1/')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('statusCode');
        res.body.should.have.property('message');
        done();
      });
  });

  it('should return a 404 error for total number of phone numbers generated on GET request when storage file is missing', (done) => {
    chai.request(app)
      .get('/api/v1/request/total')
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('statusCode');
        res.body.should.have.property('message');
        res.body.message.should.equal('No numbers has been generated yet');       
        done();
      });
  });

  it('should return a 404 error for list of phone numbers generated on GET request when storage file is missing', (done) => {
    chai.request(app)
      .get('/api/v1/request/all')
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('statusCode');
        res.body.should.have.property('message');
        res.body.message.should.equal('No numbers has been generated yet');       
        done();
      });
  });

  it('should return a 404 error for sorting list of phone numbers generated in ascending order on GET request when storage file is missing', (done) => {
    chai.request(app)
      .get('/api/v1/request/sortasc')
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('statusCode');
        res.body.should.have.property('message');
        res.body.message.should.equal('No numbers has been generated yet');       
        done();
      });
  });

  it('should return a 404 error for sorting list of phone numbers generated in descending order on GET request when storage file is missing', (done) => {
    chai.request(app)
      .get('/api/v1/request/sortdesc')
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('statusCode');
        res.body.should.have.property('message');
        res.body.message.should.equal('No numbers has been generated yet');       
        done();
      });
  });


  it('should return a 404 error for getting the maximum number from the list of phone numbers generated on GET request when storage file is missing', (done) => {
    chai.request(app)
      .get('/api/v1/request/getmax')
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('statusCode');
        res.body.should.have.property('message');
        res.body.message.should.equal('No numbers has been generated yet');       
        done();
      });
  });

  it('should return a 404 error for getting the minimum number from the list of phone numbers generated on GET request when storage file is missing', (done) => {
    chai.request(app)
      .get('/api/v1/request/getmin')
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('statusCode');
        res.body.should.have.property('message');
        res.body.message.should.equal('No numbers has been generated yet');       
        done();
      });
  });


  it('should generate numbers on POST request without existing storage json file', (done) => {
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

  it('should return a validation error on POST request with beyond 500 quantities', (done) => {
    chai.request(app)
      .post('/api/v1/request/generate')
      .send({
        quantity: 1000,
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('statusCode');
        res.body.should.have.property('errors');
        res.body.errors.quantity[0].should.equal('The quantity may not be greater than 500.');
        done();
      });
  });

  it('should return a validation error on POST request with empty quantity', (done) => {
    chai.request(app)
      .post('/api/v1/request/generate')
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('statusCode');
        res.body.should.have.property('errors');
        res.body.errors.quantity[0].should.equal('The quantity field is required.');
        done();
      });
  });

  it('should return the total number of phone numbers generated on GET request ', (done) => {
    chai.request(app)
      .get('/api/v1/request/total')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('statusCode');
        done();
      });
  });

  it('should return the list of phone numbers generated on GET request ', (done) => {
    chai.request(app)
      .get('/api/v1/request/all')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('statusCode');
        res.body.should.have.property('numbers');
        done();
      });
  });


  it('should return a sorted list of generated phone numbers in ascending order on GET request ', (done) => {
    chai.request(app)
      .get('/api/v1/request/sortasc')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('statusCode');
        res.body.should.have.property('numbers');
        done();
      });
  });

  it('should return a sorted list of generated phone numbers in descending order on GET request ', (done) => {
    chai.request(app)
      .get('/api/v1/request/sortdesc')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('statusCode');
        res.body.should.have.property('numbers');
        done();
      });
  });

  it('should return the maximum number from list of generated phone numbers on GET request ', (done) => {
    chai.request(app)
      .get('/api/v1/request/getmax')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('statusCode');
        res.body.should.have.property('maximumNumber');
        done();
      });
  });


  it('should check if the maximum number from list of generated phone numbers on GET request is correct ', (done) => {
    fs.readFile(storageFilePath,function(err,content){
      if(err) throw err;
      const parseJson = JSON.parse(content);
      maximumValue = Math.max(...parseJson);
    })
    chai.request(app)
      .get('/api/v1/request/getmax')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('statusCode');
        res.body.should.have.property('maximumNumber');
        res.body.maximumNumber.should.equal('0'+maximumValue);

        done();
      });
  });


  it('should return the minimum number from list of generated phone numbers on GET request ', (done) => {
    chai.request(app)
      .get('/api/v1/request/getmin')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('statusCode');
        res.body.should.have.property('minimumNumber');
        done();
      });
  });


  it('should check if the minimum number from list of generated phone numbers on GET request is correct ', (done) => {
    fs.readFile(storageFilePath,function(err,content){
      if(err) throw err;
      const parseJson = JSON.parse(content);
      minimumValue = Math.min(...parseJson);
    })
    chai.request(app)
      .get('/api/v1/request/getmin')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('statusCode');
        res.body.should.have.property('minimumNumber');
        res.body.minimumNumber.should.equal('0'+minimumValue);

        done();
      });
  });


});
