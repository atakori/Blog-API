const express = require('express');
const router = express.Router();


const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

//adding blog posts on server load to test create: 
//function(title, content, author, publishDate) 
BlogPosts.create('How to successfully complete a thinkful drill', 'enter content here',
'Alfredo Takori','10/16/17');
BlogPosts.create('Blog Post#2: A blog from the past', 'enter content here',
'Alfredo Takori','1/07/07');
BlogPosts.create('Keeping up with Blogs', 'enter content here',
'Alfredo Takori','12/25/25');

router.get('/', (req, res) => {
	res.json(BlogPosts.get());
})

router.post('/', jsonParser, (req, res) => {
	//check the body to see if all fields are entered
	const requiredFields = ['title', 'content', 'author', 'publishDate'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if(!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`
      		console.error(message);
      		return res.status(400).send(message);
		}
	}
	const entry = BlogPosts.create(req.body.name, req.body.title, req.body.author, req.body.publishDate);
  	res.status(201).json(entry);
})

router.delete('/:id', (req, res) => {
	BlogPosts.delete(req.params.id);
	console.log(`Deleting post with id \`${req.params.id}\``);
	res.status(204).end();
})

router.put('/:id', jsonParser, (req, res) => {
	//check for require fields before updating!
	const requiredFields = ['title', 'content', 'author', 'publishDate'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if(!(field in req.body)) {
			const message = `You did not include the \`${field}\` in the request body`
			console.log(message);
			return res.status(400).send(message);
		}
	}
	if (req.params.id !== req.body.id) {
		const message = `The entered path id (\`${req.params.id}\`) does not match the entry id (\`${req.body.id}\`)`
		console.log(message);
		return res.status(400).send(message);
	}
	BlogPosts.update({
		title: req.body.title,
		content: req.body.content,
		author: req.body.author,
		publishDate: req.body.publishDate,
		id: req.params.id
		});
	res.status(204).end();
})

module.exports = router;