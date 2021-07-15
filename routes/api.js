var express = require("express");
var authRouter = require("./auth");
var jobRouter = require("./job");
var staticRouter = require("./static");

var app = express();

app.use("/auth/", authRouter);
app.use("/job/", jobRouter);
app.use("/masterdata/", staticRouter);

module.exports = app;
