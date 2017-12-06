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

describe('POST request on /inf,/posting with data', () => {
    it('post test of inf', (done) => {
      chai.request(app)
      .post('/write')
      .send(
      {
      menu: 'inf',
      title: 'title',
      content: 'content',
      category: 'lecture',
      name: 'name'})
      .end((err, res) => {
      res.should.have.status(200);
      done();
      });
    });

    it('post test of posting', (done) => {
      chai.request(app)
      .post('/write')
      .send(
      {
      menu: 'posting',
      title: 'title',
      content: 'content',
      category: 'notice',
      name: 'name2'})
      .end((err, res) => {
      res.should.have.status(200);
      done();
      });
    });
  });
