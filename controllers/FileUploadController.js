const fileUploadModel = require("../models/FileUploadModel");
const apiResponse = require("../helpers/apiResponse");
const { GridFsStorage } = require("multer-gridfs-storage");
const mongoose = require('mongoose');
const multer = require("multer");
const { CONFIG } = require("../helpers/config");
const auth = require("../middlewares/jwt");
const { body, cookie } = require("express-validator");
const Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
const gfs = Grid(mongoose.connection);
gfs.collection('files');


// DB connection
const MONGODB_URL = CONFIG.MONGODB_URL;

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

exports.uploadFiles = [
  auth,
  (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        return apiResponse.ErrorResponse(res, err);
      }

      console.log(" files ", req.files);
      const fileIds = req?.files?.map((file) => file.id);

      return apiResponse.successResponseWithData(
        res,
        "Files Uploaded Successfully",
        fileIds
      );
    });
  }];

//   ---- GET ALL FILES ------
exports.getFiles = [
  auth,
  body("fileIds", "fileIds must not be empty").isArray({ min: 1 }),
  (req, res) => {
    let filesData = [];
    let count = 0;
    console.clear();

    console.log(" fileId ", req.body.fileId);
    gfs.files.find({ _id: req.body.fileId }).toArray(function (err, files) {
      if (!files || files.length === 0) {
        return res.status(404).json({
          responseCode: 1,
          responseMessage: "error"
        });
      }
      // create read stream
      var readstream = gfs.createReadStream({
        filename: files[0].filename,
        root: "files"
      });
      // set the proper content type 
      res.set('Content-Type', files[0].contentType)
      // Return response
      return readstream.pipe(res);
    });
  }];
