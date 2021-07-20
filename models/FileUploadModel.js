const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FileSchema = new Schema({
	fileUrl: {type: String},
	fileType: {type: String}
});

const FileUploadSchema = new Schema({
	fileList: [FileSchema],
}, {timestamps: true});

module.exports = mongoose.model("FileUpload", FileUploadSchema);
