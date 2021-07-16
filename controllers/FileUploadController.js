const fileUploadModel = require("../models/FileUploadModel");
const apiResponse = require("../helpers/apiResponse");
const multer = require("multer");

const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, "./uploads");
	},
	filename: (req, file, callback) => {
		const filename = `${Date.now()}-${file.originalname}`;
		callback(null, filename);
	}
});

const upload = multer({ storage})

exports.FileUploads = [

	(req, res) => {
		try {
			upload(req, res, function (err) {
				// console.log(" req.body ", req);
				if (err) {
					return apiResponse.ErrorResponse(res, "Error uploading file.");
				} else if (req.files.length <= 0) {
					return apiResponse.ErrorResponse(res, "You must select at least 1 file.",);
				} else {
					// create query with fileUploadModel
					console.log(req.body);
					console.log(req.files);
					res.end("File is uploaded");
				}
			});
		} catch
		(err) {
			console.log("filupload err", err);
			return apiResponse.ErrorResponse(res, err);
		}
	}];
