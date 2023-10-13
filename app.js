const express = require("express");
const app = express();
const ExpressError = require("./expressError");
const router = require("./route");

app.use(express.json());
app.use("/items", router);
app.use((req, res, next) => {
  const err = new ExpressError("Requested page was not found", 404);
  next(err);
});

app.use((err, req, res, next) => {
  let status = err.status || 500;
  let msg = err.msg;

  return res.status(status).json({ error: { msg, status } });
});

module.exports = app;
