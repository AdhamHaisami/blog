const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json())
app.use(cors());

const commentsByPostId = {};

app.get('/post/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const postId = req.params.id;

    const comments = commentsByPostId[postId] || [];

    comments.push({
        id: commentId, content,
    });

    commentsByPostId[postId] = comments;

    res.status(201).send(comments);



});



const PORT = 4001;

app.listen(PORT, () => {
    console.log(`Comments server is lisitening on port ${PORT}`);
})