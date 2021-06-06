const express = require("express");
const bodyParser = require("body-parser");
const request = require("./request");

const app = express();

app.use(bodyParser.json({ verify: request.saveRawRequestBody }));
app.use(bodyParser.urlencoded({ extended: true, verify: request.saveRawRequestBody }));

app.get("/service-check", (req, res) => {
  res.sendStatus(200);
});

app.post("/service-check", (req, res) => {
  res.sendStatus(200);
});

app.post("/webhook/json", request.verifyGithubRequest, (req, res) => {
  try {
    console.log("GitHub JSON request verification success");
    res.sendStatus(200);
  } catch (e) {
    console.log("GitHub JSON request verification error");
    console.log(e);
    return res.sendStatus(500);
  }
});

app.post("/webhook/urlencoded", request.verifyGithubRequest, (req, res) => {
  try {
    console.log("GitHub URLENCODED request verification success");
    res.sendStatus(200);
  } catch (e) {
    console.log("GitHub URLENCODED request verification error");
    console.log(e);
    return res.sendStatus(500);
  }
});

app.listen(8580, () => console.log(`Webhook API running`));
