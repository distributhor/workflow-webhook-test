const path = require("path");
const crypto = require("crypto");

require("dotenv").config({ path: path.join(__dirname, "/.env") });

function saveRawRequestBody(req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || "utf8");
  }
}

function verifyGithubRequest(req, res, next) {
  console.log("");
  console.log("verifyGithubRequest ...");
  console.log("Headers:");
  console.log(req.headers);
  console.log("");
  console.log("Raw Body:");
  console.log(req.rawBody);
  console.log("");
  console.log("Parsed Body:");
  console.log(req.body);
  console.log("");

  if (!process.env.WEBHOOK_SECRET) {
    console.log("No WEBHOOK_SECRET configured");
    return res.sendStatus(503);
  }

  if (!req.headers["x-hub-signature"]) {
    return res.sendStatus(400);
  }

  const signature =
    "sha1=" +
    crypto
      .createHmac("sha1", process.env.WEBHOOK_SECRET)
      .update(req.rawBody)
      .digest("hex");

  // For JSON request one can also do the signature as follows (instead of raw body):
  // const signature =
  //   "sha1=" +
  //   crypto
  //     .createHmac("sha1", process.env.WEBHOOK_SECRET)
  //     .update(JSON.stringify(req.body))
  //     .digest("hex");

  if (req.headers["x-hub-signature"] != signature) {
    console.log("Signatures do not match");
    return res.sendStatus(401);
  }

  next();
}

exports.saveRawRequestBody = saveRawRequestBody;
exports.verifyGithubRequest = verifyGithubRequest;
