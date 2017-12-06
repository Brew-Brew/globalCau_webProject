import request from 'supertest';
import app from './app';
var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");
var Posting = require("./server/models/posting");
var User = require("./server/models/users");
var today = new Date();
var should = chai.should();

chai.use(chaiHttp);
describe('read a posting test', function() {


  it('read first inf page GET', function(done) {
        chai.request(app)
          .get('/inf', function(req, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body[0].should.be.a('array');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('title');
            res.body[0].should.have.property('content');
            res.body[0].name.should.equal('name');
          }).then(() => done());
  });
  it('read first posting page GET', function(done) {
        chai.request(app)
          .get('/posting', function(req, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body[0].should.be.a('array');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('title');
            res.body[0].should.have.property('content');
            res.body[0].name.should.equal('name');
          }).then(() => done());
  });
});
