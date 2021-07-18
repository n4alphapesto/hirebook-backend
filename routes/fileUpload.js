const express = require("express");
const FileController = require("../controllers/FileUploadController");

const router = express.Router();

router.post("/", FileController.FileUploads);

module.exports = router;
