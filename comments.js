// Create web server
// Create route to get all comments
// Create route to add a comment
// Create route to delete a comment
// Create route to edit a comment

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const comments = [
  { id: 1, author: 'Dude', text: 'This is so cool!' },
  { id: 2, author: 'Dudette', text: 'This is not so cool!' },
];

app.get('/comments', (req, res) => {
  res.send(comments);
});

app.post('/comments', (req, res) => {
  const comment = req.body;
  comments.push({ id: comments.length + 1, ...comment });
  res.send(comments);
});

app.delete('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = comments.findIndex((comment) => comment.id === id);

  if (index === -1) {
    res.status(404).send({ message: 'Comment not found' });
  } else {
    comments.splice(index, 1);
    res.send(comments);
  }
});

app.put('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = comments.findIndex((comment) => comment.id === id);

  if (index === -1) {
    res.status(404).send({ message: 'Comment not found' });
  } else {
    comments[index] = { id, ...req.body };
    res.send(comments);
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});