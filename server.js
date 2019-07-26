// about libraries to be used.
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// about middleware to be used.
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// using Mongoose library to connect this app to MongoDB. and, Mongoose is a library for node.js to be worked with MongoDB.
mongoose.connect('mongodb://localhost/mydb');

// defining table as a model. Mongoose can use types with MongoDB.
const Todo = mongoose.model('Todo', {
	text : String
});

// settings of rooting
app.get('/api/todos', (req, res) => {
	Todo.find()
		.then((todos) => {
			res.json(todos);
		})
		.catch((err) => {
			res.send(err);
		})
});

app.post('/api/todos', (req, res) => {
	const todo = req.body;
	Todo.create({
		text : todo.text,
	})
	.then((todo) => {
		res.json(todo);
	})
	.catch((err) => {
		res.send(err);
	});
});

app.delete('/api/todos/:todo_id', (req, res) => {
	Todo.remove({
		_id : req.params.todo_id
	})
	.then((todo) => {
		res.send(todo);
	})
	.catch((err) => {
		res.send(err);
	});
});

app.get('/', (req, res) => {
	res.sendfile('./public/index.html');
});

app.listen(3000, () => {
	console.log("My app listening on port 3000!");
});
