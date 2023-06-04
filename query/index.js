const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

const hadnleEvents = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, postId, content, status } = data;
    const post = posts[postId];
    post.comments.push({
      id,
      content,
      status,
    });
  }
  if (type === "CommentUpdated") {
    const { id, postId, content, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);
    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  hadnleEvents(type, data);

  res.send({});
});

const PORT = 4002;
app.listen(PORT, async () => {
  console.log(`Query server is listening on port ${PORT}`);
  try {
    const res = await axios.get("http://localhost:4005/events");
    for (let event of res.data) {
      console.log("Processing event:", event.type);
      hadnleEvents(event.type, event.data);
    }
  } catch (error) {
    console.log(error.message);
  }
});
