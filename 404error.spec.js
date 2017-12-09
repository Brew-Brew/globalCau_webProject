var supertest = require("supertest");
var chai = require('chai');
var should = chai.should();
// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:80");


describe("[404 error test]",function(){

  it("should return 404",function(done){
    server
    .get("/random")
    .expect(404)
    .end(function(err,res){
      res.status.should.equal(404);
      done();
    });
  })
});
