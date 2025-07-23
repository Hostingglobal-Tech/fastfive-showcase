const { createRequestHandler } = require("@remix-run/express");
const express = require("express");
const path = require("path");

const BUILD_DIR = path.join(process.cwd(), "build");

const app = express();

app.use(express.static("public", { maxAge: "1h" }));
app.use(express.static("public/build", { immutable: true, maxAge: "1y" }));

app.all(
  "*",
  createRequestHandler({
    build: require(BUILD_DIR),
    mode: process.env.NODE_ENV,
  })
);

const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Express server listening on port ${port}`);
});