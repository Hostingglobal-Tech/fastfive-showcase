import { createRequestHandler } from "@remix-run/express";
import express from "express";
import * as build from "./build/index.js";

const app = express();

app.use(express.static("public"));

app.all("*", createRequestHandler({ build }));

const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Express server listening on port ${port}`);
});