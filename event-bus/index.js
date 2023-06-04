const express = require("express");
const bodyParse = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParse.json());

const events = [];
app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log(err.message);
  });

  axios.post("http://localhost:4003/events", event).catch((err) => {
    console.log(err.message);
  });

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

const PORT = 4005;

app.listen(PORT, () => {
  console.log(`Event-bus server is listening on port ${PORT}`);
});
