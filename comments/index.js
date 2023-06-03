const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/post/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const postId = req.params.id;

  const comments = commentsByPostId[postId] || [];

  comments.push({
    id: commentId,
    content,
    stauts: "pending",
  });

  await axios
    .post("http://localhost:4005/events", {
      type: "CommentCreated",
      data: {
        id: commentId,
        postId,
        content,
        status: "pending",
      },
    })
    .catch((err) => {
      console.log(err.message);
    });

  commentsByPostId[postId] = comments;

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("Received Event", req.body.type);
  const { data, type } = req.body;
  if (type === "CommentModerated") {
    const { id, postId, status, content } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => (comment.id = id));
    comment.stauts = status;
    await axios
      .post("http://localhost:4005/events", {
        type: "CommentUpdated",
        data: {
          id,
          postId,
          content,
          status,
        },
      })
      .catch((err) => {
        console.log(err);
      });
  }
  res.send({});
});

const PORT = 4001;

app.listen(PORT, () => {
  console.log(`Comments server is lisitening on port ${PORT}`);
});
