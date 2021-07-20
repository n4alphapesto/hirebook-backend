const express = require("express");
const authRouter = require("./auth");
const userRouter = require("./user");
const jobRouter = require("./job");
const staticRouter = require("./static");
const onBoardRouter = require("./OnBoard");
const fileUpload = require("./fileUpload");

const app = express();

app.use("/auth/", authRouter);
app.use("/job/", jobRouter);
app.use("/masterdata/", staticRouter);
app.use("/onBoard/", onBoardRouter);
app.use("/files/", fileUpload);
app.use("/getUser/", userRouter);

module.exports = app;
