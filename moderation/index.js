const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    axios
      .post("http://localhost:4005/events", {
        type: "CommentModerated",
        data: {
          id: data.id,
          content: data.content,
          postId: data.postId,
          status,
        },
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  res.send({});
});

const PORT = 4003;

app.listen(PORT, () => {
  console.log(`Moderation server is running on port ${PORT}`);
});
