const path = require("path");
const crypto = require("crypto");

require("dotenv").config({ path: path.join(__dirname, "/.env") });

function verifyGithubJsonRequest(req, res, next) {
  if (!process.env.WEBHOOK_SECRET) {
    console.log("No WEBHOOK_SECRET configured");
    return res.sendStatus(503);
  }

  if (!req.headers["x-hub-signature"]) {
    return res.sendStatus(503);
  }

  const payload = JSON.stringify(req.body);
  if (!payload) {
    return res.sendStatus(503);
  }

  const signature =
    "sha1=" +
    crypto
      .createHmac("sha1", process.env.WEBHOOK_SECRET)
      .update(payload)
      .digest("hex");

  if (req.headers["x-hub-signature"] != signature) {
    console.log("Signature does not match");
    return res.sendStatus(503);
  }

  next();
}

function verifyGithubUrlEncodedRequest(req, res, next) {
  if (!process.env.WEBHOOK_SECRET) {
    console.log("No WEBHOOK_SECRET configured");
    return res.sendStatus(503);
  }

  if (!req.headers["x-hub-signature"]) {
    return res.sendStatus(503);
  }

  const payload = JSON.stringify(req.body);
  if (!payload) {
    return res.sendStatus(503);
  }

  const signature =
    "sha1=" +
    crypto
      .createHmac("sha1", process.env.WEBHOOK_SECRET)
      .update(payload)
      .digest("hex");

  if (req.headers["x-hub-signature"] != signature) {
    console.log("Signature does not match");
    return res.sendStatus(503);
  }

  next();
}

exports.verifyGithubJsonRequest = verifyGithubJsonRequest;
exports.verifyGithubUrlEncodedRequest = verifyGithubUrlEncodedRequest;
