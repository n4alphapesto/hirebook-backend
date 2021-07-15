const express = require("express");
const authRouter = require("./auth");
const jobRouter = require("./job");
const staticRouter = require("./static");
const onBoardRouter = require("./OnBoard");
const fileUpload = require("./fileUpload");

const app = express();

app.use("/auth/", authRouter);
app.use("/job/", jobRouter);
app.use("/masterdata/", staticRouter);
app.use("/onBoard/", onBoardRouter);
app.use("/uploads/", fileUpload);

module.exports = app;
