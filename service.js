const path = require("path");
const crypto = require("crypto");

require("dotenv").config({ path: path.join(__dirname, "/.env") });

function saveRawBodyForRequest(req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || "utf8");
  }
}

function verifyGithubJsonRequest(req, res, next) {
  console.log("verifyGithubJsonRequest");
  console.log(req.headers);
  console.log(req.body);

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
    console.log("Signatures do not match");
    return res.sendStatus(403);
  }

  next();
}

function verifyGithubUrlEncodedRequest(req, res, next) {
  console.log("verifyGithubUrlEncodedRequest");
  console.log(req.headers);
  console.log(req.rawBody);
  console.log(req.body);

  if (!process.env.WEBHOOK_SECRET) {
    console.log("No WEBHOOK_SECRET configured");
    return res.sendStatus(503);
  }

  if (!req.headers["x-hub-signature"]) {
    return res.sendStatus(503);
  }

  const signature =
    "sha1=" +
    crypto
      .createHmac("sha1", process.env.WEBHOOK_SECRET)
      .update(req.rawBody)
      .digest("hex");

  if (req.headers["x-hub-signature"] != signature) {
    console.log("Signatures do not match");
    return res.sendStatus(403);
  }

  next();
}

exports.saveRawBodyForRequest = saveRawBodyForRequest;
exports.verifyGithubJsonRequest = verifyGithubJsonRequest;
exports.verifyGithubUrlEncodedRequest = verifyGithubUrlEncodedRequest;
