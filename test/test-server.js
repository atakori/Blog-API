const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, closeServer, runServer} = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('Blog Posts', function() {

	before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  //GET test strategy
  // make a GET request to /blog-posts
  // inspect object to make sure it has keys in res obj
  it('returns a list of post information with a GET request', function() {
  	return chai.request(app)
  	.get('/blog-posts')
  	.then(function(res) {
  		res.should.have.status(200);
  		res.should.be.json;
  		res.body.should.be.a('array');
  		const expectedKeys = ['title', 'content', 'author', 'publishDate'];
  		res.body.forEach(function(item) {
  			item.should.include.keys(expectedKeys);
  			item.should.be.a('object');
  			});
  		});
  	});
})