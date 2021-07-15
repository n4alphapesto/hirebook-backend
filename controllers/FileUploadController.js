const fileUploadModel = require("../models/FileUploadModel");
const apiResponse = require("../helpers/apiResponse");
const multer = require("multer");

const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, "./uploads");
	},
	filename: (req, file, callback) => {
		const match = ["image/png", "image/jpeg"];
		if (match.indexOf(file.mimetype) === -1) {
			const message = `${file.originalname} is invalid. Only accept png/jpeg.`;
			return callback(message, null);
		}
		const filename = `${Date.now()}-test-${file.originalname}`;
		callback(null, filename);
	}
});

const upload = multer({storage: storage}).array("files", 5);

exports.FileUploads = [

	(req, res) => {
		try {
			upload(req, res, function (err) {
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
			return apiResponse.ErrorResponse(res, err);
		}
	}];
