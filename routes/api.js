const express = require("express");
const authRouter = require("./auth");
const userRouter = require("./user");
const jobRouter = require("./job");
const staticRouter = require("./static");
const fileUpload = require("./fileUpload");

const app = express();

app.use("/auth/", authRouter);
app.use("/job/", jobRouter);
app.use("/files/", fileUpload);
app.use("/user/", userRouter);

module.exports = app;
