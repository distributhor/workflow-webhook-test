const express = require("express");
const bodyParser = require("body-parser");
const service = require("./service");

const app = express();

app.use(bodyParser.json());

app.get("/health-check", (req, res) => {
  res.sendStatus(200);
});

app.post("/health-check", (req, res) => {
  res.sendStatus(200);
});

app.post("/webhook/json", service.verifyGithubJsonRequest, (req, res) => {
  try {
    console.log("GitHub JSON request verification success");
    console.log(req);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    return res.sendStatus(503);
  }
});

app.post("/webhook/urlencoded", service.verifyGithubUrlEncodedRequest, (req, res) => {
  try {
    console.log("GitHub URLENCODED request verification success");
    console.log(req);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    return res.sendStatus(503);
  }
});

app.listen(8580, () => console.log(`Webhook API running`));
