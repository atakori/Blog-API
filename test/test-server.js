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

  //POST Request
  //make new object to be added to the list of blogs
  //check res obj to see if the return obj has an ID
  it('Make a new POST request', function () {
    const newPost = {title: 'Info', content: 'random info here', author: 'Alfredo T.', publishDate: 'Today!'};
    return chai.request(app)
    .post('/blog-posts')
    .send(newPost)
    .then(function(res) {
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.include.keys('title', 'content', 'author', 'publishDate', 'id');
      res.body.id.should.not.be.null;

      res.body.should.deep.equal(Object.assign(newPost, {id: res.body.id}));
    });
  });
});