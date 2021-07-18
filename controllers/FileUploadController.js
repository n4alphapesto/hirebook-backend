const fileUploadModel = require("../models/FileUploadModel");
const apiResponse = require("../helpers/apiResponse");
const { GridFsStorage } = require("multer-gridfs-storage");
const multer = require("multer");
var { CONFIG } = require("../helpers/config");

// DB connection
var MONGODB_URL = CONFIG.MONGODB_URL;

const storage = new GridFsStorage({
  url: MONGODB_URL,
  file: (req, file) => {
    return {
      bucketName: "files",
      //Setting collection name, default name is fs
      filename: file.originalname,
      //Setting file name to original name of file
    };
  },
});

storage.on("connection", (db) => {
  //Setting up upload for a single file
  upload = multer({
    storage: storage,
  }).array("files", 5);
});

exports.FileUploads = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return apiResponse.ErrorResponse(res, err);
    }

    const fileIds = req.files.map((file) => file.id);
    return apiResponse.successResponseWithData(
      res,
      "Files Uploaded Successfully",
      fileIds
    );
  });
};
