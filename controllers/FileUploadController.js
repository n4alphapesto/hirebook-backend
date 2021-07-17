const fileUploadModel = require("../models/FileUploadModel");
const apiResponse = require("../helpers/apiResponse");
//const multer = require("multer");

//Remove this
// var storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, 'uploads');
// 	},
// 	filename: function (req, file, cb) {
// 		cb(null, new Date().toISOString() + file.originalname);
// 	}
// });

//You can remove this as we are not needing this to store the files in server
//exports.upload = multer({ storage: storage });
//exports.upload = multer();

exports.FileUploads = [
	(req, res) => {
		try {
			// if (err) {
			// 	return apiResponse.ErrorResponse(res, "Error uploading file.");
			// } else
			if (!req.file) {
				return apiResponse.ErrorResponse(res, "You must select at least 1 file.",);
			} else {
				// create query with fileUploadModel
				console.log(req.body);
				console.log(req.files);
				res.end("File is uploaded");
			}
		} catch
		(err) {
			console.log("filupload err", err);
			return apiResponse.ErrorResponse(res, err);
		}
	}];
