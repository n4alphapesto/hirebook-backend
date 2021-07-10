var express = require("express");
var authRouter = require("./auth");
var jobRouter = require("./job");

var app = express();

app.use("/auth/", authRouter);
app.use("/job/", jobRouter);

module.exports = app;