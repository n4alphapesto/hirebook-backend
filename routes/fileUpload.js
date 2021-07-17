const express = require("express");
const FileController = require("../controllers/FileUploadController");
const multer = require("multer");

const router = express.Router();

router.post("/", multer().array('file'), FileController.FileUploads);

module.exports = router;
