const express = require("express");
const FileController = require("../controllers/FileUploadController");

const router = express.Router();

router.post("/upload", FileController.uploadFiles);
router.get("/getfiles", FileController.getFiles);

module.exports = router;
